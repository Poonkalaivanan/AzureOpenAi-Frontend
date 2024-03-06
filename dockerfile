FROM node:18-alpine
WORKDIR /chatUI/
COPY public/ /chatUI/public
COPY src/ /chatUI/src
COPY package.json /chatUI/
COPY package-lock.json /chatUI/
RUN npm install
CMD ["npm", "start"]
