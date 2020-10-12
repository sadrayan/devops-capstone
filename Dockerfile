FROM node:13.12.0-alpine

WORKDIR /app

COPY . /app/

RUN npm install && \
    npm update && \
    npm run build

# Expose port 3000
EXPOSE 3000

# start app
ENTRYPOINT [ "npm", "start" ]