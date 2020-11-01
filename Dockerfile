# Stage 1: Node.js build stage  
FROM node:13.12.0-alpine as build-stage

ARG REACT_APP_API_KEY="Default_Value"

WORKDIR /app

COPY /app/ .

RUN npm run clean

RUN npm install

RUN CI=true npm test --coverage --updateSnapshot

RUN npm run build

# Stage 1, Nginx to serve the compiled app for production
FROM nginx:1.15

COPY --from=build-stage /app/build/ /usr/share/nginx/html
