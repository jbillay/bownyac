#!/bin/bash
cd services
docker login -u "$HEROKU_USERNAME" -p "$HEROKU_PASSWORD" registry.heroku.com
docker build -t registry.heroku.com/bownyac/web .
docker push registry.heroku.com/bownyac/web
