#!/bin/bash
podman run --name mongodb -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME:root -e MONGO_INITDB_ROOT_PASSWORD:example -v ~/.mongo:/data/db --restart always docker.io/library/mongo:latest mongod --replSet rs0
