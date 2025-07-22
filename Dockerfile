# Stage 1: Build the Angular app
FROM node:18 AS build

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build --prod

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy built Angular files from Stage 1
COPY --from=build /app/dist/angular-14-example /usr/share/nginx/html

# Replace default nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
