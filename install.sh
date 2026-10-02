#!/bin/bash

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR" || exit 1
sudo apt update
sudo apt install curl gpsd -y

if [ ! -x /usr/bin/node ]; then
    echo "Node.js is missing from /usr/bin/node; installing the latest stable version with NVM."
    NVM_USER="${SUDO_USER:-$(id -un)}"
    NVM_HOME="$(getent passwd "$NVM_USER" | cut -d: -f6)"

    if [ -z "$NVM_HOME" ]; then
        echo "Unable to determine the home directory for $NVM_USER." >&2
        exit 1
    fi

    NODE_PATH=$(sudo -u "$NVM_USER" env HOME="$NVM_HOME" bash -s <<'NVM_SETUP'
set -e
export NVM_DIR="$HOME/.nvm"
if [ ! -s "$NVM_DIR/nvm.sh" ]; then
    set -o pipefail
    curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash >&2
fi
. "$NVM_DIR/nvm.sh"
nvm install node >&2
nvm use node >&2
command -v node
NVM_SETUP
    ) || {
        echo "Failed to install Node.js with NVM." >&2
        exit 1
    }

    sudo ln -sfn "$NODE_PATH" /usr/bin/node
fi

has_env_files() {
    local directory="$1"
    local file

    [ -f "$directory/.env" ] && return 0
    for file in "$directory"/*.env; do
        [ -f "$file" ] && return 0
    done
    return 1
}

has_config_env_files() {
    local directory="$1"
    local file

    [ -f "$directory/.env" ] && return 0
    for file in "$directory"/*.env; do
        [ -f "$file" ] || continue
        case "$(basename "$file")" in
            example.env|example.*.env) continue ;;
        esac
        return 0
    done
    return 1
}

if [ ! -d /etc/agnerd ]; then
    echo "Creating /etc/agnerd directory"
    sudo mkdir /etc/agnerd
else
    echo "/etc/agnerd directory already exists, skipping creation."
fi

if [ ! -d /opt/agnerd ]; then
    echo "Creating /opt/agnerd directory"
    sudo mkdir /opt/agnerd
else
    echo "/opt/agnerd directory already exists, skipping creation."
fi

if [ -f gnss.env ]; then
    echo "Updating /etc/agnerd/gnss.env from gnss.env"
    sudo cp gnss.env /etc/agnerd/gnss.env
fi
if [ -f ntrip.env ]; then
    echo "Updating /etc/agnerd/ntrip.env from ntrip.env"
    sudo cp ntrip.env /etc/agnerd/ntrip.env
fi
if [ -f .env ]; then
    echo "Updating /etc/agnerd/.env from .env"
    sudo cp .env /etc/agnerd/.env
fi

if has_config_env_files "$SCRIPT_DIR" || has_env_files /etc/agnerd; then
    echo "Environment file already present in source or /etc/agnerd; skipping example environment files."
else
    for example_file in example.env example.gnss.env example.ntrip.env; do
        if [ -f "$example_file" ]; then
            case "$example_file" in
                example.env) destination="/etc/agnerd/.env" ;;
                example.gnss.env) destination="/etc/agnerd/gnss.env" ;;
                example.ntrip.env) destination="/etc/agnerd/ntrip.env" ;;
            esac
            echo "Installing $example_file to $destination"
            sudo cp "$example_file" "$destination"
        fi
    done
fi

sudo mkdir -p /opt/agnerd/scripts
sudo cp scripts/gnss-reader.mjs /opt/agnerd/scripts/gnss-reader.mjs
sudo cp scripts/ntrip-forwarder.mjs /opt/agnerd/scripts/ntrip-forwarder.mjs

sudo cp scripts/agnerd-gnss.service /etc/systemd/system/agnerd-gnss.service
sudo cp scripts/agnerd-ntrip.service /etc/systemd/system/agnerd-ntrip.service
sudo cp scripts/agnerd.service /etc/systemd/system/agnerd.service

npm ci
npm run build
sudo cp -R dist/* /opt/agnerd/

if [ ! -d /opt/agnerd/public ]; then
    echo "Creating /opt/agnerd/public directory"
    sudo mkdir -p /opt/agnerd/public
fi

sudo systemctl daemon-reload

sudo systemctl enable agnerd-gnss.service
sudo systemctl restart agnerd-gnss.service

sudo systemctl enable agnerd-ntrip.service
sudo systemctl restart agnerd-ntrip.service

sudo systemctl enable agnerd.service
sudo systemctl restart agnerd.service