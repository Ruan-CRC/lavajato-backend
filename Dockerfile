FROM node:20

ENV TZ=America/Sao_Paulo

RUN apt update && \
  apt install -y wget netcat-traditional && \
  wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && \
  chmod +x /usr/bin/wait-for

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm install prisma -g

EXPOSE 3333 5555 3334

CMD ["./start.sh"]
