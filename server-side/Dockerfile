FROM node:18-alpine
WORKDIR /server-side
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
CMD ["yarn dev"]