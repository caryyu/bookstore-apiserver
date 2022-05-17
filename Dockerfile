FROM node:14-alpine
WORKDIR /app
RUN apk --no-cache add python3 make g++
ADD package.json package-lock.json /app/
RUN npm ci
COPY . /app

ENV APP_ENV="development"
RUN npx knex migrate:latest --knexfile=./src/knexfile.js
RUN npx knex seed:run --knexfile=./src/knexfile.js

EXPOSE 5000
CMD ["node", "src/index"]

