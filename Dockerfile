FROM node:16.11-alpine


# Alpine specific commands
RUN apk --no-cache add --update bash curl npm
RUN adduser -D -h /app cloud

# Debian specific commands
#RUN useradd -m -d /app cloud
#RUN apt-get update && apt-get -y install curl


# Setup the environment we will run in
USER cloud
WORKDIR /app

# Allow the GIT_HASH to be associated with the build container
ARG GIT_HASH
ENV GIT_HASH=${GIT_HASH:-dev}

# Default to running on port 3000
EXPOSE 3000
ENV PORT 3000

# Install dependencies before the rest of the project to preserve caching
COPY --chown=cloud:cloud frontend/package*.json ./frontend/
RUN cd frontend && npm install

COPY --chown=cloud:cloud backend/package*.json ./backend/
RUN cd backend && npm install


# Copy the project into the /app and set proper permissions
COPY --chown=cloud:cloud . .


# Build the front into static files
#RUN cd frontend && npm run build

# Launch the Express server which will serve the static frontend files also
CMD ["bin/docker-helper.sh", "startup"]
