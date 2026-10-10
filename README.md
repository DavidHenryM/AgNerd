This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Prerequisites

- Node.js 20.9.0 or later (Node.js 24 LTS recommended)

## Getting Started

### Linux installer

Run `bash install.sh` on the deployment machine. If `/usr/bin/node` or
`/usr/bin/npm` is missing, the installer loads NVM without automatically
selecting a version, installs and activates the latest stable Node.js, and
links Node.js and npm under `/usr/bin` for the services.

If an earlier run downloaded NVM but stopped with `Failed to install Node.js
with NVM.`, rerun the updated installer. It reuses `~/.nvm` and does not require
deleting it or reopening the terminal. Loading, installation, and activation
failures now report which step failed, alongside NVM's error output.

The production application service loads `/etc/agnerd/.env` using systemd's
`EnvironmentFile`. Put comments on their own lines: unlike dotenv, systemd
includes inline `#` comments in the value. For example:

```dotenv
# Base URL of your app
BETTER_AUTH_URL=http://localhost:3000
```

An `Invalid base URL` error containing `# Base URL of your app` means the inline
comment was loaded as part of `BETTER_AUTH_URL`. Remove it from both the source
`.env` and `/etc/agnerd/.env`, then run `sudo systemctl restart agnerd`.
Use the deployment's canonical browser URL if it is not `http://localhost:3000`.
No rebuild is needed for this runtime environment correction.

`npm run dev` and `npm run build` automatically run `copy-cesium` first to populate
`public/cesium`. These generated assets are not committed to Git. For an existing
deployment, run `npm run copy-cesium` from the application directory and restart
the server, or rerun the installer to build and deploy the assets.

The copy command uses Cesium's bundled browser assets from
`node_modules/cesium/Build/Cesium`, including worker chunks. Do not serve
`@cesium/engine/Source` as static assets: its workers contain unresolved package
imports and can prevent the globe from rendering even when imagery metadata
loads successfully. After updating this command, run `npm run copy-cesium`
and hard-refresh the browser to replace cached source workers.

Production builds disable Turbopack minification as a workaround for invalid
octal escapes emitted in Cesium's embedded WebAssembly template strings.
Without this workaround, the browser rejects a navigation chunk and both the
map and controls disappear, although the server journal may show no error.
`npm run build` also validates the syntax of all generated browser chunks.
This increases bundle sizes but preserves navigation functionality.
After deploying a rebuilt application, hard-refresh the browser or restart
`agnerd-kiosk` to load the new chunks.

### Sign-in options

The sign-in screen supports the existing emailed sign-in link and one-time
code, as well as email/password login. The account's email address is its
username; there is no separate username field.

For an existing account without a password, select **Password**, then
**Set or reset password**. The emailed link opens a form to save an
8-128 character password and expires after one hour. This same flow resets
forgotten passwords. Resetting a password revokes existing sessions; users
must sign in again. Link and code sign-in remain available afterward.

Password reset emails use the existing Brevo configuration (`BREVO_API_KEY`,
`EMAIL_FROM`, and optionally `EMAIL_FROM_NAME`). Configure Better Auth's public
`BETTER_AUTH_URL` and `BETTER_AUTH_TRUSTED_ORIGINS` for the deployment so emailed
links reach the correct host. Password registration is disabled; this flow
adds credentials only to existing accounts. The active Prisma schema already
includes `Account.password`, so no schema migration is required.

### Database schema

The active schema is [prisma/schema.prisma](prisma/schema.prisma), not the
legacy [app/prisma/schema.prisma](app/prisma/schema.prisma).
`npm run generate` (also run during installation) generates the Prisma client;
it does **not** update database tables.

If GNSS ingestion fails with Prisma `P2022` reporting a missing
`GeoPoint.sortOrder` column, an older database may also be missing
`GeoPoint.farmBoundaryId`. Back up the database, then apply the targeted
[GeoPoint repair](prisma/patches/add-geopoint-boundary-fields.sql) to the same
database used by the application. With the direct PostgreSQL URL exported in
your shell:

```bash
PRISMA_DATABASE_URL="${PRISMA_DATABASE_POSTGRES_URL:-$DATABASE_URL}" \
  npx prisma db execute --file prisma/patches/add-geopoint-boundary-fields.sql
```

The application uses `PRISMA_DATABASE_POSTGRES_URL`, falling back to
`DATABASE_URL`; the Prisma CLI reads `PRISMA_DATABASE_URL` from
[prisma.config.ts](prisma.config.ts). Ensure these target the same database.
The repair is transactional and safe to reapply: it adds the missing columns
and farm-boundary foreign key without deleting existing rows. Existing points
receive `sortOrder = 0`; their boundary order is not reconstructed.
This is a targeted patch for existing databases, not a full migration baseline.
Avoid a blanket `prisma db push` against a populated database without reviewing
all proposed schema changes.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## GNSS + NTRIP Pipeline

