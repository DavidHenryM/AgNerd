This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Prerequisites

- Node.js 20.9.0 or later (Node.js 24 LTS recommended)

## Getting Started

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
- `GA_NTRIP_OUTPUT_MODE` (`serial` recommended; `tcp` is also supported)
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
- POSTs position updates to `GNSS_INGEST_URL` (default `/api/gnss/position`).
- Writes health/status to `GNSS_STATUS_FILE`.

### API Endpoints

- `POST /api/gnss/position`
	- Requires header `x-gnss-token` when `GNSS_INTERNAL_TOKEN` is set.
	- Persists `LivestockUnitPosition` and nested `GeoPoint`.
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
