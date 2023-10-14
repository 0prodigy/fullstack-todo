package main

import (
	"strconv"

	"github.com/0prodigy/fullstack-todo/internal/utils"
	"github.com/0prodigy/fullstack-todo/models"
	"github.com/gofiber/fiber/v2"
)

func authMiddleware(c *fiber.Ctx) error {
	token := c.Get("Authorization")

	if token == "" {
		log.Debug("No token provided")
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}

	// Validate token
	username, err := utils.ValidateJWTToken(token)
	if err != nil {
		log.WithError(err).Error("Error validating token")
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}

	c.Locals("username", username)
	return c.Next()

}

func validateTask(c *fiber.Ctx) error {
	task := &models.Task{}

	// Parse body into struct
	if err := c.BodyParser(task); err != nil {
		log.WithError(err).Error("failed to parse request body")
		return fiber.NewError(fiber.StatusBadRequest, "invalid request body")
	}

	// Validate struct
	if err := task.Validate(); err != nil {
		log.WithError(err).Error("failed to validate request body")
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	return c.Next()
}

// Check if the user is allowed to access the task
// this middleware assume that authMiddleware is called before
func isTaskOwner(c *fiber.Ctx) error {
	taskId := c.Params("id")
	username := c.Locals("username")

	if taskId == "" {
		return fiber.NewError(fiber.StatusBadRequest, "invalid task id")
	}

	id, ok := strconv.ParseUint(taskId, 10, 32)
	if ok != nil {
		return fiber.NewError(fiber.StatusBadRequest, "invalid task id type")
	}

	task := &models.Task{
		ID: uint(id),
	}

	// Check if the user is allowed to access the task
	if isOwner := task.IsOwner(db, username.(string)); !isOwner {
		log.Debug("user is not allowed to access task")
		return fiber.NewError(fiber.StatusUnauthorized, "unauthorized")
	}

	return c.Next()
}
