package models

import (
	"errors"

	"github.com/0prodigy/fullstack-todo/internal/logger"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

var log = logger.GetLogger("models/user.go")

type User struct {
	gorm.Model
	ID       uint   `gorm:"primarykey;autoIncrement"`
	Username string `gorm:"uniqueIndex" json:"username"`
	Password string `gorm:"type:md5" json:"password"`
}

func (u *User) Validate() error {
	if u.Username == "" {
		return errors.New("username is required")
	}
	if u.Password == "" {
		return errors.New("password is required")
	}
	return nil
}

func IsUserNameTaken(db *gorm.DB, username string) bool {
	user := &User{}
	if err := db.Where("username = ?", username).First(user).Error; err != nil {
		log.WithError(err).Error("failed to fetch user")
		return false
	}
	return true
}

func (u *User) Create(db *gorm.DB) error {
	if err := db.Create(u).Error; err != nil {
		log.WithError(err).Error("failed to create user")
		return err
	}
	return nil
}

func (u *User) ComparePassword(password string) bool {
	if err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password)); err != nil {
		log.WithError(err).Error("failed to compare password")
		return false
	}
	return true
}

func GetUserByUsername(db *gorm.DB, username string) (*User, error) {
	user := &User{}
	if err := db.Where("username = ?", username).First(user).Error; err != nil {
		log.WithError(err).Error("failed to fetch user")
		return nil, err
	}
	return user, nil
}

func (u *User) BeforeCreate(tx *gorm.DB) error {
	if encryptedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), 0); err == nil {
		u.Password = string(encryptedPassword)
	} else {
		log.WithError(err).Error("failed to encrypt password")
		return err
	}
	return nil
}
