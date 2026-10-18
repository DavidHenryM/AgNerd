This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Prerequisites

- Node.js 20.9.0 or later (Node.js 24 LTS recommended)

## Getting Started

### Linux installer

The installer is for an embedded Pi by default. It exports
`AGNERD_DEPLOYMENT_MODE=embedded`, provisions local PostgreSQL and installs
GNSS/NTRIP/kiosk services. For a web deployment, use
`AGNERD_DEPLOYMENT_MODE=online bash install.sh`: this runs dependency installation
and the production build only, without apt, systemd, PostgreSQL, GNSS or kiosk
installation. Deploy/run that build using your normal hosting platform.

Run `bash install.sh` on the deployment machine. If `/usr/bin/node` or
`/usr/bin/npm` is missing, the installer loads NVM without automatically
selecting a version, installs and activates the latest stable Node.js, and
links Node.js and npm under `/usr/bin` for the services.

If an earlier run downloaded NVM but stopped with `Failed to install Node.js
with NVM.`, rerun the updated installer. It reuses `~/.nvm` and does not require
deleting it or reopening the terminal. Loading, installation, and activation
failures now report which step failed, alongside NVM's error output.

The installer completes dependency installation, asset generation, and the
production build before changing deployment configuration or helper scripts.
A failure stops installation rather than copying an old or incomplete build.
It stages `.next` and `node_modules` under `/opt/agnerd`, then stops the app,
kiosk, GNSS, and NTRIP services before replacing those two directories completely.
This prevents obsolete build chunks and dependencies surviving a reinstall.
Staging requires enough free disk space for both the old and new directories.
Replacement/copy failures stop installation with an error; if services have
already stopped, correct the failure and rerun the installer before using the app.
This is not an atomic release switch or automatic rollback.
`public` is still merged, not deleted, to preserve possible uploads and other
local content. Environment files keep the existing installer update rules.
The installer never deletes the application root or `/var/lib/agnerd/maps`.

The embedded application service loads `/etc/agnerd/.env`, then the
installer-managed `/etc/agnerd/database.env` using systemd's `EnvironmentFile`.
The latter pins embedded mode and the local database URL, overriding cloud
database settings in the former. Put comments on their own lines: unlike dotenv, systemd
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

The sign-in form uses a compact layout for 800x480 and 1024x600 displays without
forcing page scrollbars. Longer errors, password-reset messages, or an on-screen
keyboard may still require scrolling so the form remains accessible.

The sign-in screen supports the existing emailed sign-in link and one-time
code, as well as email/password login. The account's email address is its
username; there is no separate username field.

For an existing account without a password, select **Set or reset password**
below the sign-in button (available on both sign-in tabs).
The emailed link opens a form to save an
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

Application queries and the Prisma CLI now share the deployment-aware URL
selection in [app/lib/deployment.ts](app/lib/deployment.ts). Online mode uses
`PRISMA_DATABASE_POSTGRES_URL`, then `DATABASE_URL`, then `PRISMA_DATABASE_URL`.
Embedded mode uses **only** `LOCAL_DATABASE_URL`, which must point to loopback
PostgreSQL. It never falls back to a cloud URL.
The repair is transactional and safe to reapply: it adds the missing columns
and farm-boundary foreign key without deleting existing rows. Existing points
receive `sortOrder = 0`; their boundary order is not reconstructed.
This is a targeted patch for existing databases, not a full migration baseline.
Avoid a blanket `prisma db push` against a populated database without reviewing
all proposed schema changes.

### Embedded versus online deployment

`AGNERD_DEPLOYMENT_MODE` accepts `online` (the application default) or `embedded`.
Invalid values fail explicitly. This is a **server-side runtime variable**;
restart the application after changing it. Browser GPS selection reads the mode
from the authenticated `/api/deployment` endpoint, so one build supports either
deployment.

| Feature | Online | Embedded |
|---|---|---|
| Main Prisma/Better Auth database | Configured cloud PostgreSQL | PostgreSQL on the device |
| GPS | Browser location | Local GNSS reader, optional browser fallback |
| Local imagery | Disabled, even if dataset env is set | Available when dataset env is set |
| GNSS status-file/CORS autodetection | No local filesystem reads | Uses local status files |
| Manual cloud backup | Receives/list/downloads backups | Creates/uploads backups |
| PostgreSQL/GNSS/NTRIP/kiosk installer | Not installed | Installed by `install.sh` |

For hosted deployment:

```dotenv
AGNERD_DEPLOYMENT_MODE=online
DATABASE_URL=postgresql://user:password@your-postgres-host/database
```

For embedded development without the installer:

```dotenv
AGNERD_DEPLOYMENT_MODE=embedded
LOCAL_DATABASE_URL=postgresql://user:password@127.0.0.1:5432/agnerd
```

