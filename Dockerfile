
https://www.youtube.com/watch?v=6aJxOspR-NM  13:
FROM node:alpine
WORKDIR '/app'
COPY package.json .
RUN npm install
copy . .
EXPOSE 4200
CMD npm run start
