package logger

import (
	"os"
	"time"

	"github.com/0prodigy/fullstack-todo/internal/config"
	"github.com/sirupsen/logrus"
)

var c = config.Config()
var l *logrus.Logger

func InitLogger() {
	l = logrus.New()
	l.SetReportCaller(true)
	l.SetFormatter(&logrus.TextFormatter{
		FullTimestamp:    true,
		TimestampFormat:  time.RFC3339Nano,
		PadLevelText:     true,
		QuoteEmptyFields: true,
	})
	l.SetOutput(os.Stdout)

	switch c.DEBUG_LEVEL {
	case "debug":
		l.SetLevel(logrus.DebugLevel)
	case "info":
		l.SetLevel(logrus.InfoLevel)
	case "warn":
		l.SetLevel(logrus.WarnLevel)
	case "error":
		l.SetLevel(logrus.ErrorLevel)
	}
}

func GetLogger(file string) *logrus.Logger {
	if l == nil {
		InitLogger()
	}
	l.WithField("file", file)
	return l
}
