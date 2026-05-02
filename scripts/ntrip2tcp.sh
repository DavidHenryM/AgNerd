#!/usr/bin/env bash
# ntrip2tcp.sh
# Stream RTCM corrections from an NTRIP caster to either a serial GNSS device or a TCP socket.

set -euo pipefail

required_vars=(NTRIP_USER NTRIP_PASSWORD NTRIP_HOST NTRIP_PORT NTRIP_MOUNT)
for var_name in "${required_vars[@]}"; do
	if [[ -z "${!var_name:-}" ]]; then
		echo "Missing required environment variable: ${var_name}" >&2
		exit 1
	fi
done

NTRIP_SCHEME="ntrip"
if [[ "${NTRIP_SECURE:-false}" == "true" ]]; then
	NTRIP_SCHEME="ntrips"
fi

INPUT_URI="${NTRIP_SCHEME}://${NTRIP_USER}:${NTRIP_PASSWORD}@${NTRIP_HOST}:${NTRIP_PORT}/${NTRIP_MOUNT}"

OUTPUT_MODE="${NTRIP_OUTPUT_MODE:-serial}"
OUTPUT_URI=""

case "${OUTPUT_MODE}" in
	serial)
		GNSS_CORRECTION_DEVICE="${GNSS_CORRECTION_DEVICE:-${GNSS_DEVICE:-}}"
		GNSS_CORRECTION_BAUDRATE="${GNSS_CORRECTION_BAUDRATE:-${GNSS_BAUDRATE:-460800}}"

		if [[ -z "${GNSS_CORRECTION_DEVICE}" ]]; then
			echo "Set GNSS_CORRECTION_DEVICE (or GNSS_DEVICE) when NTRIP_OUTPUT_MODE=serial." >&2
			exit 1
		fi

		OUTPUT_URI="serial://${GNSS_CORRECTION_DEVICE}:${GNSS_CORRECTION_BAUDRATE}:8:n:1:off"
		;;
	tcp)
		NTRIP_OUTPUT_HOST="${NTRIP_OUTPUT_HOST:-localhost}"
		NTRIP_OUTPUT_PORT="${NTRIP_OUTPUT_PORT:-2101}"
		OUTPUT_URI="tcpsvr://${NTRIP_OUTPUT_HOST}:${NTRIP_OUTPUT_PORT}"
		;;
	*)
		echo "Unsupported NTRIP_OUTPUT_MODE: ${OUTPUT_MODE}. Use 'serial' or 'tcp'." >&2
		exit 1
		;;
esac

echo "Starting str2str"
echo "  in : ${INPUT_URI}"
echo "  out: ${OUTPUT_URI}"

exec str2str -in "${INPUT_URI}" -out "${OUTPUT_URI}"