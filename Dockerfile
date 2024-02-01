
FROM node:alpine
WORKDIR '/app'
COPY package.json .
RUN npm install
copy . .
EXPOSE 4200
CMD npm run start
