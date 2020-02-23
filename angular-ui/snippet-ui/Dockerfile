# STAGE 1: BUILD

FROM node:13.8.0-alpine3.11 as build

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

# STAGE 2: RUN

FROM nginx:1.17.8-alpine

COPY --from=build /usr/src/app/dist/* /usr/share/nginx/html

# Source: malcoded.com
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf