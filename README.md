# Projeto Backend Node.js

Este é um projeto backend em Node.js que inclui uma API RESTful para interação com o banco de dados.

## Índice

1. [Configuração](#configuração)
2. [Execução](#execução)
3. [Endpoints da API](#endpoints-da-api)

## Configuração

1. **Clonando o repositório:**

   ```bash
   git clone https://github.com/Ruan-CRC/lavajato-backend.git

## Execução

1. **Configure a url postgresql:**
  DATABASE_URL="postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?schema=public"
   
2. **Sequências de execução:**

   ```bash
   npm i
``

   ```bash
   docker compose up -d
  ````

   ```bash
   npm run prisma:migrate
  ```

   ```bash
   npm run dev
  ```

## Endpoints
// um link para o postman
