#!/usr/bin/env bash
docker stop node
docker rm node
echo "Im about to run the container"
docker run --name node -v $(pwd)/../:/app -p 3000:3000 nodejs

