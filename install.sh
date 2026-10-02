#!/bin/bash

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR" || exit 1
sudo apt update
sudo apt install gpsd -y

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

if [ -f gnss.env ]; then
    echo "Updating /etc/agnerd/gnss.env from gnss.env"
    sudo cp gnss.env /etc/agnerd/gnss.env
elif [ -f example.gnss.env ]; then
    echo "Updating /etc/agnerd/gnss.env from example.gnss.env"
    sudo cp example.gnss.env /etc/agnerd/gnss.env
else
    echo "example.gnss.env not found, cannot copy to /etc/agnerd/gnss.env - please create gnss.env or example.gnss.env and run the install script again."
fi

if [ -f ntrip.env ]; then
    echo "Updating /etc/agnerd/ntrip.env from ntrip.env"
    sudo cp ntrip.env /etc/agnerd/ntrip.env
elif [ -f example.ntrip.env ]; then
    echo "Updating /etc/agnerd/ntrip.env from example.ntrip.env"
    sudo cp example.ntrip.env /etc/agnerd/ntrip.env
else
    echo "example.ntrip.env not found, cannot copy to /etc/agnerd/ntrip.env - please create ntrip.env or example.ntrip.env and run the install script again."
fi

if [ -f .env ]; then
    echo "Updating /etc/agnerd/.env from .env"
    sudo cp .env /etc/agnerd/.env
elif [ -f example.env ]; then
    echo "Updating /etc/agnerd/.env from example.env"
    sudo cp example.env /etc/agnerd/.env
else
    echo "example.env not found, cannot copy to /etc/agnerd/.env - please create .env or example.env and run the install script again."
fi

sudo mkdir -p /opt/agnerd/scripts
sudo cp scripts/gnss-reader.mjs /opt/agnerd/scripts/gnss-reader.mjs
sudo cp scripts/ntrip-forwarder.mjs /opt/agnerd/scripts/ntrip-forwarder.mjs

sudo cp scripts/agnerd-gnss.service /etc/systemd/system/agnerd-gnss.service
sudo cp scripts/agnerd-ntrip.service /etc/systemd/system/agnerd-ntrip.service
sudo cp scripts/agnerd.service /etc/systemd/system/agnerd.service

npm ci
npm run build
sudo cp -R dist/* /opt/agnerd/

if [ ! -d /opt/agnerd/public ]; then
    echo "Creating /opt/agnerd/public directory"
    sudo mkdir -p /opt/agnerd/public
fi

sudo systemctl daemon-reload

sudo systemctl enable agnerd-gnss.service
sudo systemctl restart agnerd-gnss.service

sudo systemctl enable agnerd-ntrip.service
sudo systemctl restart agnerd-ntrip.service

sudo systemctl enable agnerd.service
sudo systemctl restart agnerd.service