The `/navigation` screen hides the app sidebar and footer below 1536px wide.
On a 1280x720 display, the map fills the 1280x656 area below the 64px top bar.
Use the top bar's **Back to home** button to leave navigation on smaller screens.
Navigation overlays use 56px touch targets (72px for start/stop), larger status
readouts, and enlarged width/offset sliders for 7-inch touchscreens. The action
controls remain at the far left; settings and status panels scroll when height
is limited.
At 1536px and wider, the sidebar and footer return and the map resizes to fit
between them. Other pages keep their usual sidebar and footer.

This repo includes scripts and API routes to:

1. Pull RTCM corrections from an NTRIP caster.
2. Forward corrections to a hardware GNSS receiver (for example, ZED-F9R).
3. Read receiver output (NMEA + UBX) and ingest positions into the app database.

### Environment Setup

Copy `example.env` values into your runtime environment and set at least:

- `GA_NTRIP_USER`
- `GA_NTRIP_PASSWORD`
- `GA_NTRIP_HOST`
- `GA_NTRIP_PORT` (defaults to `2101`)
- `GA_NTRIP_MOUNT` (static fallback when closest-station lookup is enabled)
- `GA_NTRIP_USE_CLOSEST` (`true` to use the closest-station API)
- `GA_NTRIP_SECURE` (defaults to `true`; set `false` only for a caster without TLS)
- `GA_NTRIP_OUTPUT_MODE` (`tcp` for a UART shared with the GNSS reader; `serial` only for a separate correction port)
- `GA_NTRIP_OUTPUT_DEVICE` / `GA_NTRIP_OUTPUT_BAUDRATE`
- `GA_NTRIP_OUTPUT_HOST` / `GA_NTRIP_OUTPUT_PORT` (TCP listener settings)
- `GNSS_INTERNAL_TOKEN`

When using the app from another device on the LAN, set `BETTER_AUTH_TRUSTED_ORIGINS` in `.env` to the exact browser origin(s), comma-separated, for example `http://192.168.0.230:3000`. Keep `BETTER_AUTH_URL` set to the app's canonical URL. Do not use a wildcard for arbitrary IP origins.

### Run Correction Forwarding

```bash
npm run gnss:ntrip
```

This runs [scripts/ntrip-forwarder.mjs](scripts/ntrip-forwarder.mjs), a JavaScript NTRIP client that uses Node's built-in TCP/TLS networking and the existing `serialport` package. It supports:

- `GA_NTRIP_OUTPUT_MODE=serial`: send RTCM directly to a serial GNSS device.
- `GA_NTRIP_OUTPUT_MODE=tcp`: expose RTCM as a TCP server stream.
- Closest-station lookup with a configured static mount as fallback.
- Direct TLS with normal Node certificate validation, and automatic reconnect with bounded backoff.

The TCP output listener defaults to `localhost`; it has no client authentication, so only bind it to a trusted network interface.

The `npm run gnss:ntrip:bash` command remains as a compatibility alias and delegates to the same JavaScript forwarder. `stunnel` and RTKLIB are not required.

### Run GNSS Reader + Ingest

```bash
npm run gnss:reader
```

This runs [scripts/gnss-reader.mjs](scripts/gnss-reader.mjs), which:

- Reads NMEA from the configured serial device.
- Parses UBX NAV-PVT packets for fix and accuracy metadata.
- Parses checksum-validated NMEA GGA quality for GPS/DGPS/RTK status and satellite count.
- POSTs position updates to `GNSS_INGEST_URL` (default `/api/gnss/position`).
- Writes health/status to `GNSS_STATUS_FILE`.
- Optionally receives TCP corrections and writes them through its existing
  serial port, without a second process opening the UART.

### Shared UART: GPS reads and RTK corrections

For a receiver connected to one UART, the GNSS reader must be the only serial
port owner. Stop GPSD and any serial console using that UART. Configure the
NTRIP forwarder in `/etc/agnerd/ntrip.env`:

```ini
GA_NTRIP_OUTPUT_MODE=tcp
GA_NTRIP_OUTPUT_HOST=localhost
GA_NTRIP_OUTPUT_PORT=2101
```

Configure the reader in `/etc/agnerd/gnss.env`:

```ini
GNSS_SOURCE=serial
GNSS_READ_DEVICE=/dev/ttyAMA0
GNSS_READ_BAUDRATE=38400
GNSS_CORRECTIONS_ENABLED=true
GNSS_CORRECTION_HOST=localhost
GNSS_CORRECTION_PORT=2101
GNSS_CORRECTION_RECONNECT_MS=3000
GNSS_CORRECTION_TIMEOUT_MS=30000
```

Use the actual receiver device and configured baud rate. Enable RTCM input
on that receiver UART. `GNSS_CORRECTION_DEVICE` is not used: corrections are
written to the already-open `GNSS_READ_DEVICE`. Corrections are opt-in and
require serial mode; without `GNSS_CORRECTIONS_ENABLED=true`, existing reader
behavior is unchanged. The example configuration enables this shared-UART flow.

The reader reconnects if the forwarder starts later, disconnects, or sends no
TCP activity for the configured timeout. It pauses TCP reads until each serial
write drains, preserving binary data and limiting buffering. Correction input
failures are logged and retried without interrupting position reads.

