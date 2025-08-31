

FROM node:22-alpine AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Stage 2: Serve the app with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/weather-app /usr/share/nginx/html

EXPOSE 80
