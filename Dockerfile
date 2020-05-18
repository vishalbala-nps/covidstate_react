FROM node:13.14-alpine
WORKDIR /app
COPY ./build ./build
RUN npm install -g serve
EXPOSE 5000
CMD ["serve","-s","build"]