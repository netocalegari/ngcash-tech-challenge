FROM node:18-alpine
WORKDIR /server-side
COPY package.json /server-side/
RUN yarn install
COPY . /server-side/
CMD ["yarn dev"]