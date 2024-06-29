# defining our node package version
FROM node:latest

# Create an application directory
RUN mkdir -p /app

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY client/package*.json ./

# Install node packages
RUN npm i --legacy-peer-deps --save-dev ajv
RUN npm --legacy-peer-deps install

# Copy or project directory (locally) in the current directory of our docker image (/app)
COPY client/ .

# Build the app
RUN npm run build

# defining our port of operation
EXPOSE 3000

CMD ["npm", "start"]

