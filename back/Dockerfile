FROM node:lts-alpine

RUN mkdir app

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY wildersdb.sqlite ./
COPY src src

RUN npm install



CMD npm start