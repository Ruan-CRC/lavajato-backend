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
   ```

## Execução

1. **Configure a url postgresql:**
   DATABASE_URL="postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?schema=public"
2. **Sequências de execução:**
   ```bash
   cp .env.example .env
   ```

````bash
   mkdir .docker/postgres_data && mkdir .docker/pgadmin_data

```bash
   mkdir .docker/postgres_data && mkdir .docker/pgadmin_data

```bash
   sudo chown -R 5050:5050 .docker/pgadmin_data && sudo chmod -R 755 .docker/pgadmin_data

```bash
   sudo chown -R 1001:1001 .docker/postgres_data && sudo chmod -R 755 .docker/postgres_data

```bash
   chmod +x start.sh

```bash
   docker compose up -d
## Endpoints
// um link para o postman
````
