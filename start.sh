#!/bin/sh

npx prisma generate

npx prisma migrate dev

npx @snaplet/seed sync

npm run dev
