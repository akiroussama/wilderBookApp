FROM node:lts-alpine

RUN mkdir app

WORKDIR /app

COPY public public
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY src src

RUN npm install



CMD npm start