# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:13.12.0-alpine as build-stage

ARG REACT_APP_API_KEY="Default_Value"

WORKDIR /app

# COPY package*.json /app/
COPY /app/ .

RUN npm run clean

RUN npm install

RUN CI=true npm test --coverage --updateSnapshot

RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15

COPY --from=build-stage /app/build/ /usr/share/nginx/html
