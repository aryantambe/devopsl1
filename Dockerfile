# Stage 1: Build the Angular app
FROM node:22-alpine AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Stage 2: Serve the app with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/my-angular-app /usr/share/nginx/html

EXPOSE 80
