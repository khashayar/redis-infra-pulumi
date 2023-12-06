#!/bin/bash

# Install Redis Enterprise
mkdir re && cd re
curl -s https://s3.amazonaws.com/redis-enterprise-software-downloads/7.2.4/redislabs-7.2.4-72-focal-amd64.tar -o redislabs-7.2.4-72-focal-amd64.tar
tar xvf redislabs-7.2.4-72-focal-amd64.tar
./install.sh -y

sleep 5
apt install jq -y

# Create Cluster
/opt/redislabs/bin/rladmin cluster create name redis-enterprise-cluster username admin@example.com password admin

sleep 3

# Create Demo Database
echo "{\"name\":\"demo\", \"authentication_redis_pass\":\"demo\", \"memory_size\":524288000, \"port\":12000}" > db-demo.json
curl -sk -u "admin@example.com:admin" -H "Content-type: application/json" -d @db-demo.json -X POST https://localhost:9443/v1/bdbs
