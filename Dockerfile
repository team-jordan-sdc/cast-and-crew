FROM node:8-jessie

## LEGACY DOCKERFILE ##
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
RUN npm run webpack
CMD ["node", "server/index.js"]
