#FROM node:14.13.0-alpine3.12
FROM python:3.10


# Install any package dependencies
#RUN apk --no-cache add --update bash curl npm
RUN apt-get update && apt-get -y install curl npm


# Allow the GIT_HASH to be associated with the build container
ARG GIT_HASH
ENV GIT_HASH=${GIT_HASH:-dev}


# Create our user account
#RUN adduser -D -h /app cloud
RUN useradd -m -d /app cloud
USER cloud
WORKDIR /app


# Setup the virtual environment to use
RUN python3 -m venv /app/env
ENV PATH="/app/env/bin:$PATH"


# Install dependencies before the rest of the project to preserve cacheing
COPY --chown=cloud:cloud requirements.txt ./
RUN python3 -m pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt


# Copy the project into the /app and set proper permissions
COPY --chown=cloud:cloud . .


# Build the frontend static files now and skip it at startup time
RUN cd frontend && npm install && npm run build


# Default to running on port 3000
EXPOSE 3000


# Specify the Flask environment to load
ENV ENVIRONMENT=production


# Start up the node server process by default
CMD [ "bash", "-c", "bin/startup.sh -re ${ENVIRONMENT}" ]
