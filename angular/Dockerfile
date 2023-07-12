FROM node:lts AS deps
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

FROM nginx:stable-alpine as build
RUN npm run build
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=deps /usr/src/app/dist/angular-notifications /usr/share/nginx/html

FROM deps as dev
EXPOSE 4200
CMD ["npm","start"]
