#!/bin/sh

npx prisma generate

npx prisma migrate dev

node dist/shared/core/server.js