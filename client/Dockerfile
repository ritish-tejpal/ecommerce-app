FROM node:16

WORKDIR /app/client

COPY ./package.json ./package-lock.json ./

RUN npm install

RUN npm install -g vite

COPY . .
EXPOSE 5173

CMD ["npm", "run", "dev"]