After deploying the updated scripts (including `scripts/gnss-corrections.mjs`)
and environment files, restart both services:

```bash
sudo systemctl restart agnerd-ntrip agnerd-gnss
sudo journalctl -u agnerd-gnss -u agnerd-ntrip -n 60 --no-pager
```

The GNSS status file now includes `corrections.connected`, `bytesForwarded`,
`lastForwardedAt`, and `lastError`. Increasing byte counts and a recent
forwarded timestamp confirm TCP data was written and drained to the UART.
A TCP connection alone does not prove corrections are arriving, and forwarded
bytes do not prove the receiver accepted RTCM or achieved RTK.

### Checking RTK with NMEA

No UBX configuration change is required if the receiver outputs NMEA GGA.
The reader maps GGA quality `4` to `RTK_FIXED`, `5` to `RTK_FLOAT`, `1` to
`GPS`, `2` to `DGPS`, and `0` to `NO_FIX`. GPS quality alone does not indicate
2D versus 3D. Other standard quality values remain distinct: `PPS`,
`DEAD_RECKONING`, `MANUAL`, and `SIMULATION`.

The status file includes top-level `fixType` and `satellites`, plus `nmea`
with the original quality, HDOP, correction age (when supplied), and
`lastGgaAt`. The ingest request uses the same fix type and satellite count.
RMC remains the position source. Invalid GGA checksums or fields increment
`parseErrors` and are logged rather than being treated as a valid fix.

The navigation GPS panel shows a separate fix indicator (green **RTK fixed**,
amber **RTK float**, or the other reported quality), satellite count, and
accuracy when available. Accuracy is not used to infer RTK. The status API
and panel mark reader data older than five seconds as stale/unavailable;
browser geolocation fallback is labelled **Browser location**, not RTK.

In serial mode, GGA metadata takes precedence over UBX fix type and satellite
count. After five seconds without a valid GGA sentence it expires, falling
back to fresh UBX NAV-PVT if available, otherwise reporting unknown (`null`).
Historical `nmea` fields are retained for diagnostics; use the top-level
`fixType` and check timestamps for current status.

HDOP is dimensionless, not an accuracy estimate in metres. The reader also
parses checksum-validated NMEA GST error statistics. When fresh GST and a
fresh GGA quality of 1-5 are available, horizontal accuracy is the RMS error
`sqrt(latitudeSigma^2 + longitudeSigma^2)` in metres, and vertical accuracy is
the altitude standard deviation. This is an estimate, not a guaranteed bound
or a 95% confidence radius. GST diagnostics appear under `gst` in the status
file and expire after five seconds; fresh UBX accuracy takes precedence.

The existing navigation accuracy display receives these estimates through the
status API. If accuracy remains unknown, check `gst`: null means no valid GST
has been decoded. Enable NMEA GST output on the connected receiver UART (for
example, `CFG-MSGOUT-NMEA_ID_GST_UART1=1` for receiver UART1, or the corresponding
UART2 setting). Keep the existing GGA/RMC outputs enabled. No estimate is
invented from RTK quality when GST and UBX accuracy are unavailable.

UBX is optional: if enabled,
NAV-PVT `flags` bits 6-7 report carrier solution (`1` float, `2` fixed), and
bit 0 reports a valid GNSS fix.

When deploying manually, copy `scripts/gnss-fix.mjs` alongside
`scripts/gnss-reader.mjs` and `scripts/gnss-corrections.mjs`, then restart
`agnerd-gnss`. To inspect quality without printing coordinates:

```bash
node -e 'const s=JSON.parse(require("fs").readFileSync("/tmp/agnerd-gnss-status.json","utf8")); console.log({fixType:s.fixType,satellites:s.satellites,nmea:s.nmea});'
```

### API Endpoints

- `POST /api/gnss/position`
	- Requires header `x-gnss-token` when `GNSS_INTERNAL_TOKEN` is set.
	- Persists a `GeoPoint` and returns GNSS metadata.
- `GET /api/gnss/status`
	- Reports status file availability and timestamp.
- `GET /api/gnss/cors?country=AU`
	- Retrieves CORS stations from Geoscience Australia (`https://metadata.gnss.ga.gov.au/api/corsSites`).
	- Query options:
		- `raw=true` to return upstream raw records.
		- `lat` and `lon` to return closest station(s), with optional `limit` (default `1`, max `50`).
		- `closestCodeOnly=true` with `lat` and `lon` to return only the nearest four-letter station code.
		- `closestNtripPath=true` with `lat` and `lon` to return nearest station code plus full NTRIP URI.
	- Returns `501` for country codes other than `AU` (not yet implemented).

### Optional systemd Service

Use [scripts/agnerd-gnss.service](scripts/agnerd-gnss.service) as a template:

```bash
sudo cp scripts/agnerd-gnss.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable agnerd-gnss
sudo systemctl start agnerd-gnss
sudo journalctl -u agnerd-gnss -f
```
