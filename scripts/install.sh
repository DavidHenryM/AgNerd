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

if [ -f /etc/agnerd/gpsd.env ]; then
    echo "gpsd.env already exists in install location, skipping copy."
elif [ -f gpsd.env ]; then
    echo "Copying gpsd.env to /etc/agnerd/gpsd.env"
    sudo cp gpsd.env /etc/agnerd/gpsd.env
elif [ -f gpsd.example.env ]; then
    echo "gpsd.env not found, copying gpsd.example.env to /etc/agnerd/gpsd.env"
    sudo cp gpsd.example.env /etc/agnerd/gpsd.env
else
    echo "gpsd.example.env not found, cannot copy to /etc/agnerd/gpsd.env - please create gpsd.env or gpsd.example.env and run the install script again."
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


sudo systemctl daemon-reload
sudo systemctl enable agnerd-gnss.service
sudo systemctl start agnerd-gnss.service
sudo systemctl enable agnerd.service
sudo systemctl start agnerd.service