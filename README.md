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

- `NTRIP_USER`
- `NTRIP_PASSWORD`
- `NTRIP_HOST`
- `NTRIP_PORT`
- `NTRIP_MOUNT`
- `NTRIP_OUTPUT_MODE` (`serial` recommended)
- `GNSS_DEVICE` / `GNSS_READ_DEVICE` / `GNSS_CORRECTION_DEVICE`
- `GNSS_INTERNAL_TOKEN`

### Run Correction Forwarding

```bash
npm run gnss:ntrip
```

This runs [scripts/ntrip-forwarder.mjs](scripts/ntrip-forwarder.mjs), a Node implementation inside this project that wraps `str2str` and supports:

- `NTRIP_OUTPUT_MODE=serial`: send RTCM directly to a serial GNSS device.
- `NTRIP_OUTPUT_MODE=tcp`: expose RTCM as a TCP server stream.

The original shell version remains available at [scripts/ntrip2tcp.sh](scripts/ntrip2tcp.sh) via `npm run gnss:ntrip:bash`.

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

### Optional systemd Service

Use [scripts/agnerd-gnss.service](scripts/agnerd-gnss.service) as a template:

```bash
sudo cp scripts/agnerd-gnss.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable agnerd-gnss
sudo systemctl start agnerd-gnss
sudo journalctl -u agnerd-gnss -f
```
