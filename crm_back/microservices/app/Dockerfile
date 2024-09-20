FROM node:22.4.1
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 7003
ENV POSTGRES_HOST=db
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=root
ENV POSTGRES_DB=postgres
ENV POSTGRES_PORT=5432
CMD ["npm", "run", "start:dev"]
