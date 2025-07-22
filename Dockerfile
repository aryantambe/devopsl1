# Step 1: Build the app
FROM node:18 as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build



# Step 2: Serve with nginx
FROM nginx:alpine
COPY --from=builder /app/dist/angular-docker-app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


