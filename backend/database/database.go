package database

import (
	"github.com/0prodigy/fullstack-todo/internal/config"
	"github.com/0prodigy/fullstack-todo/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func InitDB() {
	gormDB, err := gorm.Open(sqlite.Open(config.Config().SQL_LITE_DATABASE_PATH), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	db = gormDB
}

func RunMigrations() {
	db.AutoMigrate(&models.User{})
	db.AutoMigrate(&models.Task{})
	db.AutoMigrate(&models.UserTask{})
}

func DropTables() {
	db.Migrator().DropTable(&models.User{})
	db.Migrator().DropTable(&models.Task{})
	db.Migrator().DropTable(&models.UserTask{})
}

func GetDB() *gorm.DB {
	if db == nil {
		InitDB()
	}
	return db
}

func CloseDB() {
	sqlDB, err := db.DB()
	if err != nil {
		panic("failed to close database")
	}
	sqlDB.Close()
}
