package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"

	"airline-voucher-backend/handlers"
)

func main() {
	// Load .env file
	if err := godotenv.Load(); err != nil {
		log.Println("⚠️  No .env file found, using defaults...")
	}

	// Get variables or fallback defaults
	port := os.Getenv("APP_PORT")
	if port == "" {
		port = "8080"
	}

	dbPath := os.Getenv("DB_PATH")
	if dbPath == "" {
		dbPath = "./vouchers.db"
	}

	// Init DB
	db := InitDBPath(dbPath)
	defer db.Close()

	app := fiber.New()
	app.Use(cors.New())

	app.Post("/api/check", handlers.CheckVoucherHandler(db))
	app.Post("/api/generate", handlers.GenerateVoucherHandler(db))

	log.Printf("🚀 Server running on port %s\n", port)
	log.Fatal(app.Listen(":" + port))
}
