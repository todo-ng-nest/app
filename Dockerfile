#### Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:14 as build

# Set the working directory
WORKDIR /app

# Add the source dependencies files to app
COPY ./package.json /app/

# Install all the dependencies
RUN npm install

# Add the source code to app
COPY ./ /app/

# Generate the build of the application
RUN npm run build --prod


##### Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:alpine

# Copy the nginx config file to replace the default.
COPY ./nginx.conf  /etc/nginx/conf.d/default.conf

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist/*   /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

#### Considering that we are in the current directory

### Build image
## docker build -t todo.app .
# -t: the target is the name of the image,
# we will refere it when run it the container

### Run container 
## docker run -d -p 80:80 --name todo.app todo.app
# -d: detachable mode
# -p: port mapping
# --name: the name of the container
# at last i specified the image name to run the container