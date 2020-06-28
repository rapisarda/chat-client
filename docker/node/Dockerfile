FROM node:lts-alpine

WORKDIR /app

RUN npm install -g @vue/cli @vue/cli-service-global

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "serve" ]