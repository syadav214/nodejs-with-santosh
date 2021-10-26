FROM node:12

RUN npm install
RUN npm run build
RUN mkdir -p /app
WORKDIR /app

COPY dist/ dist/
COPY node_modules/ node_modules/
EXPOSE 3000

CMD "npm" "start:prod"
