package config

import "os"

type config struct {
	DEBUG                  bool
	DEBUG_LEVEL            string
	APP_PORT               string
	SQL_LITE_DATABASE_PATH string
	RUN_MIGRATIONS         bool
	JWT_SECRET             string
}

var c *config

func (c *config) defaults() *config {
	c.DEBUG = true
	c.DEBUG_LEVEL = "debug"
	c.APP_PORT = "8080"
	c.SQL_LITE_DATABASE_PATH = "./prod.db"
	c.RUN_MIGRATIONS = true
	c.JWT_SECRET = "secret"
	return c
}

func (c *config) fromEnv() *config {
	if os.Getenv("DEBUG") != "" {
		c.DEBUG = os.Getenv("DEBUG") == "true"
	}
	if os.Getenv("APP_PORT") != "" {
		c.APP_PORT = os.Getenv("APP_PORT")
	}
	if os.Getenv("SQL_LITE_DATABASE_PATH") != "" {
		c.SQL_LITE_DATABASE_PATH = os.Getenv("SQL_LITE_DATABASE_PATH")
	}
	if os.Getenv("RUN_MIGRATIONS") != "" {
		c.RUN_MIGRATIONS = os.Getenv("RUN_MIGRATIONS") == "true"
	}
	if os.Getenv("DEBUG_LEVEL") != "" {
		c.DEBUG_LEVEL = os.Getenv("DEBUG_LEVEL")
	}
	if os.Getenv("JWT_SECRET") != "" {
		c.JWT_SECRET = os.Getenv("JWT_SECRET")
	}

	return c
}

func Config() *config {
	return c
}

func init() {
	c = new(config).defaults().fromEnv()
}
