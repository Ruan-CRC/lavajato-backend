# Projeto Backend Node.js

No domínio das empresas de lava jatos ou empresa que venda seus serviços, em certas datas o fluxo de pedidos é muito grande em um pequeno espaço de tempo, as vezes em poucas horas. Nesse sentido, um sistema de filas, com RabbitMQ, e a atualização em tempo real para usuários, com Websockets, desenvolvi esse sistema.

## 🚀 Tecnologias necessárias

- Docker
- Docker-compose

## 🛠️ Iniciar Projeto

1.  **Clonando o repositório:**

```bash
git clone https://github.com/Ruan-CRC/lavajato-backend.git
```

2.  **Arquivos de variáveis:**

```bash
cp .env.example .env
```

- Todas as variáveis já estão preenchidas com uma configuração default.

3.  **Criar pastas para o Postegres e pgAdmin**

```bash
mkdir .docker/postgres_data && mkdir .docker/pgadmin_data
```

4.  **Ceder as permissões necessárias**

```bash
sudo chown -R 5050:5050 .docker/pgadmin_data && sudo chmod -R 755 .docker/pgadmin_data
```

```bash
sudo chown -R 1001:1001 .docker/postgres_data && sudo chmod -R 755 .docker/postgres_data
```

```bash
chmod +x start.sh
```

5.  **Subir os contêineres**

```bash
docker compose up -d
```

## Endpoints

[Postman workspace](https://www.postman.com/rcrc00/workspace/lavajato-pb/collection/31135629-22f63187-f8e8-47f9-8c33-1c32dc590515?action=share&creator=31135629)

## 📸 Screenshots

...
