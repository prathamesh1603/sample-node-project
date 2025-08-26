# Use official Node.js LTS base image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /usr/src/app

# Copy package files first for better caching
COPY package*.json ./

# Install app dependencies
RUN npm install --production

# Copy the rest of your app source code
COPY . .

# Expose port 3000 (make sure your app listens on this port)
EXPOSE 3000

# Default command to run your app
CMD ["node", "app.js"]

