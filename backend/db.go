package main

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

func InitDBPath(dbPath string) *sql.DB {
	db, err := sql.Open("sqlite3", dbPath)
	if err != nil {
		log.Fatal("Failed to open database:", err)
	}

	createTable := `
	CREATE TABLE IF NOT EXISTS vouchers (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		crew_name TEXT,
		crew_id TEXT,
		flight_number TEXT,
		flight_date TEXT,
		aircraft_type TEXT,
		seat1 TEXT,
		seat2 TEXT,
		seat3 TEXT,
		created_at TEXT
	);
	`
	if _, err := db.Exec(createTable); err != nil {
		log.Fatal("Failed to create table:", err)
	}
	return db
}
