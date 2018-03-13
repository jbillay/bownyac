#!/bin/bash
cd services
echo $0
docker login -u $0 -p $1 registry.heroku.com
docker build -t registry.heroku.com/bownyac/web .
docker push registry.heroku.com/bownyac/web
