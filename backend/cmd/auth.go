package main

import (
	"fmt"

	"github.com/0prodigy/fullstack-todo/database"
	"github.com/0prodigy/fullstack-todo/internal/utils"
	"github.com/0prodigy/fullstack-todo/models"
	"github.com/gofiber/fiber/v2"
)

var db = database.GetDB()

func handleRegisterUser(c *fiber.Ctx) error {
	reqUser := &models.User{}

	if err := c.BodyParser(reqUser); err != nil {
		log.Debugf("failed to parse request body: %s", err.Error())
		return fiber.NewError(fiber.StatusBadRequest, "invalid request body")
	}

	if err := reqUser.Validate(); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	if models.IsUserNameTaken(db, reqUser.Username) {
		return fiber.NewError(fiber.StatusBadRequest, "username is taken")
	}

	log.Debugf("creating user: %s", reqUser.Username)
	if err := reqUser.Create(db); err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}
	log.Debugf("user created: %s", reqUser.Username)

	return c.JSON(fiber.Map{
		"message": "user created successfully",
	})
}

func handleLoginUser(c *fiber.Ctx) error {
	reqUser := &models.User{}

	if err := c.BodyParser(reqUser); err != nil {
		log.Debugf("failed to parse request body: %s", err.Error())
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	if err := reqUser.Validate(); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	log.Debugf("fetching user: %s", reqUser.Username)
	user, err := models.GetUserByUsername(db, reqUser.Username)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "invalid username")
	}

	log.Debugf("comparing passwords for user: %s", reqUser.Username)
	if !user.ComparePassword(reqUser.Password) {
		return fiber.NewError(fiber.StatusUnauthorized, "invalid credentials")
	}

	log.Debugf("creating jet token for user: %s", reqUser.Username)
	jwtToken := utils.CreateJWTToken(user.Username)

	return c.JSON(fiber.Map{
		"message": "user logged in successfully",
		"token":   jwtToken,
	})
}

func setupAuthRouter(app *fiber.App) {
	authRouter := app.Group(fmt.Sprintf("%s/auth", PATH_PREFIX))

	// routes for user authentication
	authRouter.Post("/register", handleRegisterUser)
	authRouter.Post("/login", handleLoginUser)
}
