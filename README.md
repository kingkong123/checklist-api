# Checklist API

Really simple ToDo list API

## Requirements
 - Node.js 16+
 - MySQL 8+

## Local development
Since Netlify functions doesn't provide local develop environment, the code is wrapped by Express.js and mimic Netlify functions' environment
```
$ npm run start:dev
```
The service will starts on `http://localhost:3001`

## Deployment
 - Deploy to Github (or GitLab, Bitbucket)
 - Setup Netlify account
 - Link the git repo into Netlify account and start the CD pipeline
 - The functions will deploy to Netlify functions

## Environment variables
```
DB_HOST=
DB_NAME=
DB_USERNAME=
DB_PASSWORD=

CORS_ALLOWED_DOMAIN=
```
