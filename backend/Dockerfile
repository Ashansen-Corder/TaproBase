# ==========================================
# STAGE 1: Build & Dependency Resolution
# ==========================================
# Using the lightweight Alpine image to keep the footprint minimal
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files FIRST to leverage Docker layer caching
COPY package*.json ./

# Install ONLY production dependencies to minimize attack surface and image size
RUN npm ci --omit=dev

# Copy the rest of the backend source code
COPY . .


# ==========================================
# STAGE 2: Secure Production Environment
# ==========================================
FROM node:18-alpine

# Set the environment variable to production
ENV NODE_ENV=production

# Enforce Principle of Least Privilege by switching to the built-in 'node' user.
# This ensures the container DOES NOT run as root, mitigating security risks.
USER node

# Set the working directory (Docker will create this directory owned by 'node')
WORKDIR /app

# Copy the application code and dependencies from Stage 1.
# The --chown flag ensures the non-root user actually owns these files.
COPY --from=build --chown=node:node /app /app

# Expose the standard backend port (Change to 3000, 8000, etc., if your app uses a different one)
EXPOSE 5000

# Start the Node.js application directly
CMD ["npm", "start"]