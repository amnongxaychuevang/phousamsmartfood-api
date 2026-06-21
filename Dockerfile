# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Copy package files and install all dependencies (including devDependencies for TypeScript build)
COPY package*.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build


# Stage 2: Production environment
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package files and install ONLY production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy the built JavaScript files from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Expose the port your API runs on (defaulting to 5000 based on src/index.ts)
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]
