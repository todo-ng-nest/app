FROM node:15.14.0-alpine3.10

RUN addgroup app && adduser -S -G app app
WORKDIR /home/app

COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli
COPY . ./

EXPOSE 4200

CMD [ "ng", "serve" ]
