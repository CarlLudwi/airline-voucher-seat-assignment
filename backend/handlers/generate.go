package handlers

import (
	"airline-voucher-backend/utils"
	"database/sql"
	"time"

	"github.com/gofiber/fiber/v2"
)

type GenerateRequest struct {
	Name         string `json:"name"`
	ID           string `json:"id"`
	FlightNumber string `json:"flightNumber"`
	Date         string `json:"date"`
	Aircraft     string `json:"aircraft"`
}
type GenerateResponse struct {
	Success bool     `json:"success"`
	Seats   []string `json:"seats"`
}

func GenerateVoucherHandler(db *sql.DB) fiber.Handler {
	return func(c *fiber.Ctx) error {
		var req GenerateRequest
		if err := c.BodyParser(&req); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
		}

		// Check if already exists
		var count int
		err := db.QueryRow(`SELECT COUNT(*) FROM vouchers WHERE flight_number=? AND flight_date=?`,
			req.FlightNumber, req.Date).Scan(&count)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Database query error"})
		}
		if count > 0 {
			return c.Status(400).JSON(fiber.Map{"error": "Vouchers already generated for this flight/date"})
		}

		seats := utils.GenerateSeats(req.Aircraft)

		_, err = db.Exec(`
			INSERT INTO vouchers 
			(crew_name, crew_id, flight_number, flight_date, aircraft_type, seat1, seat2, seat3, created_at)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			req.Name, req.ID, req.FlightNumber, req.Date, req.Aircraft,
			seats[0], seats[1], seats[2], time.Now().Format(time.RFC3339))
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Failed to save voucher"})
		}

		return c.JSON(GenerateResponse{Success: true, Seats: seats})
	}
}
