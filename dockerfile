FROM node:18.13-alpine

WORKDIR /app

COPY package*.json /app/
COPY .env /app/
COPY src /app/src

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
