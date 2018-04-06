FROM node:8-alpine

RUN apk add --no-cache make gcc g++ python

# Create app user with home directory
RUN addgroup app -g 1001
RUN adduser app -S /bin/false -h /home/app -G app -u 100

RUN npm install --global npm@5.6.0

ENV HOME=/home/app

COPY package.json npm-shrinkwrap.json $HOME/services/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/services
RUN npm install

USER root
COPY . $HOME/services
RUN chown -R app:app $HOME/*
USER app

CMD [ "npm", "start" ]
