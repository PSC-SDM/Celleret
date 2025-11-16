#!/bin/bash
docker stop node
docker rm node
docker run --name node -v $(pwd):/app -p 3000:3000 nodejs


