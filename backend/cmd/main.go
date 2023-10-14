package main

import (
	"github.com/0prodigy/fullstack-todo/database"
	"github.com/0prodigy/fullstack-todo/internal/config"
	"github.com/0prodigy/fullstack-todo/internal/logger"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

var c = config.Config()
var log = logger.GetLogger("main.go")

const (
	CMD_NAME    = "meow"
	PATH_PREFIX = "/api/v1"
)

func main() {
	// initialize database it will panic if it fails
	database.InitDB()
	defer database.CloseDB()

	// run migrations if enabled
	if c.RUN_MIGRATIONS {
		database.RunMigrations()
	}

	// create rest api for auth and then for todo with validation and authorization
	app := fiber.New(fiber.Config{})

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World 👋!")
	})

	app.Use(cors.New())
	app.Use(handleError)
	setupAuthRouter(app)
	setupTaskRouter(app)
	// start server
	log.Fatal(app.Listen(":8000"))

}
