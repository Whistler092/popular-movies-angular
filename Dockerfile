# Dockerfile para la creacion de imagen para un entorno python3 para correr pymesPlusV2 sobre ubuntu 16.04 LTS
FROM node:8
MAINTAINER Ramiro Bedoya <iamramiroo@gmail.com>
RUN apt-get update && apt install -y nginx

WORKDIR /usr/src/app

RUN npm install -g @angular/cli

COPY package.json .
RUN npm install

COPY default-nginx /etc/nginx/sites-available/default

COPY . .

EXPOSE 80
RUN ng build --prod
RUN chmod -R 755 /usr/src/app/dist

CMD /usr/sbin/nginx -g "daemon off;"

