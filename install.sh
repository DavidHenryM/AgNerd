#!/bin/bash

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR" || exit 1
echo "Starting AgNerd installation from $SCRIPT_DIR"
echo "Updating package lists..."
sudo apt update
echo "Installing system prerequisites (curl, gpsd, and Chromium)..."
sudo apt install curl gpsd chromium -y

INSTALL_USER="${SUDO_USER:-$(id -un)}"
INSTALL_HOME="$(getent passwd "$INSTALL_USER" | cut -d: -f6)"
if [ -z "$INSTALL_HOME" ]; then
    echo "Unable to determine the home directory for $INSTALL_USER." >&2
    exit 1
fi

if [ ! -x /usr/bin/node ] || [ ! -x /usr/bin/npm ]; then
    echo "Node.js or npm is missing from /usr/bin; installing the latest stable Node.js with NVM."
    NODE_PATH=$(sudo -u "$INSTALL_USER" env HOME="$INSTALL_HOME" bash -s <<'NVM_SETUP'
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
    NPM_PATH="$(dirname "$NODE_PATH")/npm"
    if [ ! -x "$NPM_PATH" ]; then
        echo "npm was not found alongside the NVM Node.js installation." >&2
        exit 1
    fi
    sudo ln -sfn "$NPM_PATH" /usr/bin/npm
    echo "Node.js and npm installed and linked under /usr/bin."
else
    echo "Node.js and npm are already available under /usr/bin; skipping NVM installation."
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

set -e

if [ -f gnss.env ]; then
    echo "Updating /etc/agnerd/gnss.env from gnss.env"
    sudo cp gnss.env /etc/agnerd/gnss.env
else
    echo "No gnss.env source file found; keeping any existing GNSS environment file."
fi
if [ -f ntrip.env ]; then
    echo "Updating /etc/agnerd/ntrip.env from ntrip.env"
    sudo cp ntrip.env /etc/agnerd/ntrip.env
else
    echo "No ntrip.env source file found; keeping any existing NTRIP environment file."
fi
if [ -f .env ]; then
    echo "Updating /etc/agnerd/.env from .env"
    sudo cp .env /etc/agnerd/.env
else
    echo "No .env source file found; keeping any existing application environment file."
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
        else
            echo "Example environment file $example_file not found; skipping."
        fi
    done
fi

echo "Installing GNSS and NTRIP helper scripts to /opt/agnerd/scripts..."
sudo mkdir -p /opt/agnerd/scripts
sudo cp scripts/gnss-reader.mjs /opt/agnerd/scripts/gnss-reader.mjs
sudo cp scripts/ntrip-forwarder.mjs /opt/agnerd/scripts/ntrip-forwarder.mjs
sudo cp scripts/ntrip-client.mjs /opt/agnerd/scripts/ntrip-client.mjs
sudo cp scripts/kiosk.sh /opt/agnerd/scripts/kiosk.sh
sudo chmod 755 /opt/agnerd/scripts/kiosk.sh

if [ -f /etc/stunnel/auscors.conf ]; then
    echo "Removing the legacy AgNerd stunnel configuration..."
    sudo rm /etc/stunnel/auscors.conf
    shopt -s nullglob
    STUNNEL_CONFIGS=(/etc/stunnel/*.conf)
    shopt -u nullglob
    if [ "${#STUNNEL_CONFIGS[@]}" -eq 0 ]; then
        if sudo systemctl cat stunnel4.service >/dev/null 2>&1; then
            echo "No stunnel configurations remain; stopping and disabling the legacy service..."
            sudo systemctl disable --now stunnel4.service
        fi
    elif sudo systemctl is-active --quiet stunnel4.service; then
        echo "Restarting stunnel to release the legacy AgNerd proxy listener..."
        sudo systemctl restart stunnel4.service
    fi
fi

echo "Installing systemd service definitions..."
sudo cp scripts/agnerd-gnss.service /etc/systemd/system/agnerd-gnss.service
sudo cp scripts/agnerd-ntrip.service /etc/systemd/system/agnerd-ntrip.service
sudo cp scripts/agnerd.service /etc/systemd/system/agnerd.service
sed \
    -e "s|@KIOSK_USER@|$INSTALL_USER|g" \
    -e "s|@KIOSK_HOME@|$INSTALL_HOME|g" \
    scripts/agnerd-kiosk.service | sudo tee /etc/systemd/system/agnerd-kiosk.service >/dev/null

echo "Installing Node.js dependencies with npm ci..."
npm ci
echo "Copying Cesium assets into public/cesium..."
npm run copy-cesium
echo "Building the AgNerd application..."
npm run build
echo "Installing the production application and dependencies to /opt/agnerd..."
sudo mkdir -p /opt/agnerd/.next /opt/agnerd/node_modules /opt/agnerd/public
sudo cp package.json package-lock.json next.config.ts /opt/agnerd/
sudo cp -R .next/. /opt/agnerd/.next/
sudo cp -R node_modules/. /opt/agnerd/node_modules/
if [ -d public ]; then
    sudo cp -R public/. /opt/agnerd/public/
else
    echo "No public directory found; leaving /opt/agnerd/public empty."
fi

echo "Reloading systemd service definitions..."
sudo systemctl daemon-reload

echo "Enabling and restarting the GNSS reader service..."
sudo systemctl enable agnerd-gnss.service
sudo systemctl restart agnerd-gnss.service

echo "Enabling and restarting the NTRIP forwarder service..."
sudo systemctl enable agnerd-ntrip.service
sudo systemctl restart agnerd-ntrip.service

echo "Enabling and restarting the AgNerd application service..."
sudo systemctl enable agnerd.service
sudo systemctl restart agnerd.service

echo "Enabling and restarting the AgNerd kiosk service..."
sudo systemctl enable agnerd-kiosk.service
sudo systemctl restart agnerd-kiosk.service

echo "Checking that all AgNerd services are active..."
failed_services=()
for service in agnerd-gnss.service agnerd-ntrip.service agnerd.service agnerd-kiosk.service; do
    echo "Checking $service..."
    service_active=false
    for attempt in {1..10}; do
        if sudo systemctl is-active --quiet "$service"; then
            service_active=true
            break
        fi
        sleep 1
    done

    if [ "$service_active" = true ]; then
        echo "$service is active and running."
    else
        echo "ERROR: $service did not become active." >&2
        sudo systemctl status --no-pager --full "$service" || true
        sudo journalctl --no-pager -u "$service" -n 30 || true
        failed_services+=("$service")
    fi
done

if [ "${#failed_services[@]}" -gt 0 ]; then
    echo "Installation finished with service errors: ${failed_services[*]}" >&2
    exit 1
fi

echo "AgNerd installation completed; all services are active."