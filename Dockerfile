# ---------- Stage 1: Build Angular ----------
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY angular-frontend/package*.json ./

# Install dependencies
RUN npm install -g @angular/cli && npm install

# Copy the rest of the Angular project
COPY angular-frontend/ .

# Build Angular app
RUN ng build --configuration production

# ---------- Stage 2: Serve ----------
FROM node:18
WORKDIR /app

# Install a lightweight static server
RUN npm install -g http-server

# Copy built Angular files from build stage
COPY --from=build /app/dist/angular-frontend ./dist

# Expose port
EXPOSE 8080

# Start http-server
CMD ["http-server", "dist", "-p", "8080", "-a", "0.0.0.0"]
