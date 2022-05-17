FROM node:14-alpine AS build
WORKDIR /app
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories
RUN apk --no-cache add python3 make g++
ADD package.json package-lock.json /app/
RUN npm config set registry https://registry.npm.taobao.org
RUN npm ci

FROM node:14-alpine
COPY . /app
COPY --from=build /app/node_modules/ /app/node_modules/
ENV APP_ENV="development"
RUN npx knex migrate:latest --knexfile=./src/knexfile.js
RUN npx knex seed:run --knexfile=./src/knexfile.js
EXPOSE 5000
CMD ["node", "src/index"]
