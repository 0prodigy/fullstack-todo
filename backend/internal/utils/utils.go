package utils

import (
	"github.com/golang-jwt/jwt/v5"

	"github.com/0prodigy/fullstack-todo/internal/config"
)

var c = config.Config()

func CreateJWTToken(username string) string {
	// Create a new JWT.
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": username,
	})

	// Get the signed token string.
	signedToken, err := token.SignedString([]byte(c.JWT_SECRET))
	if err != nil {
		panic(err)
	}
	return signedToken
}

func ValidateJWTToken(tokenString string) (string, error) {
	// Parse the JWT string and store the result in `claims`.
	claim := jwt.MapClaims{}
	_, err := jwt.ParseWithClaims(tokenString, claim, func(token *jwt.Token) (interface{}, error) {
		return []byte(c.JWT_SECRET), nil
	})

	if err != nil {
		return "", err
	}

	return claim["username"].(string), nil
}
