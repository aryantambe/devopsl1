# Use Node 18 alpine
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the port
EXPOSE 8081

# Start the app
CMD ["node", "index.js"]
