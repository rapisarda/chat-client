FROM node:lts-alpine

WORKDIR /app


RUN npm install

COPY . .

EXPOSE 8080

#RUN npm serve

CMD [ "npm", "run", "serve" ]