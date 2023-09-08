FROM node:lts-slim

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --dev

COPY . .

CMD [ "yarn", "start" ]
