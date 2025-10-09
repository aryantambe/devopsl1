FROM node:18-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --production
COPY index.js ./
EXPOSE 4002
ENV PORT=4002
CMD [ "node", "index.js" ]
