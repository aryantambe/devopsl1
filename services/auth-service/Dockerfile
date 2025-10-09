FROM node:18-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --production
COPY index.js ./
EXPOSE 4001
ENV PORT=4001
CMD [ "node", "index.js" ]
