FROM node:20

RUN apt update && \
  apt install -y wget netcat-traditional && \
  wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && \
  chmod +x /usr/bin/wait-for

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

RUN npm install prisma @prisma/client

COPY . .

EXPOSE 3333 5555 3334

CMD ["./start.sh"]
