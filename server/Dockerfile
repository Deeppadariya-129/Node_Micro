# ------------------------------
# Use official lightweight Node.js image
# ------------------------------
FROM node:20-alpine

# Set working directory
WORKDIR /app

# ------------------------------
# Copy only package files first for better caching
# ------------------------------
COPY package*.json ./

# Install dependencies
RUN npm ci


FROM node:20-alpine

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm ci

# Install nodemon globally for dev
RUN npm install -g nodemon

# Copy the rest of your backend code
COPY . .

EXPOSE 8000

# Use nodemon in dev mode
CMD ["npm", "run", "dev"]


# ------------------------------
# Copy the rest of the application code
# ------------------------------
COPY . .

# ------------------------------
# Expose backend API port
# ------------------------------
EXPOSE 8000

# ------------------------------
# 🟢 DEVELOPMENT MODE (default)
# ------------------------------
CMD ["npm", "run", "dev"]


# ======================================================================
# 🏗️ PRODUCTION MODE (commented out example)
# ======================================================================
# 1️⃣ Install only production dependencies
# RUN npm ci --only=production
#
# 2️⃣ Set environment variable for production
# ENV NODE_ENV=production
#
# 3️⃣ Start the server using the start script
# CMD ["npm", "start"]
# ======================================================================
