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
mkdir .docker/postgres_data
```

4.  **Ceder as permissões necessárias**

```bash
sudo chown -R 1001:1001 .docker/postgres_data && sudo chmod -R 755 .docker/postgres_data
```

```bash
chmod +x start.sh
```

5.  **Subir os contêineres**

```bash
docker compose up
```

5.  **Em outro terminal rode as seeds**

```bash
docker compose exec app bash
```

```bash
npx prisma migrate dev
```

```bash
echo "n" | npx @snaplet/seed init
```

```bash
npm run prisma:seed
```

Aguarde os container iniciarem, em especial o app iniciar o server, depois suba o [front-end](https://github.com/Ruan-CRC/lavajato-frontEnd.git)!

## 📬 Endpoints

[Postman workspace](https://www.postman.com/rcrc00/workspace/lavajato-pb/collection/31135629-22f63187-f8e8-47f9-8c33-1c32dc590515?action=share&creator=31135629)

## 🇻 Front-end vue.js

O calendârio de agendamentos: [repositório front-end](https://github.com/Ruan-CRC/lavajato-frontEnd.git)

## 📸 Screenshots

<img src="https://media.licdn.com/dms/image/v2/D4D22AQGJjca5ilC6Ug/feedshare-shrink_1280/feedshare-shrink_1280/0/1724435640594?e=1727308800&v=beta&t=QdJbW9-WTHd9VjNs3IrIZS9nI-cpoowthlVvQKr4Lp4" alt="10.000 request em 1 min">

<img src="https://media.licdn.com/dms/image/v2/D4D22AQGoMgQIELu6mw/feedshare-shrink_1280/feedshare-shrink_1280/0/1724435640708?e=1727308800&v=beta&t=zb4lrsfkdrvVQNh8-MzUm33VwEA2irvswT35i1-P_8w">

<img src="https://media.licdn.com/dms/image/v2/D4D22AQGfdWohrBgH_g/feedshare-shrink_800/feedshare-shrink_800/0/1723837765730?e=1727913600&v=beta&t=Kt78t5WP34CY81Ub1fqeDc_8dCuckZIr_PAzFVbWxQo">
