FROM node:18-slim

WORKDIR /app/client

# To be used with docker-compose up
COPY /client/package.json /client/package-lock.json ./
# To be used with docker build
# COPY package.json package-lock.json ./
RUN npm install

COPY . .
EXPOSE 5173

ENV NODE_ENV=production
ENV PATH=$PATH

CMD ["npm", "run", "dev"]