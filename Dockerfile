# Stage 1: Node.js build stage  
FROM node:12.18.1 as build-stage

ARG REACT_APP_API_KEY="Default_Value"

WORKDIR /app

COPY /app/ .

RUN npm install

RUN npm run lint

RUN CI=true npm test --coverage --updateSnapshot

RUN npm run build

# Stage 1, Nginx to serve the compiled app for production
FROM nginx:1.15

COPY --from=build-stage /app/build/ /usr/share/nginx/html
