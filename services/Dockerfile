FROM node:8-alpine

RUN apk add --no-cache make gcc g++ python

# Create app user with home directory
RUN addgroup app
RUN adduser app -S /bin/false -h /home/app -G app

ENV HOME=/home/app/

# Install app dependencies
COPY package.json $HOME
RUN chown -R app:app $HOME

USER app
WORKDIR $HOME
RUN npm install

USER root
# Bundle app source
COPY . $HOME
RUN chown -R app:app $HOME
USER app

EXPOSE 4242

CMD [ "npm", "start" ]
