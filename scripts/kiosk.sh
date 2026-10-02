#!/bin/bash

URL="http://localhost:3000/"
NETWORK_TEST_URL="http://localhost:3000/"

# How long to wait between Chromium restarts
RESTART_DELAY=5

# How long to wait between network checks
NETWORK_DELAY=2

LOG="$HOME/kiosk/kiosk.log"

mkdir -p "$(dirname "$LOG")"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >> "$LOG"
}

log "Kiosk starting"

# Wait until the network/web server is reachable.
log "Waiting for network..."

until curl -fsS --max-time 3 "$NETWORK_TEST_URL" >/dev/null 2>&1; do
    sleep "$NETWORK_DELAY"
done

log "Network/web server available"

# Keep Chromium running.
while true; do

    log "Starting Chromium"

    chromium \
        --kiosk \
        --start-fullscreen \
        --noerrdialogs \
        --disable-infobars \
        --no-first-run \
        --disable-session-crashed-bubble \
        --disable-translate \
        --no-default-browser-check \
        --password-store=basic \
        "$URL" >> "$LOG" 2>&1

    EXIT_CODE=$?

    log "Chromium exited with code $EXIT_CODE"
    log "Restarting in $RESTART_DELAY seconds"

    sleep "$RESTART_DELAY"

    # Check that the network is still available before restarting.
    until curl -fsS --max-time 3 "$NETWORK_TEST_URL" >/dev/null 2>&1; do
        log "Waiting for network..."
        sleep "$NETWORK_DELAY"
    done

done