package models

import (
	"errors"

	"gorm.io/gorm"
)

type TaskStatus string

const (
	TODO      TaskStatus = "TODO"
	COMPLETED TaskStatus = "COMPLETED"
	CANCELED  TaskStatus = "CANCELED"
)

type Task struct {
	gorm.Model
	ID          uint       `gorm:"primaryKey,autoIncrement" json:"id"`
	Title       string     `gorm:"not null" json:"title"`
	Description string     `gorm:"not null" json:"description"`
	Status      TaskStatus `gorm:"type:varchar(11);not null" json:"status"`
}

type UserTask struct {
	gorm.Model
	ID     uint `gorm:"primaryKey,autoIncrement" json:"id"`
	User   User `gorm:"foreignKey:UserID" json:"user"`
	UserID uint `gorm:"not null" json:"user_id"`
	Task   Task `gorm:"foreignKey:TaskID" json:"task"`
	TaskID uint `gorm:"not null" json:"task_id"`
}

func GetUserTasks(db *gorm.DB, username string) ([]*Task, error) {
	tasks := []*Task{}

	if err := db.Joins("JOIN user_tasks on user_tasks.id = tasks.id").Joins("JOIN users on users.id = user_tasks.user_id").Where("users.username = ?", username).Find(&tasks).Error; err != nil {
		log.WithError(err).Error("failed to fetch user tasks")
		return nil, err
	}

	return tasks, nil
}

func (t *Task) Validate() error {
	if t.Title == "" {
		return errors.New("title is required")
	}
	if t.Description == "" {
		return errors.New("description is required")
	}
	if t.Status == "" {
		return errors.New("status is required")
	}
	if t.Status != TODO && t.Status != COMPLETED && t.Status != CANCELED {
		return errors.New("status must be one of TODO, COMPLETED, or CANCELED")
	}
	return nil
}

func (t *Task) Create(db *gorm.DB, username string) error {
	// Create a new task.
	if err := db.Create(t).Error; err != nil {
		log.WithError(err).Error("failed to create task")
		return err
	}
	// Create a new user task.
	user, err := GetUserByUsername(db, username)
	if err != nil {
		log.WithError(err).Error("failed to fetch user")
		return err
	}

	userTask := &UserTask{
		UserID: user.ID,
		TaskID: t.ID,
	}
	if err := db.Create(userTask).Error; err != nil {
		log.WithError(err).Error("failed to create user task")
		return err
	}

	return nil
}

func (t *Task) Update(db *gorm.DB, username string) error {
	// Update a task.
	if err := db.Save(t).Error; err != nil {
		log.WithError(err).Error("failed to update task")
		return err
	}

	return nil
}

func (t *Task) Delete(db *gorm.DB, username string) error {
	// Delete a task.
	if err := db.Delete(t).Error; err != nil {
		log.WithError(err).Error("failed to delete task")
		return err
	}

	// Delete a user task.
	user, err := GetUserByUsername(db, username)
	if err != nil {
		log.WithError(err).Error("failed to fetch user")
		return err
	}

	if err := db.Where("user_id = ? AND task_id = ?", user.ID, t.ID).Delete(&UserTask{
		UserID: user.ID,
		TaskID: t.ID,
	}).Error; err != nil {
		log.WithError(err).Error("failed to delete user task")
		return err
	}
	return nil
}

func (t *Task) IsOwner(db *gorm.DB, username string) bool {
	user, err := GetUserByUsername(db, username)
	if err != nil {
		log.WithError(err).Error("failed to fetch user")
		return false
	}

	userTask := &UserTask{}
	if err := db.Where("user_id = ? AND task_id = ?", user.ID, t.ID).First(userTask).Error; err != nil {
		log.WithError(err).Error("failed to fetch user task")
		return false
	}

	return true
}
