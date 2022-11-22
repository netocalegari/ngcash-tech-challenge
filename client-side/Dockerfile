FROM node:18-alpine AS build
WORKDIR /client-side
COPY . .
RUN yarn install
EXPOSE 3000
CMD ["yarn", "start"]