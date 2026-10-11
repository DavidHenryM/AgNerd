#!/usr/bin/env bash
set -euo pipefail

usage() {
    cat <<'HELP'
Usage: bash scripts/gps-serial-tcp.sh [device [baud [listen-ipv4 [port]]]]

Defaults: /dev/ttyAMA0 38400 127.0.0.1 5000
Environment: GNSS_READ_DEVICE, GNSS_READ_BAUDRATE, GPS_TCP_HOST, GPS_TCP_PORT

Example (trusted LAN only):
  sudo bash scripts/gps-serial-tcp.sh /dev/ttyAMA0 38400 192.168.1.50 5000

Connect u-center 2 to that IP/port using a TCP receiver connection.
This is a raw, bidirectional binary stream (UBX, NMEA and receiver commands).
One client/session only; rerun after disconnecting. Ctrl+C stops the bridge.
Stop competing GNSS/GPSD/serial-console services before starting.
No encryption or authentication: never expose this port to the internet.
HELP
}

fail() {
    echo "GPS TCP bridge: $*" >&2
    exit 1
}

if [ "${1:-}" = "--help" ] || [ "${1:-}" = "-h" ]; then
    usage
    exit 0
fi
[ "$#" -le 4 ] || fail "Too many arguments; use --help."
[ "$(uname -s)" = Linux ] || fail "This script requires Linux."

DEVICE="${1:-${GNSS_READ_DEVICE:-/dev/ttyAMA0}}"
BAUD="${2:-${GNSS_READ_BAUDRATE:-38400}}"
HOST="${3:-${GPS_TCP_HOST:-127.0.0.1}}"
PORT="${4:-${GPS_TCP_PORT:-5000}}"

[[ "$DEVICE" =~ ^/dev/[A-Za-z0-9_./-]+$ ]] || fail "Device must be a /dev path without socat option characters."
[ -c "$DEVICE" ] || fail "Serial device does not exist or is not a character device: $DEVICE"
[ -r "$DEVICE" ] && [ -w "$DEVICE" ] || fail "Serial device requires read/write permission (use sudo or the dialout group)."
case "$BAUD" in
    4800|9600|19200|38400|57600|115200|230400|460800|921600) ;;
    *) fail "Unsupported baud rate: $BAUD" ;;
esac
[[ "$PORT" =~ ^[0-9]{1,5}$ ]] || fail "Port must be an integer from 1 to 65535."
PORT=$((10#$PORT))
[ "$PORT" -ge 1 ] && [ "$PORT" -le 65535 ] || fail "Port must be from 1 to 65535."
[[ "$HOST" =~ ^[0-9]{1,3}(\.[0-9]{1,3}){3}$ ]] || fail "Listen address must be an IPv4 address."
IFS=. read -r -a OCTETS <<< "$HOST"
for OCTET in "${OCTETS[@]}"; do
    [ "$((10#$OCTET))" -le 255 ] || fail "Invalid IPv4 listen address."
done
for TOOL in socat fuser; do
    command -v "$TOOL" >/dev/null || fail "Missing $TOOL. Install dependencies: sudo apt install socat psmisc"
done

if fuser "$DEVICE" >/dev/null 2>&1; then
    fail "$DEVICE is already open. Stop agnerd-gnss, any direct-serial NTRIP writer, GPSD and the serial console first."
else
    STATUS=$?
    [ "$STATUS" -eq 1 ] || fail "Could not check serial-port ownership (fuser exit $STATUS)."
fi

echo "GPS TCP bridge: $DEVICE at $BAUD baud, 8N1 -> $HOST:$PORT"
echo "Raw bidirectional TCP; one client. Keep other serial users stopped until the bridge exits."
if [ "$HOST" != 127.0.0.1 ]; then
    echo "WARNING: unauthenticated receiver configuration access. Restrict this port to your trusted u-center computer." >&2
fi
# No fork: two clients must never compete for the receiver's byte stream.
exec socat -d -d \
    "TCP4-LISTEN:$PORT,bind=$HOST,reuseaddr" \
    "FILE:$DEVICE,raw,echo=0,b$BAUD,cs8,parenb=0,cstopb=0,crtscts=0,ixon=0,ixoff=0"