The Pi installer creates an `agnerd` database/login with a random password,
stores its URL in root-readable `/etc/agnerd/database.env` and preserves that
file on reinstall. After provisioning, the installer writes the same
`LOCAL_DATABASE_URL` and `AGNERD_DEPLOYMENT_MODE=embedded` to the checkout's
`.env` and `/etc/agnerd/.env`, preserving other settings and restricting both
files to owner read/write. This also supports `npm start` from the checkout;
the build-only placeholder is never saved as the runtime URL.
PostgreSQL stores data in its normal persistent distribution
directory (typically `/var/lib/postgresql`), outside `/opt/agnerd`. Protect the
Pi and use an SSD/reliable power; do not expose its PostgreSQL port externally.
If an existing `agnerd` role uses different credentials, setup fails rather
than replacing its password: provision a correct `database.env` before retrying.

A **new, empty** local database is initialised from
[prisma/embedded-schema.sql](prisma/embedded-schema.sql), generated from the
active Prisma schema. Existing databases are not reset; the installer applies
only [the backup-table patch](prisma/patches/add-embedded-backups.sql).
Before deploying the online receiver, back up the online database and apply
that same additive patch using the online environment:

```bash
npx prisma db execute --file prisma/patches/add-embedded-backups.sql
```

Client generation does not apply this patch. Future business-schema changes
need reviewed patches on both deployments; regenerate the empty-database
bootstrap with `npx prisma migrate diff --from-empty --to-schema
prisma/schema.prisma --script --output prisma/embedded-schema.sql`.

#### Initial farm data and offline password login

Embedded installs automatically import an initial business snapshot when the
local business database is empty and a configured cloud PostgreSQL database is
reachable. Keep the cloud connection in the source `.env` (copied to
`/etc/agnerd/.env`), using `PRISMA_DATABASE_POSTGRES_URL`, `DATABASE_URL`, or
`PRISMA_DATABASE_URL` in that precedence order. The provisioned
`LOCAL_DATABASE_URL` remains the application's runtime database.

The installer checks reachability, captures a read-only cloud snapshot and
restores it transactionally into the local database. It never writes cloud
records or overwrites populated local business tables. Reinstalls skip the
import once local business records exist. Missing cloud configuration or a
failed cloud connection produces an explicit skip message and allows offline
installation to continue; rerun the installer while the local database is still
empty to retry. Capture/restore failures (including incompatible schemas or
oversized data) stop installation rather than reporting a successful import.
No snapshot file or cloud credentials are uploaded to another service.
Table mismatches report tables missing from the snapshot and from the local
database. Align the business schemas using reviewed database patches and export
a fresh snapshot; do not remove the checks or reset a database to bypass them.

Passwords, sessions and radio keys are excluded. After an automatic import,
run the `user` command below to set a local password for your imported email.

For a manual transfer instead, export business data from the online
deployment's source checkout, using its online database environment:

```bash
node scripts/embedded-database.mjs export farm-bootstrap.json.gz
```

Transfer the file to the Pi through a trusted channel. Stop the application
before restoring. On an **empty business database**:

```bash
sudo systemctl stop agnerd
sudo bash -c 'set -a; source /etc/agnerd/database.env; set +a; cd /opt/agnerd; node scripts/embedded-database.mjs restore /path/to/farm-bootstrap.json.gz'
sudo bash -c 'set -a; source /etc/agnerd/database.env; set +a; cd /opt/agnerd; node scripts/embedded-database.mjs user'
sudo systemctl start agnerd
```

Restore keeps record IDs, PostgreSQL arrays/enums and join-table relationships,
is transactional and refuses to overwrite existing business records. It does
not merge online edits into a populated Pi database.
The interactive `user` command provisions/resets a **local** password for an
imported user, or creates a user and farm for a fresh installation. Passwords
are entered without echo, hashed with Better Auth, and changing a local password
revokes local sessions. Cloud credentials are unaffected.

Email/password login works without internet after provisioning. Email links,
OTP emails and emailed resets still require connectivity and mail configuration.
Snapshots exclude `account`, `session`, `verification`, `invitation`, sync state
and `LoraDevice` (contains radio keys). Reprovision local credentials and radio
keys after recovery. Snapshots include user profiles and contact details:
handle them as private farm data.

#### Manual cloud backup (Sync now)

This is **one-way, versioned snapshot backup**, not replication or a merge into
the online app's live farm/livestock tables. No scheduled upload is started.
The local database is authoritative for the Pi; cloud-hosted business records
remain independent.

Configure the Pi's `/etc/agnerd/.env`:

```dotenv
EMBEDDED_DEVICE_ID=dalgety-pi
EMBEDDED_SYNC_URL=https://your-online-app.example/api/embedded/backups
EMBEDDED_SYNC_TOKEN=replace-with-a-random-secret-at-least-32-characters
EMBEDDED_SYNC_ADMIN_EMAILS=your-operator@example.com
```

Configure the online app:

