### Review and Usage Guide

This project is a full-stack application that includes a backend server and a frontend UI. The backend server is written in Go and the frontend UI is built with Next.js. The application is containerized using Docker and orchestrated using Docker Compose. The project also includes a Makefile for easy management of common tasks.

### Prerequisites

To run this project, you need the following:

- Go: The backend server is written in Go, so you need Go installed on your machine to build and run the server.
- Node.js: The frontend UI is built with Next.js, so you need Node.js installed on your machine to build and run the UI.
- Docker: The application is containerized, so you need Docker installed on your machine to run it.
- Docker Compose: This is used to manage and orchestrate the application services.
- Make: A Makefile is included in the project to simplify the execution of common tasks.
  Using the Makefile

## The Makefile includes several commands that make it easy to build and run the application:

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

# If you prefer to use Docker directly instead of the Makefile, you can do so with the following commands:

- To build the server: docker build -t todo-server Dockerfile.backend
- To start the server: docker run -d -p 8080:8080 --env APP_PORT=8080 --env DEBUG_LEVEL=error --env SQL_LITE_DATABASE_PATH=./prod.db --name todo-server todo-server
- To stop the server: docker stop todo-server && docker rm todo-server
- To build the UI: docker build -t todo-ui Dockerfile.frontend
- To start the UI: docker run -d -p 3000:3000 --name todo-ui todo-ui
- To stop the UI: docker stop todo-ui && docker rm todo-ui

Please note that you can config the application by updating the environment variable values.

# If you prefer local development, you can run the server and UI locally using the following commands:

- Clone the repository: `git clone https://github.com/0prodigy/fullstack-todo.git`
- To start the server: `cd backend && go run ./cmd/`
- To start the UI: `cd frontend && yarn run dev`

### Usages and Examples

Accessing the Application From a Browser

Once the application is running, you can access it at http://localhost:3000.
When you first access the application, you will be prompted to login. The default username and password are admin and admin.
Once you login, you will be taken to the home page where you can create a new task, view all tasks, and update the status of a task.
The list of operations you can perform are:

- Create a new task: Click the Create Task button and enter the task details.
- View all tasks: Click the View Tasks button.
- Update the status of a task: Click the Update Status button next to the task you want to update.
- Delete a task: Click the Delete button next to the task you want to delete.

Accessing the Application From the CURL Command Line

You can also access the application from the command line using the CURL command. For example, to create a new task, you would type the following command:

Sign in

curl -X POST -H "Content-Type: application/json" -d '{"username":"admin","password":"admin"}' http://localhost:8080/api/v1/signin
this will return a token in the response body, copy the token and use it in the next request

curl -X GET -H "Authorization: <token>" http://localhost:8080/api/v1/tasks

curl -X POST -H "Content-Type: application/json" -H "Authorization: <token>" -d '{"title":"test","description":"test","status":"TODO"}' http://localhost:8080/api/v1/tasks
this will return the created task in the response body

curl -X PUT -H "Content-Type: application/json" -H "Authorization: <token>" -d '{"title":"test","description":"test","status":"COMPLETED"}' http://localhost:8080/api/v1/tasks/<id>
this will return the updated task in the response body

curl -X DELETE -H "Authorization: <token>" http://localhost:8080/api/v1/tasks/<id>

## Running the tests

To run the tests, run the following command:

```bash
  make test
```

# If you prefer to run test locally, you can do so with the following commands:

- To run the tests: `cd backend && go test ./...`
