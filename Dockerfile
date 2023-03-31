FROM node:18

# Create app directory
WORKDIR /POKEDEX

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "node", "src/index.js" ]