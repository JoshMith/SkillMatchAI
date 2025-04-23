# Use Node.js base image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy dotenv file
COPY .env .env

# Copy the rest of the source files
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose backend port
EXPOSE 3000

# Start the server
CMD ["npm", "run", "start"]
