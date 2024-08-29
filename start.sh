#!/bin/sh

npm install prisma @prisma/client

npx prisma generate

npx prisma migrate dev

npm run dev
