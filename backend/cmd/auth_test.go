package main

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/0prodigy/fullstack-todo/database"
	"github.com/gofiber/fiber/v2"
)

// TestRegister tests the register endpoint using go table driven tests
func TestRegister(t *testing.T) {
	database.InitDB()
	defer database.CloseDB()

	database.DropTables()

	// run migrations if enabled
	if c.RUN_MIGRATIONS {
		database.RunMigrations()
	}

	app := fiber.New()
	app.Use(handleError)
	setupAuthRouter(app)

	// Create a slice of struct to store test cases
	tests := []struct {
		name         string
		payload      []byte
		expectedCode int
	}{
		{
			name: "Valid register",
			payload: []byte(`{
				"username": "test",
				"password": "test"
			}`),
			expectedCode: http.StatusOK,
		},
		{
			name: "Invalid register",
			payload: []byte(`{
				"username": "test",
				"password": "test"
			}`),
			expectedCode: http.StatusBadRequest,
		},
	}

	// Iterate over the test cases
	for _, tc := range tests {
		// Create a new request
		req := httptest.NewRequest(http.MethodPost, "/api/v1/auth/register", bytes.NewBuffer(tc.payload))
		req.Header.Set("Content-Type", "application/json")

		// Perform the request
		res, err := app.Test(req)
		if err != nil {
			t.Errorf("Failed to perform request: %s", err.Error())
			t.FailNow()
		}

		// Check the status code
		if res.StatusCode != tc.expectedCode {
			t.Errorf("Expected status code %d, but got %d", tc.expectedCode, res.StatusCode)
		}
	}
}

// TestLogin tests the login endpoint using go table driven tests
func TestLogin(t *testing.T) {
	database.InitDB()
	defer database.CloseDB()

	// run migrations if enabled
	if c.RUN_MIGRATIONS {
		database.RunMigrations()
	}

	app := fiber.New()
	app.Use(handleError)
	setupAuthRouter(app)

	// Create a slice of struct to store test cases
	tests := []struct {
		name         string
		payload      []byte
		expectedCode int
	}{
		{
			name: "Valid login",
			payload: []byte(`{
				"username": "test",
				"password": "test"
			}`),
			expectedCode: http.StatusOK,
		},
		{
			name: "Invalid login",
			payload: []byte(`{
				"username": "test1"
			}`),
			expectedCode: http.StatusBadRequest,
		},
		{
			name: "Invalid login",
			payload: []byte(`{
				"username": "test1",
				"password": "test"
			}`),
			expectedCode: http.StatusUnauthorized,
		},
		{
			name: "Invalid login",
			payload: []byte(`{
				"username": "test",
				"password": "test1"
			}`),
			expectedCode: http.StatusUnauthorized,
		},
		{
			name: "Invalid login",
			payload: []byte(`{
				"username": "test1",
				"password": "test1"
			}`),
			expectedCode: http.StatusUnauthorized,
		},
	}

	// Iterate over the test cases
	for _, tc := range tests {
		// Create a new request
		req := httptest.NewRequest(http.MethodPost, "/api/v1/auth/login", bytes.NewBuffer(tc.payload))
		req.Header.Set("Content-Type", "application/json")

		// Perform the request
		res, err := app.Test(req)
		if err != nil {
			t.Errorf("Failed to perform request: %s", err.Error())
			t.FailNow()
		}

		// Check the status code
		if res.StatusCode != tc.expectedCode {
			t.Errorf("Expected status code %d, but got %d", tc.expectedCode, res.StatusCode)
		}
	}
}
