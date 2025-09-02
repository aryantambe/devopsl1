# ---------- Build stage ----------
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Set the public URL if you deploy under a subpath: e.g. REACT_APP_ vars or HOMEPAGE
RUN npm run build

# ---------- Run stage: serve static files with Nginx ----------
FROM nginx:1.27-alpine
# Remove default site and add our config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.config /etc/nginx/conf.d/react.conf

# Copy build artifacts
COPY --from=build /app/build /usr/share/nginx/html

# Health check (optional)
HEALTHCHECK CMD wget -qO- http://localhost/ || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
