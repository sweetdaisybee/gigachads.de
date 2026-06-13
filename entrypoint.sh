#!/bin/sh
PATH=$PATH:/app/packages/prisma/node_modules/.bin
echo "============================================================================================"
echo "Running Prisma migrations ..."
prisma migrate deploy --config /app/packages/prisma/prisma.config.js
echo "============================================================================================"
echo "Starting up application ..."
node /app/apps/api/dist/index.js
