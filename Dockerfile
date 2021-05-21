FROM node:14.17.0-alpine3.13

WORKDIR /workspace

RUN npm install -g @angular/cli
COPY package.json ./
RUN npm install
COPY . ./
RUN chmod -Rv 777 src/*

EXPOSE 4200

CMD [ "ng", "serve", "--host", "0.0.0.0" ]