```dotenv
AGNERD_DEPLOYMENT_MODE=online
EMBEDDED_ALLOWED_DEVICE_IDS=dalgety-pi
EMBEDDED_SYNC_TOKEN=the-same-random-secret-as-the-pi
EMBEDDED_SYNC_ADMIN_EMAILS=your-online-backup-operator@example.com
```

Use a fresh secret such as the output of `openssl rand -hex 32`; keep it only
in server environment files, never a `NEXT_PUBLIC_*` variable. HTTPS is required.
The shared token is for a trusted device fleet; allowed device IDs limit
ingestion. Operator emails are an explicit allowlist with access to the
**entire** deployment's business snapshots, not just one farm.

On the Pi, open **Settings -> Sync now**. The app:

1. Captures a consistent local PostgreSQL snapshot.
2. Stores the compressed payload and ID locally before uploading.
3. Sends it to the online backup endpoint.
4. Clears the pending payload only after a matching ID/checksum acknowledgement.

Only one job runs per Pi. A failed upload stays pending; retry sends the same
bytes/ID, so a lost acknowledgement does not duplicate cloud storage. A retry
uploads the previous pending snapshot first; click again after success to
capture newer changes. Closing the browser does not cancel server processing.
After a process restart, the lease expires within three minutes; use Refresh
status, then Sync now. There is no automatic background retry.
Local edits during an upload remain local and are included in the next snapshot.

Online backup operators can list/download snapshots from Settings. Recover a
download with the same `restore` command into a fresh matching embedded database.
Limits are 16 MiB compressed, 64 MiB uncompressed and 250,000 rows per table;
oversized snapshots fail explicitly. Backup versions are **not automatically
pruned**: monitor cloud storage and remove old `EmbeddedBackup` versions through
an authorised database administration workflow when appropriate.

Keep separate regular local PostgreSQL backups (including credentials) and test
restoration. Manual cloud business snapshots do not back up authentication,
environment files, imagery tiles or GNSS/NTRIP configuration.

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

### Temporary u-center 2 TCP access

[scripts/gps-serial-tcp.sh](scripts/gps-serial-tcp.sh) is a standalone Linux
raw, bidirectional serial-to-TCP bridge for receiver monitoring/configuration.
It does not use GPSD or modify/install AgNerd services.

Install its dependencies and stop processes that own the receiver UART:

```bash
sudo apt install socat psmisc
sudo systemctl stop agnerd-gnss agnerd-ntrip
# Also stop GPSD/socket or the serial console if they use this UART.
```

Run the bridge with the receiver's actual device/baud and the Pi's LAN address:

```bash
sudo bash scripts/gps-serial-tcp.sh /dev/ttyAMA0 38400 192.168.1.50 5000
```

In u-center 2, add a TCP receiver connection to the Pi address and port `5000`.
Use the baud configured on the receiver (the bridge defaults to 38400; the
X20P example GNSS configuration now uses 115200). UBX/NMEA bytes and commands pass unchanged;
the receiver must support the protocols/configuration required by u-center 2.
Default binding is loopback; explicitly supply a LAN address for remote access.

The bridge allows one client and exits on disconnect; rerun to reconnect.
Press Ctrl+C to stop, then restore the normal pipeline:

```bash
sudo systemctl start agnerd-ntrip agnerd-gnss
```

Keep all other serial users stopped throughout the bridge session. Navigation
has no fresh receiver data and AgNerd supplies no NTRIP corrections during this
maintenance window. If u-center changes the receiver baud, update
`GNSS_READ_BAUDRATE` before restarting the GNSS reader.
TCP access is unauthenticated and unencrypted: use only a trusted LAN with
firewall access restricted to your u-center computer, or an SSH tunnel. Never
forward this port to the internet. The script refuses an already-open device;
run it with sudo so the ownership check can see other users' processes.

### ZED-X20P rover at 5 Hz

For X20P firmware exposing these configuration keys, use u-center 2 Advanced
Configuration to set the following on the receiver UART wired to the Pi
(UART1 shown; substitute UART2 if applicable):

| Key | Value |
|---|---|
| `CFG-RATE-MEAS` | `200` ms |
| `CFG-RATE-NAV` | `1` |
| `CFG-UART1-BAUDRATE` | `115200` |
| `CFG-UART1INPROT-UBX` | Enabled |
| `CFG-UART1INPROT-RTCM3X` | Enabled |
| `CFG-UART1OUTPROT-UBX` | Enabled |
| `CFG-UART1OUTPROT-NMEA` | Enabled |
| `CFG-MSGOUT-UBX_NAV_PVT_UART1` | `1` (every solution) |
| `CFG-MSGOUT-NMEA_ID_RMC_UART1` | `1` |
| `CFG-MSGOUT-NMEA_ID_GGA_UART1` | `1` |
| `CFG-MSGOUT-NMEA_ID_GST_UART1` | Optional `1` |

