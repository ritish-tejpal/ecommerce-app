FROM node:18-slim

WORKDIR /app/client

# COPY /client/package.json /client/package-lock.json ./
COPY /package.json /package-lock.json ./
RUN npm install

COPY . ./
EXPOSE 3000

CMD ["npm", "run", "dev"]