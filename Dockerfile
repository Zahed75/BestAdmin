# Use the official Node.js image as a base
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3004

# Set the environment variable for the public API endpoint
ENV NEXT_PUBLIC_API_ENDPOINT=https://app.bestelectronics.com.bd/api/v1

# Start the Next.js application
CMD ["npm", "run", "start"]
