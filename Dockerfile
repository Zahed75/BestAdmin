# Use the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container's working directory
COPY package*.json ./

# Install the application's dependencies
RUN npm install --legacy-peer-deps

# Copy the Next.js application code to the container's working directory
COPY . .

# Set environment variables
ARG NODE_ENV
ARG NEXT_PUBLIC_BASE_API_URL
ARG NEXT_PUBLIC_IMAGE_URL
ARG NEXT_PUBLIC_SOCKET_URL

ENV NODE_ENV=${NODE_ENV}
ENV NEXT_PUBLIC_BASE_API_URL=${NEXT_PUBLIC_BASE_API_URL}
ENV NEXT_PUBLIC_IMAGE_URL=${NEXT_PUBLIC_IMAGE_URL}
ENV NEXT_PUBLIC_SOCKET_URL=${NEXT_PUBLIC_SOCKET_URL}

# Build the Next.js application
RUN npm run build

# Expose the port on which the Next.js application is listening
EXPOSE 3000

# Command to run your Next.js application in production mode
CMD ["npm", "start"]
