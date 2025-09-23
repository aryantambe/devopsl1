# Stage 1: Build Angular app
FROM node:20 AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Nginx server to serve Angular app
FROM nginx:alpine
# Copy compiled Angular app from dist folder
COPY --from=build /app/dist/angular-docker-app /usr/share/nginx/html
# Copy custom nginx config (handles Angular routes)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 and start nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
