#!/bin/bash
set -euo pipefail

if [ "${AGNERD_DEPLOYMENT_MODE:-}" != "embedded" ]; then
    echo "Local PostgreSQL setup is allowed only in embedded mode." >&2
    exit 1
fi

sudo apt install postgresql postgresql-client -y
sudo systemctl enable --now postgresql
sudo mkdir -p /etc/agnerd

if ! sudo test -f /etc/agnerd/database.env; then
    PASSWORD="$(openssl rand -hex 32)"
    # psql variables quote the generated password as an SQL literal.
    printf "\\set password '%s'\n" "$PASSWORD" | {
        cat
        cat <<'SQL'
SELECT 'CREATE ROLE agnerd LOGIN PASSWORD ' || quote_literal(:'password')
WHERE NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname='agnerd') \gexec
SELECT 'CREATE DATABASE agnerd OWNER agnerd'
WHERE NOT EXISTS (SELECT 1 FROM pg_database WHERE datname='agnerd') \gexec
SQL
    } | sudo -u postgres psql -v ON_ERROR_STOP=1
    # Do not silently take over an existing role with a different password.
    PGPASSWORD="$PASSWORD" psql -h 127.0.0.1 -U agnerd -d agnerd -v ON_ERROR_STOP=1 -c 'SELECT 1' >/dev/null
    sudo install -m 600 /dev/null /etc/agnerd/database.env
    printf 'AGNERD_DEPLOYMENT_MODE=embedded\nLOCAL_DATABASE_URL=postgresql://agnerd:%s@127.0.0.1:5432/agnerd\n' "$PASSWORD" |
        sudo tee /etc/agnerd/database.env >/dev/null
    sudo chmod 600 /etc/agnerd/database.env
    unset PASSWORD
fi

# This file is created by the installer, never overwritten on reinstall.
set -a
source <(sudo cat /etc/agnerd/database.env)
set +a
if [ "$AGNERD_DEPLOYMENT_MODE" != "embedded" ]; then
    echo "database.env has an invalid deployment mode." >&2
    exit 1
fi

local_psql() {
    # Keep database credentials out of psql's process arguments.
    node --input-type=module - "$@" <<'NODE'
import { spawnSync } from "node:child_process";
const url = new URL(process.env.LOCAL_DATABASE_URL);
if (!["postgres:", "postgresql:"].includes(url.protocol) ||
    !["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)) {
    throw new Error("LOCAL_DATABASE_URL must target local PostgreSQL.");
}
const result = spawnSync("psql", process.argv.slice(2), {
    stdio: "inherit",
    env: {
        ...process.env,
        PGHOST: url.hostname.replace(/^\[|\]$/g, ""),
        PGPORT: url.port || "5432",
        PGUSER: decodeURIComponent(url.username),
        PGPASSWORD: decodeURIComponent(url.password),
        PGDATABASE: decodeURIComponent(url.pathname.slice(1)),
    },
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
NODE
}

TABLE_COUNT="$(local_psql -At -v ON_ERROR_STOP=1 -c "SELECT count(*) FROM pg_tables WHERE schemaname='public'")"
if [ "$TABLE_COUNT" = 0 ]; then
    local_psql -v ON_ERROR_STOP=1 -1 -f prisma/embedded-schema.sql
else
    local_psql -v ON_ERROR_STOP=1 -f prisma/patches/add-embedded-backups.sql
fi
echo "Embedded PostgreSQL is ready. Existing data and credentials were preserved."
