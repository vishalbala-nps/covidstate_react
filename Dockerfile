FROM nginx:1.17.10-alpine
COPY ./nginx/nginx.conf /etc/nginx
COPY ./build /var/www/covidstate_react
EXPOSE 80