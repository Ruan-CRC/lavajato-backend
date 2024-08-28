#!/bin/sh

npm install prisma @prisma/client

npx prisma generate

npx prisma migrate dev

# Caminho absoluto para o arquivo .env
ENV_FILE="./.env"

if [ -f "$ENV_FILE" ]; then
  echo "Carregando variáveis de $ENV_FILE"
  . "$ENV_FILE"
else
  echo "Arquivo .env não encontrado em $ENV_FILE"
fi

# Verifica se IS_DEV é true e, se for, executa o script de seed
if [ "$IS_DEV" = "true" ]; then
  npx tsx src/shared/infra/prisma/seed/seedPrisma.ts
fi

npm run dev
