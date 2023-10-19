package main

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/0prodigy/fullstack-todo/database"
	"github.com/0prodigy/fullstack-todo/internal/utils"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

// TestCreateTask tests the create task endpoint
func TestCreateTask(t *testing.T) {
	database.InitDB()
	defer database.CloseDB()

	app := fiber.New()
	app.Use(cors.New())
	app.Use(handleError)
	setupTaskRouter(app)

	var jwt = utils.CreateJWTToken("test")

	// Create a slice of struct to store test cases
	tests := []struct {
		name         string
		payload      []byte
		expectedCode int
	}{
		{
			name: "Valid create task",
			payload: []byte(`{
				"title": "test",
				"description": "test",
				"status": "BACKLOG"
			}`),
			expectedCode: http.StatusOK,
		},
		{
			name: "Invalid create task without status",
			payload: []byte(`{
				"title": "test",
				"description": "test"
			}`),
			expectedCode: http.StatusBadRequest,
		},
		{
			name: "Invalid create task without title",
			payload: []byte(`{
				"description": "test",
				"status": "BACKLOG"
			}`),
			expectedCode: http.StatusBadRequest,
		},
		{
			name: "Invalid create task without description",
			payload: []byte(`{
				"title": "test",
				"status": "BACKLOG"
			}`),
			expectedCode: http.StatusBadRequest,
		},
	}

	// Iterate over the test cases
	for _, tc := range tests {
		// Create a new request
		req := httptest.NewRequest(http.MethodPost, "/api/v1/tasks", bytes.NewBuffer(tc.payload))
		req.Header.Set("Content-Type", "application/json")
		req.Header.Set("Authorization", "Bearer "+jwt)

		// Perform the request
		res, err := app.Test(req)
		if err != nil {
			t.Fatal(err)
		}

		// Check the response status code
		if res.StatusCode != tc.expectedCode {
			t.Fatalf("expected status code %d, got %d", tc.expectedCode, res.StatusCode)
		}
	}
}
