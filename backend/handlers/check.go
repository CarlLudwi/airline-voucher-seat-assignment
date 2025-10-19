package handlers

import (
	"database/sql"

	"github.com/gofiber/fiber/v2"
)

type CheckRequest struct {
	FlightNumber string `json:"flightNumber"`
	Date         string `json:"date"`
}
type CheckResponse struct {
	Exists bool `json:"exists"`
}

func CheckVoucherHandler(db *sql.DB) fiber.Handler {
	return func(c *fiber.Ctx) error {
		var req CheckRequest
		if err := c.BodyParser(&req); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
		}

		var count int
		err := db.QueryRow(`SELECT COUNT(*) FROM vouchers WHERE flight_number=? AND flight_date=?`,
			req.FlightNumber, req.Date).Scan(&count)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Database query error"})
		}

		return c.JSON(CheckResponse{Exists: count > 0})
	}
}
