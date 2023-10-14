Review and Usage Guide

This project is a full-stack application that includes a backend server and a frontend UI. The backend server is written in Go and the frontend UI is built with Next.js. The application is containerized using Docker and orchestrated using Docker Compose. The project also includes a Makefile for easy management of common tasks.
Requirements

- Docker: The application is containerized, so you need Docker installed on your machine to run it.
- Docker Compose: This is used to manage and orchestrate the application services.
- Make: A Makefile is included in the project to simplify the execution of common tasks.
  Using the Makefile

The Makefile includes several commands that make it easy to build and run the application:

- build-server: This command builds the Docker image for the backend server.
- start-server: This command starts the backend server in a Docker container.
- stop-server: This command stops and removes the backend server Docker container.
- build-ui: This command builds the Docker image for the frontend UI.
- start-ui: This command starts the frontend UI in a Docker container.
- stop-ui: This command stops and removes the frontend UI Docker container.
- run: This command starts both the backend server and the frontend UI using Docker Compose.
- stop: This command stops both the backend server and the frontend UI using Docker Compose.
- run-dev-ui: This command starts the frontend UI in development mode.
- run-dev-server: This command starts the backend server in development mode.
- run-dev: This command starts both the backend server and the frontend UI in development mode.
- test: This command runs the tests for the backend server.

To use these commands, simply type make <command> in your terminal. For example, to build and start the server, you would type make build-server and then make start-server.
Using Docker Directly

If you prefer to use Docker directly instead of the Makefile, you can do so with the following commands:

- To build the server: docker build -t todo-server Dockerfile.backend
- To start the server: docker run -d -p 8080:8080 --env APP_PORT=8080 --env DEBUG_LEVEL=error --env SQL_LITE_DATABASE_PATH=./prod.db --name todo-server todo-server
- To stop the server: docker stop todo-server && docker rm todo-server
- To build the UI: docker build -t todo-ui Dockerfile.frontend
- To start the UI: docker run -d -p 3000:3000 --name todo-ui todo-ui
- To stop the UI: docker stop todo-ui && docker rm todo-ui

Please note that you can config the application by updating the environment variable values.
