#!/bin/bash
cd services
docker build -t registry.heroku.com/bownyac/web .
docker push registry.heroku.com/bownyac/web
