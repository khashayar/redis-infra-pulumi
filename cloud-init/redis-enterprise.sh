#!/bin/bash

# /var/log/cloud-init-output.log

# Disable DNS Server
# sudo systemctl stop systemd-resolved
# sudo systemctl disable systemd-resolved
# sudo rm /etc/resolv.conf
# sudo touch /etc/resolv.conf
sudo echo "DNSStubListener=no" >> /etc/systemd/resolved.conf
sudo mv /etc/resolv.conf /etc/resolv.conf.orig
sudo ln -s /run/systemd/resolve/resolv.conf /etc/resolv.conf
sudo service systemd-resolved restart

# Install Redis Enterprise
mkdir re && cd re
curl -s https://s3.amazonaws.com/redis-enterprise-software-downloads/7.22.0/redislabs-7.22.0-241-jammy-amd64.tar -o redislabs.tar
tar xvf redislabs.tar
./install.sh -y

sleep 5
apt install jq -y

# Create Cluster
/opt/redislabs/bin/rladmin cluster create name redis-enterprise-cluster username admin@example.com password admin

sleep 3

# Create Demo Database
echo "{\"name\":\"demo\", \"authentication_redis_pass\":\"demo\", \"memory_size\":524288000, \"port\":12000}" > db-demo.json
curl -sk -u "admin@example.com:admin" -H "Content-type: application/json" -d @db-demo.json -X POST https://localhost:9443/v1/bdbs
