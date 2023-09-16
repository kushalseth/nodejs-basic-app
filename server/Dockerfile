# Use the official Node.js image as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm ci --production

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which your Nest.js application will run
EXPOSE 4000

# Start the Nest.js application
CMD ["npm", "run", "start:dev"]
