# Use official Node.js LTS Alpine base image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /usr/src/app

# Copy package files first (for better Docker layer caching)
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of your source code
COPY . .

# Expose port 3001 (make sure your app listens on this port)
EXPOSE 3001

# Run the app
CMD ["node", "app.js"]
