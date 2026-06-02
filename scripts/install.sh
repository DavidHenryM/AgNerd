#!/bin/bash

cd ..
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

if [ -f /etc/agnerd/gnss.env ]; then
    echo "gnss.env already exists in install location, skipping copy."
elif [ -f gnss.env ]; then
    echo "Copying gpsd.env to /etc/agnerd/gpsd.env"
    sudo cp gpsd.env /etc/agnerd/gpsd.env
elif [ -f gnss.example.env ]; then
    echo "gnss.env not found, copying gnss.example.env to /etc/agnerd/gnss.env"
    sudo cp gnss.example.env /etc/agnerd/gnss.env
else
    echo "gnss.example.env not found, cannot copy to /etc/agnerd/gnss.env - please create gnss.env or gnss.example.env and run the install script again."
fi

if [ -f /etc/agnerd/.env ]; then
    echo ".env already exists in install location, skipping copy."
elif [ -f .env ]; then
    echo "Copying .env to /etc/agnerd/.env"
    sudo cp .env /etc/agnerd/.env
elif [ -f example.env ]; then
    echo "Copying example.env to /etc/agnerd/.env"
    sudo cp example.env /etc/agnerd/.env
else
    echo "example.env not found, cannot copy to /etc/agnerd/.env - please create .env or example.env and run the install script again."
fi

sudo cp scripts/gnss-reader.mjs /opt/agnerd/scripts/gnss-reader.mjs

sudo cp scripts/agnerd-gnss.service /etc/systemd/system/agnerd-gnss.service
sudo cp scripts/agnerd.service /etc/systemd/system/agnerd.service

npm ci
npm run build
sudo cp -R dist/* /opt/agnerd/

if [ ! -d /opt/agnerd/scripts ]; then
    echo "Creating /opt/agnerd/scripts directory"
    sudo mkdir -p /opt/agnerd/scripts
fi

if [ ! -d /opt/agnerd/public ]; then
    echo "Creating /opt/agnerd/public directory"
    sudo mkdir -p /opt/agnerd/public
fi

sudo systemctl daemon-reload
sudo systemctl enable agnerd-gnss.service
sudo systemctl start agnerd-gnss.service
sudo systemctl enable agnerd.service
sudo systemctl start agnerd.service