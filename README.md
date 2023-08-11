# Checklist API

Really simple ToDo list API

## Requirements
 - Node.js 16+
 - MySQL 8+
 - Netlify

## Local development
Since Netlify functions doesn't provide local develop environment, the code is wrapped by Express.js and mimic Netlify functions' environment
```
$ npm run start:dev
```

## Deployment
 - Deploy to Github (or GitLab, Bitbucket)
 - Setup Netlify account
 - Link the git repo into Netlify account and start the CD pipeline

## Environment variables
```
DB_HOST=
DB_NAME=
DB_USERNAME=
DB_PASSWORD=

CORS_ALLOWED_DOMAIN=
```
