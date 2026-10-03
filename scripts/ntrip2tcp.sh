#!/usr/bin/env bash
# Compatibility entry point; NTRIP forwarding is implemented in Node.js.
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
exec node "$SCRIPT_DIR/ntrip-forwarder.mjs" "$@"