FROM node:14 as node
WORKDIR /app
COPY ./ /app
RUN npm install
RUN npm run build -- --prod

FROM nginx:alpine
COPY --from=node /app/dist/proyect-store /usr/share/nginx/html
