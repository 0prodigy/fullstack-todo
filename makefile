APP_PORT ?= 8080
DEBUG_LEVEL ?= error
DB_PATH ?= ./prod.db
# write scripts file for makefile to run docker container 

.PHONY: build-server
build-server:
	docker build -t todo-server Dockerfile.backend

.PHONY: start-server
start-server:
	docker run -d -p $(APP_PORT):$(APP_PORT) --env APP_PORT=$(APP_PORT) --env DEBUG_LEVEL=$(DEBUG_LEVEL) --env SQL_LITE_DATABASE_PATH=$(DB_PATH) --name todo-server todo-server

.PHONY: stop-server
stop-server:
	docker stop todo-server
	docker rm  todo-server

.PHONY: build-ui
build-ui:
	docker build -t todo-ui Dockerfile.frontend

.PHONY: start-ui
start-ui:
	docker run -d -p 3000:3000 --name todo-server todo-server

.PHONY: stop-ui
stop-ui:
	docker stop todo-ui
	docker rm  todo-ui

.PHONY: run
run: 
	docker-compose up

.PHONY: stop
stop: 
	docker-compose down

.PHONY: run-dev-ui
run-dev-ui: 
	cd ./frontend && yarn run dev

.PHONY: run-dev-server
run-dev-server: 
	cd ./backend && DEBUG_LEVEL=$(DEBUG_LEVEL) APP_PORT=$(APP_PORT) go run ./cmd/...

.PHONY: run-dev
run-dev: 
	make run-dev-ui & make run-dev-server

.PHONY: test
test:
	go test ./...