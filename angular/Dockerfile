FROM node:lts AS build
WORKDIR /usr/src/app

COPY . .
RUN npm install
RUN npm run build

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/angular-notifications /usr/share/nginx/html
