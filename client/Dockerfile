# Use the official Node.js 14 LTS image as the base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Install app dependencies
COPY package.json .
RUN yarn install --production

# Copy the app's source code
COPY . .

# Build the Next.js app
RUN yarn build

# Expose the required port (e.g., 3000 for Next.js)
EXPOSE 3000

# Start the app
CMD ["yarn", "start"]