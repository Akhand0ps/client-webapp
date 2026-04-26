# Step 1: Build the React application
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the React application for production
RUN npm run build

# Step 2: Serve the application using a lightweight Node server
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install 'serve' globally to serve static files
RUN npm install -g serve

# Copy the dist output from the build stage
COPY --from=build /app/dist ./dist

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application on port 5000
CMD ["serve", "-s", "dist", "-l", "5000"]
