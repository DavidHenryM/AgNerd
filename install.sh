#!/bin/bash

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR" || exit 1
echo -e "\033[35mStarting AgNerd installation from $SCRIPT_DIR\033[0m"
echo -e "\033[35mUpdating package lists...\033[0m"
sudo apt update
echo -e "\033[35mInstalling system prerequisites (curl, gpsd, and Chromium)...\033[0m"
sudo apt install curl gpsd chromium -y

INSTALL_USER="${SUDO_USER:-$(id -un)}"
INSTALL_HOME="$(getent passwd "$INSTALL_USER" | cut -d: -f6)"
if [ -z "$INSTALL_HOME" ]; then
    echo -e "\033[31mUnable to determine the home directory for $INSTALL_USER.\033[0m" >&2
    exit 1
fi

if [ ! -x /usr/bin/node ] || [ ! -x /usr/bin/npm ]; then
    echo -e "\033[35mNode.js or npm is missing from /usr/bin; installing the latest stable Node.js with NVM.\033[0m"
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
        echo -e "\033[31mFailed to install Node.js with NVM.\033[0m" >&2
        exit 1
    }

    sudo ln -sfn "$NODE_PATH" /usr/bin/node
    NPM_PATH="$(dirname "$NODE_PATH")/npm"
    if [ ! -x "$NPM_PATH" ]; then
        echo -e "\033[33mnpm was not found alongside the NVM Node.js installation." >&2
        exit 1
    fi
    sudo ln -sfn "$NPM_PATH" /usr/bin/npm
    echo -e "\033[32mNode.js and npm installed and linked under /usr/bin.\033[0m"
else
    echo -e "\033[32mNode.js and npm are already available under /usr/bin; skipping NVM installation.\033[0m"
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
    echo -e "\033[35mCreating /etc/agnerd directory\033[0m"
    sudo mkdir /etc/agnerd
else
    echo -e "\033[32m/etc/agnerd directory already exists, skipping creation.\033[0m"
fi

if [ ! -d /opt/agnerd ]; then
    echo -e "\033[35mCreating /opt/agnerd directory\033[0m"
    sudo mkdir /opt/agnerd
else
    echo -e "\033[32m/opt/agnerd directory already exists, skipping creation.\033[0m"
fi

set -e

if [ -f gnss.env ]; then
    echo -e "\033[35mUpdating /etc/agnerd/gnss.env from gnss.env\033[0m"
    sudo cp gnss.env /etc/agnerd/gnss.env
else
    echo -e "\033[33mNo gnss.env source file found; keeping any existing GNSS environment file.\033[0m"
fi
if [ -f ntrip.env ]; then
    echo -e "\033[35mUpdating /etc/agnerd/ntrip.env from ntrip.env\033[0m"
    sudo cp ntrip.env /etc/agnerd/ntrip.env
else
    echo -e "\033[33mNo ntrip.env source file found; keeping any existing NTRIP environment file.\033[0m"
fi
if [ -f .env ]; then
    echo -e "\033[35mUpdating /etc/agnerd/.env from .env\033[0m"
    sudo cp .env /etc/agnerd/.env
else
    echo -e "\033[33mNo .env source file found; keeping any existing application environment file.\033[0m"
fi

if has_config_env_files "$SCRIPT_DIR" || has_env_files /etc/agnerd; then
    echo -e "\033[32mEnvironment file already present in source or /etc/agnerd; skipping example environment files.\033[0m"
else
    for example_file in example.env example.gnss.env example.ntrip.env; do
        if [ -f "$example_file" ]; then
            case "$example_file" in
                example.env) destination="/etc/agnerd/.env" ;;
                example.gnss.env) destination="/etc/agnerd/gnss.env" ;;
                example.ntrip.env) destination="/etc/agnerd/ntrip.env" ;;
            esac
            echo -e "\033[33mInstalling $example_file to $destination\033[0m"
            sudo cp "$example_file" "$destination"
        else
            echo -e "\033[31mExample environment file $example_file not found; skipping.\033[0m"
        fi
    done
fi

echo -e "\033[35mInstalling GNSS and NTRIP helper scripts to /opt/agnerd/scripts...\033[0m"
sudo mkdir -p /opt/agnerd/scripts
sudo cp scripts/gnss-reader.mjs /opt/agnerd/scripts/gnss-reader.mjs
sudo cp scripts/ntrip-forwarder.mjs /opt/agnerd/scripts/ntrip-forwarder.mjs
sudo cp scripts/ntrip-client.mjs /opt/agnerd/scripts/ntrip-client.mjs
sudo cp scripts/kiosk.sh /opt/agnerd/scripts/kiosk.sh
sudo chmod 755 /opt/agnerd/scripts/kiosk.sh

