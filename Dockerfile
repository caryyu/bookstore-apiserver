FROM node:14-alpine AS build
WORKDIR /app
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories
RUN apk --no-cache add python3 make g++
ADD package.json package-lock.json /app/
RUN npm config set registry https://registry.npm.taobao.org
RUN npm ci

FROM node:14-alpine
WORKDIR /app
COPY . /app
COPY --from=build /app/node_modules/ /app/node_modules/
ENV APP_ENV="staging"
EXPOSE 5000
CMD ["npm", "start"]
