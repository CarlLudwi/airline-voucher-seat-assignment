package utils

import (
	"fmt"
	"math/rand"
	"time"
)

func GenerateSeats(aircraft string) []string {
	var rows int
	var letters []string

	switch aircraft {
	case "ATR":
		rows = 18
		letters = []string{"A", "C", "D", "F"}
	case "Airbus 320", "Boeing 737 Max":
		rows = 32
		letters = []string{"A", "B", "C", "D", "E", "F"}
	default:
		rows = 30
		letters = []string{"A", "B", "C", "D", "E", "F"}
	}

	rand.Seed(time.Now().UnixNano())
	selected := make(map[string]bool)
	var seats []string

	for len(seats) < 3 {
		row := rand.Intn(rows) + 1
		letter := letters[rand.Intn(len(letters))]
		seat := fmt.Sprintf("%d%s", row, letter)
		if !selected[seat] {
			selected[seat] = true
			seats = append(seats, seat)
		}
	}
	return seats
}