if [ -f /etc/stunnel/auscors.conf ]; then
    echo -e "\033[35mRemoving the legacy AgNerd stunnel configuration...\033[0m"
    sudo rm /etc/stunnel/auscors.conf
    shopt -s nullglob
    STUNNEL_CONFIGS=(/etc/stunnel/*.conf)
    shopt -u nullglob
    if [ "${#STUNNEL_CONFIGS[@]}" -eq 0 ]; then
        if sudo systemctl cat stunnel4.service >/dev/null 2>&1; then
            echo -e "\033[35mNo stunnel configurations remain; stopping and disabling the legacy service...\033[0m"
            sudo systemctl disable --now stunnel4.service
        fi
    elif sudo systemctl is-active --quiet stunnel4.service; then
        echo -e "\033[35mRestarting stunnel to release the legacy AgNerd proxy listener...\033[0m"
        sudo systemctl restart stunnel4.service
    fi
fi

echo -e "\033[35mInstalling systemd service definitions...\033[0m"
sudo cp scripts/agnerd-gnss.service /etc/systemd/system/agnerd-gnss.service
sudo cp scripts/agnerd-ntrip.service /etc/systemd/system/agnerd-ntrip.service
sudo cp scripts/agnerd.service /etc/systemd/system/agnerd.service
sed \
    -e "s|@KIOSK_USER@|$INSTALL_USER|g" \
    -e "s|@KIOSK_HOME@|$INSTALL_HOME|g" \
    scripts/agnerd-kiosk.service | sudo tee /etc/systemd/system/agnerd-kiosk.service >/dev/null

echo -e "\033[35mInstalling Node.js dependencies with npm ci...\033[0m"
npm ci
echo -e "\033[35mCopying Cesium assets into public/cesium...\033[0m"
npm run copy-cesium
echo -e "\033[35mBuilding the AgNerd application without inheriting development inspector settings...\033[0m"
NODE_OPTIONS= npm run build
echo -e "\033[35mInstalling the production application and dependencies to /opt/agnerd...\033[0m"
sudo mkdir -p /opt/agnerd/.next /opt/agnerd/node_modules /opt/agnerd/public
sudo cp package.json package-lock.json next.config.ts /opt/agnerd/
sudo cp -R .next/. /opt/agnerd/.next/
sudo cp -R node_modules/. /opt/agnerd/node_modules/
if [ -d public ]; then
    sudo cp -R public/. /opt/agnerd/public/
else
    echo -e "\033[31mNo public directory found; leaving /opt/agnerd/public empty.\033[0m"
fi

echo -e "\033[35mReloading systemd service definitions...\033[0m"
sudo systemctl daemon-reload

echo -e "\033[35mEnabling and restarting the GNSS reader service...\033[0m"
sudo systemctl enable agnerd-gnss.service
sudo systemctl restart agnerd-gnss.service

echo -e "\033[35mEnabling and restarting the NTRIP forwarder service...\033[0m"
sudo systemctl enable agnerd-ntrip.service
sudo systemctl restart agnerd-ntrip.service

echo -e "\033[35mEnabling and restarting the AgNerd application service...\033[0m"
sudo systemctl enable agnerd.service
sudo systemctl restart agnerd.service

echo -e "\033[35mEnabling and restarting the AgNerd kiosk service...\033[0m"
sudo systemctl enable agnerd-kiosk.service
sudo systemctl restart agnerd-kiosk.service

echo -e "\033[35mChecking that all AgNerd services are active...\033[0m"
failed_services=()
for service in agnerd-gnss.service agnerd-ntrip.service agnerd.service agnerd-kiosk.service; do
    echo -e "\033[35mChecking $service...\033[0m"
    service_active=false
    for attempt in {1..10}; do
        if sudo systemctl is-active --quiet "$service"; then
            service_active=true
            break
        fi
        sleep 1
    done

    if [ "$service_active" = true ]; then
        echo -e "\033[35m$service is active and running.\033[0m"
    else
        echo -e "\033[31mERROR: $service did not become active.\033[0m" >&2
        sudo systemctl status --no-pager --full "$service" || true
        sudo journalctl --no-pager -u "$service" -n 30 || true
        failed_services+=("$service")
    fi
done

if [ "${#failed_services[@]}" -gt 0 ]; then
    echo -e "\033[31mInstallation finished with service errors: ${failed_services[*]}\033[0m" >&2
    exit 1
fi

echo -e "\033[32mAgNerd installation completed; all services are active.\033[0m "