For a tractor/ground vehicle, `CFG-NAVSPG-DYNMODEL=AUTOMOT` (Automotive,
value `4`) is available. Keep `CFG-TMODE-MODE` disabled for a normal moving
rover; do not enable base-station survey-in. Keep working constellation and
correction settings. X20P is not F9R: do not apply F9R inertial/dead-reckoning
calibration instructions to it.
Apply to RAM and save to persistent layers supported by your firmware.
See the [official X20 HPG 2.10 configuration definitions](https://github.com/u-blox/u-blox-X20-interface-description-json/blob/main/HPG/ZED-X20P/u-blox-X20-HPG-2.10.json);
use the matching interface description if your receiver firmware differs.

Keep RMC enabled: the current reader uses it for position/course and NAV-PVT for
accuracy/fix metadata. Excessive GSV/raw observation/debug message output can
consume UART bandwidth; enable only messages needed by your applications.

Set these values in your source `gnss.env` and `/etc/agnerd/gnss.env`:

```dotenv
GNSS_READ_BAUDRATE=115200
GNSS_POST_INTERVAL_MS=200
```

Stop the temporary bridge, deploy the updated application/reader, and restart
`agnerd-gnss` and `agnerd-ntrip`. The reader defaults to 200 ms publication,
and embedded Navigation polls status at 200 ms with one request in flight.
Status publication runs independently of HTTP ingest, so a slow HTTP response
does not stall local fixes. Slow writes/requests are not overlapped or queued:
the next operation uses the newest available fix. Actual UI and spray-history
rates can be below 5 Hz if the Pi or database cannot keep up.
Existing environment files are preserved on reinstall; explicitly update a
previous `GNSS_POST_INTERVAL_MS=1000` value to enable faster publication.
The five-second stale-fix threshold is unchanged.

### IMU sensor fusion (Adafruit 4517 on the Qwiic port)

An [Adafruit LSM6DSOX + LIS3MDL 9-DoF IMU](https://www.adafruit.com/product/4517)
on the GNSS pHAT Qwiic connector steadies the displayed heading, animates the
vehicle smoothly between 5 Hz fixes, and shows roll/pitch in the GPS panel.
The ZED-X20P has no dead reckoning, so the fusion runs on the Pi:

- `agnerd-imu` (`scripts/imu-reader.mjs`) reads the accelerometer/gyro FIFO at
  208 Hz and the magnetometer at 80 Hz over `/dev/i2c-1`. It levels the
  attitude from gravity, learns gyro bias while parked, measures magnetic
  disturbance, and writes `/tmp/agnerd-imu-status.json` at 20 Hz.
- `agnerd-gnss` fuses gyro yaw with GNSS course (and, with low weight, the
  compass) in a small Kalman filter. It learns the compass offset (declination
  plus mount yaw) while driving, detects reversing, and writes
  `/tmp/agnerd-gnss-display.json` at 20 Hz.
- Navigation receives the display packets via `/api/gnss/stream` and
  predicts the pose each frame for the tractor, boom model, spray particles and
  camera.

**Display only:** spray coverage, the boom paint line, tracks, area and
history use raw GNSS fixes. With no IMU, the reader still publishes a
GNSS-course display stream and Navigation works as before.

#### Hardware checklist

1. Plug the board into the pHAT Qwiic port; the installer enables I2C
   (reboot once if it asks you to).
2. Check that `sudo i2cdetect -y 1` shows `1c` (magnetometer) and `6a`
   (accelerometer/gyro) alongside the GNSS device.
3. The default `IMU_AXIS_MAP="+z,+x,+y"` matches the board mounted with sensor
   y up, x toward the vehicle's left and z forward. The map lists the sensor
   axes that point forward, left and up; for example, if x points right
   instead, use `"+z,-x,+y"`. Small mount tilt and yaw are removed by
   calibration.

#### Calibration

Stop the service and run the interactive calibration with the GNSS environment loaded:

```bash
sudo systemctl stop agnerd-imu
sudo bash -c 'set -a; . /etc/agnerd/gnss.env; node /opt/agnerd/scripts/imu-calibrate.mjs'
sudo systemctl start agnerd-imu
```

1. Park on firm ground for 20 s. This measures gyro bias and mount tilt.
2. Turn around and park on the same spot facing the opposite way. Averaging
   the two parks cancels ground slope; use `--skip-reverse` on level ground.
3. In an open area away from sheds, fences and other vehicles, drive two slow
   full circles. The calibration fits hard and soft iron and checks that
   compass and gyro turn the same way. If they turn opposite ways, fix
   `IMU_MAG_AXIS_MAP`.

The calibration is saved to `/var/lib/agnerd/imu-calibration.json` (the previous
file is kept as `.bak`). Recalibrate after moving the board or adding steel
near it. Mount yaw does not need measuring; the heading filter learns it.

#### Checking fusion

```bash
sudo journalctl -u agnerd-imu -f
node -e 'const s=JSON.parse(require("fs").readFileSync("/tmp/agnerd-imu-status.json","utf8")); console.log({healthy:s.healthy,rate:s.sampleRateHz,attitude:s.attitude,mag:s.mag,stationary:s.stationary});'
node -e 'const d=JSON.parse(require("fs").readFileSync("/tmp/agnerd-gnss-display.json","utf8")); console.log({heading:d.headingDeg,std:d.headingStdDeg,source:d.headingSource,direction:d.direction,imu:d.imu,mag:d.mag});'
```

The GPS panel shows the heading source:

| Source | Meaning |
|---|---|
| GNSS course | No IMU data |
| GNSS + gyro | Normal driving |
| Gyro + compass | Stopped, compass undisturbed |
| Gyro only | Stopped near steel |

Tilt turns amber at 12° and red at 20°. If the IMU stops responding, the panel
warns and the display falls back to GNSS course. Set `GNSS_IMU_ENABLED=false`
or `GNSS_FUSION_MAG_ENABLED=false` in `gnss.env` to disable the IMU or compass;
`GNSS_DISPLAY_INTERVAL_MS=0` turns off the 20 Hz display stream.

### Internet and offline imagery

The navigation GPS status panel reports **Internet: online**, **slow**, or **unavailable**, separately
from **App: unreachable**. Every 15 seconds the application server checks a fixed
HTTPS endpoint (`https://www.gstatic.com/generate_204`) with a five-second timeout.
Checks are shared between clients for 15 seconds. A response taking at least
1500ms is labelled slow. This measures the Pi's external reachability and latency,
not Wi-Fi signal, download bandwidth, or whether the imagery service is working.
A blocked probe endpoint or captive portal can report unavailable even when
other internet services work. The tooltip includes the failure or measured latency.

By default the navigation viewer uses Cesium's online imagery; copying
`public/cesium` installs runtime assets, not detailed map imagery. Opt-in local
imagery is described below. Slow internet, blocked imagery requests, or an
invalid Cesium token can therefore leave a globe without imagery. Use the browser
Network tab to distinguish pending tile requests from HTTP 401/403 or failed
metadata requests.

For offline navigation around Dalgety, NSW, the recommended approach is a bounded
local raster tile set generated from georeferenced imagery with permission for
offline use. Cesium's [UrlTemplateImageryProvider](https://cesium.com/learn/cesiumjs/ref-doc/UrlTemplateImageryProvider.html)
can load local XYZ tiles without an internet connection. Choose farm boundaries
plus a margin and the required resolution before generating tiles; storage grows
rapidly with area and zoom. Store map data outside the replaceable deployment,
for example `/var/lib/agnerd/maps`, and serve it locally with attribution.

The [NSW Imagery catalogue](https://datasets.seed.nsw.gov.au/dataset/nsw-imagery)
describes aerial and satellite imagery, but is primarily a web-viewing service.
Confirm permitted offline supply, coverage, capture date, and licence with the
provider before downloading. Do not bulk scrape hosted Cesium/third-party imagery.
For a road/topographic alternative, use licensed OSM-derived data and generate
or purchase offline tiles; the [public OSM tile service](https://operations.osmfoundation.org/policies/tiles/)
explicitly prohibits bulk downloading and prefetching.

#### Built-in local imagery server

No separate Cesium ion server is required for a bounded farm imagery layer.
The Next.js app serves `/api/maps/{dataset}/{z}/{x}/{y}` from
`/var/lib/agnerd/maps/{dataset}/{z}/{x}/{y}.png` (or JPEG). Only the dataset selected
by `LOCAL_IMAGERY_DATASET` is exposed. Its validated `manifest.json` declares
bounds, zoom range, format, resolution, capture date, and attribution. Routes
require an authenticated session, reject traversal and symlink escapes, and
return explicit errors for missing tiles or invalid configuration.

Cesium selects that same-origin URL using `UrlTemplateImageryProvider`,
with an explicit rectangle, maximum zoom, and credit. Standard XYZ/Web Mercator
tiles use `{y}`; TMS tiles reverse the Y axis, so generating and serving schemes
must agree. Keep a locally bundled Natural Earth base layer outside the farm
coverage, clearly labelled as low-resolution imagery rather than a detailed map.
Local tile mode does not initialize the default online imagery provider.

Generate tiles from authorised georeferenced raster data on a desktop, then
transfer the finished dataset to the Pi. [GDAL tile generation](https://gdal.org/en/stable/programs/gdal2tiles.html)
supports XYZ output; select zooms appropriate to the source resolution instead
of generating unnecessary detail. Start with one farm plus a margin around
Dalgety, measure actual storage and load performance, and verify disconnected
operation, missing-tile errors, attribution, and persistence across installs.

The preparation command uses Digital Earth Australia's Sentinel-2 scene
`99d374b7-24ff-45b4-8743-ce06d2f4e150`, captured 2025-01-03 (CC BY 4.0).
It creates approximately 10x10 km centred on **-36.5601857, 148.8247819** with
10 m/pixel RGB imagery and XYZ zooms 0-14. This is not fence-level imagery or
a source of RTK positioning accuracy. Cloud/shadow coverage must be visually
checked before relying on the background.
The prepared dataset contains 72 PNG tiles (approximately 2.8 MB uncompressed).
At navigation's close-up zoom it will look blurred: enlarging 10 m source pixels
does not create additional detail.

If using the supplied `dalgety-sentinel2-20250103-v1.tar.gz` archive, transfer it
to the Pi, then extract it instead of running preparation:

```bash
sudo mkdir -p /var/lib/agnerd/maps
sudo tar -xzf dalgety-sentinel2-20250103-v1.tar.gz -C /var/lib/agnerd/maps
```

On the Pi (or a desktop with GDAL tools installed), prepare while connected:

```bash
sudo apt install gdal-bin python3-gdal
mkdir -p "$HOME/agnerd-maps"
npm run maps:prepare -- "$HOME/agnerd-maps"
sudo mkdir -p /var/lib/agnerd/maps
sudo cp -R "$HOME/agnerd-maps/dalgety-sentinel2-20250103-v1" /var/lib/agnerd/maps/
```

Preparation uses GDAL HTTP range reads for the region, rescales RGB reflectance,
reprojects to Web Mercator, and publishes the dataset only after tiling succeeds.
It refuses to overwrite an existing dataset. `GDAL2TILES_COMMAND` can select the
tile tool executable when it has a different name. GDAL 3.13+ also supports the
legacy command via its compatible wrapper.

Add these runtime settings to `/etc/agnerd/.env` and the installer source `.env`:

```dotenv
LOCAL_IMAGERY_DATASET=dalgety-sentinel2-20250103-v1
LOCAL_IMAGERY_ROOT=/var/lib/agnerd/maps
```

Deploy the updated app, restart `agnerd`, and refresh the kiosk. When enabled,
navigation defaults to local manifest/tiles instead of initializing online world
imagery; Natural Earth uses bundled files. When local imagery is configured,
**Navigation settings > Maps > Local / Online** switches the imagery source
without resetting tracking, painted coverage, or the camera. Online uses the
existing Cesium world imagery and requires internet; there is no automatic
connectivity-based switching. Refreshing navigation returns to Local.
The selector is hidden when `LOCAL_IMAGERY_DATASET` is unset.
The map label identifies resolution
and date, and tile/configuration failures are visible. Clearing
`LOCAL_IMAGERY_DATASET` restores existing online behaviour. The internet indicator
still performs its separate connectivity probe, but imagery does not need it.

### Higher-resolution NSW imagery (authorised downloads only)

With permission for persistent offline use of the NSW Imagery service:

```bash
npm run maps:download-nsw -- "$HOME/agnerd-maps"
```

This downloads the same approximately 10x10 km Dalgety area at XYZ zooms 0-18
(about 0.48 m ground pixel spacing at the centre). Output spacing is not a
guarantee of native resolution. The prepared dataset has 9,080 PNG tiles,
approximately 819 MB of tile data; the transfer archive is approximately
820 MB. Allow at least 2 GB free while transferring and extracting it.
The service is a mosaic: the centre catalogue
includes NUMBLA imagery dated 2011-01-29, but capture dates and detail may differ
elsewhere. The manifest intentionally has no single capture date. Service
attribution and overlapping footprint records are saved in `source-metadata.json`.
User permission is not a grant of redistribution rights.

The downloader uses two workers, retries transient errors, fully decodes each
256x256 tile, and converts the service's mixed JPEG/PNG responses to PNG.
It retains incomplete downloads in a hidden staging directory. Rerun the same
command to resume; the dataset is only published after every required tile
passes validation. It never overwrites an already-published dataset.
No GDAL installation is required for this command.

Transfer the supplied `dalgety-nsw-imagery-z18-v1.tar.gz` archive to the Pi:

```bash
sudo mkdir -p /var/lib/agnerd/maps
sudo tar -xzf dalgety-nsw-imagery-z18-v1.tar.gz -C /var/lib/agnerd/maps
```

Set `LOCAL_IMAGERY_DATASET=dalgety-nsw-imagery-z18-v1` in the runtime and installer
source environment, retain `LOCAL_IMAGERY_ROOT=/var/lib/agnerd/maps`, restart the
app, and refresh navigation. The Local/Online control still works as before.

### Saved Raspberry Pi Wi-Fi networks

AgNerd does not manage Wi-Fi profiles. Raspberry Pi OS desktop networking is
managed by NetworkManager. Check saved profiles without displaying passwords:

```bash
nmcli -f NAME,UUID,TYPE,AUTOCONNECT connection show
nmcli -f NAME,TYPE,DEVICE connection show --active
```

Two Wi-Fi entries with `AUTOCONNECT=yes` means both are saved, even though a single
Wi-Fi adapter normally connects to only one network at a time. To prefer one
saved network over another, assign its UUID a higher priority:

```bash
sudo nmcli connection modify uuid YOUR_PREFERRED_UUID connection.autoconnect yes connection.autoconnect-priority 20
sudo nmcli connection modify uuid YOUR_BACKUP_UUID connection.autoconnect yes connection.autoconnect-priority 10
```

These commands do not delete profiles or change passwords. Autoconnect priorities
select between available profiles; they do not guarantee switching away from an
already-active network just because a preferred network becomes visible.

The `/navigation` screen hides the app sidebar and footer below 1536px wide.
On a 1280x720 display, the map fills the 1280x656 area below the 64px top bar.
Use the top bar's **Back to home** button to leave navigation on smaller screens.
Navigation is primarily designed for touchscreen use in embedded mode.
Overlays use a single 96px Play/Pause control with a 48px icon, 80px zoom
buttons with 40px icons and 12px spacing, and 56px targets for other controls.
These larger controls apply in online mode too. Larger status
readouts and enlarged width/offset sliders suit 7-inch touchscreens. The action
controls remain 12px from the bottom-left on compact navigation screens, without
reserving space for the hidden footer; settings and status panels scroll when height
is limited. On narrow phones, the distance key sits above the main controls;
opening the menu temporarily replaces the status/distance overlays to avoid overlap.
The distance key measures the map's ellipsoid surface beneath its screen position
using Cesium camera rays and geodesic distance, rather than estimating from camera range.
It follows zoom, camera tilt and viewport resizing; the label and bar width
represent the same distance. If the bar points off the globe, it shows no distance.
The tractor GLB is anchored at the centre of its horizontal vertex bounds,
with its lowest vertex at ground level, and scaled to a measured two-metre
width. At zero boom offsets, the tractor footprint centre and boom centre
coincide with the GPS coordinate. The tractor nose, camera and boom share the
same receiver heading/movement-bearing fallback. This is a visual centre, not
an assumption about the physical GNSS antenna's mounting position.
After replacing the tractor asset, inspect/centre it using
`node scripts/tractor-geometry.mjs --centre`, verify the nose is +X, and update
the source width in `app/lib/tractor-model.ts` if the measured dimensions change.

The 3D spray boom is a lightweight galvanised frame with 12 yellow underside
nozzles. Its lowest nozzle is 0.5 m above terrain at the boom centre, and the whole
assembly is 0.5 m tall. The nominal 6 m model has 0.5 m nozzle spacing; changing
Width stretches only the rails and redistributes the fixed-size supports/nozzles
evenly, without stretching nozzle shapes or changing height. Nozzle spacing
therefore varies with width. The rigid boom remains level over uneven terrain.
Regenerate the standalone asset with `node scripts/generate-boom-model.mjs`.
A thin ground line continues to indicate the exact coverage footprint.

Navigation starts with a 6 m boom width, zero lateral offset and a -1.5 m
forward/rear offset (1.5 m behind the GPS coordinate).
The visible spray boom uses the Width control in ground metres. Positive Offset
moves it left of travel; negative Offset moves it right. The separate Forward /
rear offset is positive ahead of the receiver and negative behind it. Both
offsets range from -25 to +25 metres and rotate with the direction of travel.
Changing width or either offset updates the preview without painting a strip.
It follows receiver
heading, or direction of movement when heading is unavailable (initially north).
Play paints the area between consecutive boom positions in translucent light
rose-purple. Small GPS movements accumulate until 0.5 m has been travelled,
then paint from the last painted endpoints so the trail stays continuous.
Coverage is rendered separately from the live tractor and boom in batches of at
most 64 strips. Completed batches are not rebuilt when new strips arrive, and
only one asynchronous coverage batch builds at a time. Overlapping footprints
remain separate to retain the darker overlap paint. This avoids repeatedly
rebuilding a growing ground-polygon entity batch while spraying on embedded
devices. Saved polygons, area calculations and the 200 ms GNSS polling interval
are unchanged; coverage can finish rendering after a new position is displayed.
Pause leaves a dimmed boom preview without painting and keeps
navigation active but suspends coverage painting, area accumulation, spray
particles and new history submissions until Resume spraying is pressed.
Existing coverage is retained and paused travel is never joined by a painted strip.
The optional Cesium particle mist is **off by default**. Set
`NEXT_PUBLIC_ENABLE_SPRAY_PARTICLES=true` in the build environment to enable it;
unset, empty, `false` and other values leave it disabled. This is a public,
build-time setting: rebuild and redeploy (or rerun the embedded installer),
then refresh/restart the kiosk. Changing only the runtime service environment
does not change an already-built browser bundle. Disabling particles does not
disable coverage painting, area calculation or saving.
When enabled while spraying, the mist emits
downward from its nozzle positions in the same purple, following width and both offsets.
The short-lived droplets remain in world space as the tractor moves; emission
is capped at 160 particles/second for touchscreen devices. Pause, track changes and
stale/no-fix positions remove the particle system immediately.
The live animation clock continues while ground geometry is loading, so
frequent boom/coverage updates cannot suspend particle emission.
Droplet sizes use a one-metre billboard with scale factors for their 0.25-1 m
diameter; fractional billboard dimensions are rounded away by Cesium's rendering
attributes and can make the effect invisible.
Stale/no-fix positions hide the boom and break the
paint trail so a GPS outage is not joined by a sprayed strip.

**Spray tracks:** open **Navigation menu** for **New spray track**,
**Resume saved track**, and **Delete current spray track**. New saves the
current track before clearing the map; it does not delete the previous track.
Recording creates a track on first Play and automatically saves incremental
coverage batches while spraying, on Pause, and before switching tracks.
The GPS panel distinguishes saving, saved, unsaved changes and storage errors.
Errors pause spraying; use **Retry save** before continuing. Do not close the
browser or power down until the track is saved. Unsaved navigation-away actions
are guarded, but abrupt power loss cannot guarantee a final write; there is no
durable offline write queue.

Saved tracks belong to the signed-in user and are listed newest-first by
original start date/time, with sprayed area in hectares/acres. Load more to see
older tracks. Resume restores the actual painted polygons, area and latest boom
settings; it stays paused until Play and never joins old coverage to the current
vehicle position. Area uses the existing accumulated distance-times-width
estimate, not overlap-deduplicated area. Concurrent edits from another tab/device
are rejected rather than overwritten: **Reload saved version** offers a
confirmation before discarding local unsaved coverage. Delete is inside the menu
and requires confirmation; only the current track and its coverage are removed,
not other tracks, farm geometry or the separate GPS history.

Tracks are available across devices connected to the same account database.
Embedded mode uses its local PostgreSQL database and includes tracks in business
snapshots/backups; this does not add live track synchronization with a separate
cloud database. Existing historical GPS points cannot be converted reliably into
tracks because they do not retain dates, track boundaries or boom geometry.

**Database upgrade for saved tracks:** before running this version against an
existing database, apply `prisma/patches/add-spray-tracks.sql` to that intended
database with `psql -v ON_ERROR_STOP=1 -f prisma/patches/add-spray-tracks.sql`
(provide the connection through your normal PostgreSQL environment/connection
configuration). The additive patch can be applied repeatedly; do not reset the
database. New embedded installs use the updated `prisma/embedded-schema.sql`.
Regenerate the client with `npm run generate` and rebuild. Cloud and embedded
business schemas must match before snapshot import; older snapshots without the
new tables require a fresh export from an upgraded source.

Track APIs are session-authenticated `/api/spray-tracks` (list/create) and
`/api/spray-tracks/[id]` (paginated coverage load, incremental save, delete).
Writes validate boom settings/geometry and use revision checks and retry
identities to prevent duplicate area or silent cross-device overwrites.
The focused PostgreSQL API regression test uses
`AGNERD_SPRAY_TEST_DATABASE_URL`, which must explicitly point to a loopback
database whose name ends in `_test`; run it with
`node --test scripts/spray-tracks.integration.test.mjs`. It creates the embedded
schema in an empty test database, exercises real authenticated handlers, and
removes its test records afterward.

Navigation checks the session before starting map/GPS requests. An expired
session returns to sign-in with navigation as the callback; protected API
requests return JSON 401 rather than redirecting to a sign-in HTML page.
At 1536px and wider, the sidebar and footer return and the map resizes to fit
between them. Other pages keep their usual sidebar and footer.

This repo includes scripts and API routes to:

1. Pull RTCM corrections from an NTRIP caster.
2. Forward corrections to a hardware GNSS receiver (for example, ZED-F9R).
3. Read receiver output (NMEA + UBX) and publish live positions locally; record
   database history only while spraying is enabled in navigation.

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
- Silent correction streams are closed after `NTRIP_STREAM_TIMEOUT_MS` (default
  15000 ms) without correction data, allowing reconnection after internet loss
  even when the old TCP connection stays open. `NTRIP_CONNECT_TIMEOUT_MS`
  separately limits connection/response setup.

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
  Reader updates are acknowledged with `recorded: false` without accessing the
  database. Live GPS continues through the local status file.
  Navigation submits fresh valid fixes with `spraying: true` only while Play is
  active and spraying is not paused. These writes require a signed-in session (the reader token cannot
  authorize history recording). Pause, Stop, Reset, lost/stale fixes and leaving the
  screen stop new history submissions; an already submitted write may complete.
  Each successful fix timestamp is submitted once, with at most one request in
  flight. Save failures display an alert and retry on subsequent fresh fixes.
  Existing history is retained; this does not delete rows or clear a Prisma
  `planLimitReached` account restriction. Resolve that restriction in the Prisma
  console before new writes can succeed.
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
GNSS_READ_BAUDRATE=115200
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
	- Includes the latest fused `display` block (heading, tilt, IMU state) when the reader publishes one.
- `GET /api/gnss/stream` (embedded only)
	- Server-sent events: one `display` event per new 20 Hz fused display packet, keepalive comments,
	  and an `unauthorized` event when the session expires. Requires a signed-in session.
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
