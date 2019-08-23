FROM node

WORKDIR /app

COPY package.json ./

RUN npm install && npm install -g nodemon

COPY src /app/src

CMD DEBUG=app:* nodemon ./src/bin/www

EXPOSE 3003