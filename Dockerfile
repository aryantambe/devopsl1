# Stage 1: Build the Angular app
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

# Stage 2: Serve using Nginx
FROM nginx:alpine
COPY --from=builder /app/dist/angular-docker-app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
