FROM node:18-slim AS base

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install 

COPY turbo.json .prettierrc .eslintignore ./
COPY packages packages
