FROM node:20

RUN apt update && \
  apt install -y wget netcat-traditional && \
  wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && \
  chmod +x /usr/bin/wait-for

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install --include=dev

COPY . .

EXPOSE 3333 5555 3334

