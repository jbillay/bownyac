#!/bin/bash
cd services
docker login --username=_ --password=$0 registry.heroku.com
docker build -t registry.heroku.com/bownyac/web .
docker push registry.heroku.com/bownyac/web
