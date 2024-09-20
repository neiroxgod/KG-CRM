FROM node:22.4.1
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 7000
CMD ["npm", "run", "start:dev"]
