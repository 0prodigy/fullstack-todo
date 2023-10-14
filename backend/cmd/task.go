package main

import (
	"fmt"
	"strconv"

	"github.com/0prodigy/fullstack-todo/models"
	"github.com/gofiber/fiber/v2"
)

func getTasks(c *fiber.Ctx) error {

	username := c.Locals("username")

	userTasks, err := models.GetUserTasks(db, username.(string))

	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "failed to fetch tasks")
	}

	return c.JSON(userTasks)
}

func createTask(c *fiber.Ctx) error {
	username := c.Locals("username")

	task := &models.Task{}

	// Parse body into struct
	if err := c.BodyParser(task); err != nil {
		log.WithError(err).Error("failed to parse request body")
		return fiber.NewError(fiber.StatusBadRequest, "invalid request body")
	}

	// Create task into database ( we are here means that the task is valid ) (by validateTask middleware)
	err := task.Create(db, username.(string))

	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "failed to save task")
	}
	return c.JSON(task)
}

func updateTask(c *fiber.Ctx) error {
	username := c.Locals("username")
	taskId := c.Params("id")

	// convert string to uint
	id, err := strconv.ParseUint(taskId, 10, 32)
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "invalid task id")
	}

	task := &models.Task{
		ID: uint(id),
	}

	// Parse body into struct
	if err := c.BodyParser(task); err != nil {
		log.WithError(err).Error("failed to parse request body")
		return fiber.NewError(fiber.StatusBadRequest, "invalid request body")
	}

	err = task.Update(db, username.(string))

	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "failed to update task")
	}

	return c.JSON(task)
}

func deleteTask(c *fiber.Ctx) error {

	username := c.Locals("username")
	taskId := c.Params("id")

	// convert string to uint
	id, err := strconv.ParseUint(taskId, 10, 32)
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "invalid task id")
	}

	task := &models.Task{
		ID: uint(id),
	}

	err = task.Delete(db, username.(string))

	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "failed to delete task")
	}

	return c.JSON(fiber.Map{
		"message": "task deleted successfully",
	})
}

func setupTaskRouter(app *fiber.App) {
	// Create a new group for task routes
	taskGroup := app.Group(fmt.Sprintf("%s/tasks", PATH_PREFIX), authMiddleware)

	// Define the task routes
	taskGroup.Get("/", getTasks)
	taskGroup.Post("/", validateTask, createTask)
	taskGroup.Put("/:id", validateTask, isTaskOwner, updateTask)
	taskGroup.Delete("/:id", isTaskOwner, deleteTask)
}
