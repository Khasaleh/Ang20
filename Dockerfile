FROM node:20-alpine3.17 as build-step
ENV NODE_ENV=qa
WORKDIR /app
### COPY package*.json /app
### ADD package*.json /app
COPY . /app
#RUN npm config set registry http://npm.fazeal.cloudns.ph:4873/
RUN npm install

RUN npm i -g @angular/cli

#RUN npm run build --qa
RUN ng build --c=qa
###RUN npm run build
#RUN ng build
#RUN npm build --configuration production

#FROM nginx:1.17.1-alpine
FROM nginx:1.21-alpine

RUN rm -rf /usr/share/nginx/html/*
##COPY  --from=build-step /app/nginx/*  /etc/nginx/conf.d/default.conf

#COPY --from=build-step /app/dist/ng-docker-example /usr/share/nginx/html
COPY --from=build-step /app/dist/* /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 8082
CMD ["nginx", "-g", "daemon off;"]