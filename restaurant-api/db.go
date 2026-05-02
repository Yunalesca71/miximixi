package main

import (
	"database/sql"
	"fmt"
	"os"

	_ "modernc.org/sqlite"
)

// DB is the global database connection
var DB *sql.DB

// InitDB initializes the SQLite database connection and creates tables
func InitDB() error {
	dbPath := os.Getenv("DB_PATH")
	if dbPath == "" {
		dbPath = "./restaurant.db"
	}

	db, err := sql.Open("sqlite", dbPath)
	if err != nil {
		return fmt.Errorf("failed to open database: %w", err)
	}

	// Test connection
	if err := db.Ping(); err != nil {
		return fmt.Errorf("failed to ping database: %w", err)
	}

	// Create tables
	if err := createTables(db); err != nil {
		return fmt.Errorf("failed to create tables: %w", err)
	}

	DB = db
	return nil
}

// createTables creates the necessary database tables
func createTables(db *sql.DB) error {
	query := `
	CREATE TABLE IF NOT EXISTS restaurants (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		description TEXT
	);
	`
	_, err := db.Exec(query)
	return err
}

// RestaurantStore provides database operations for restaurants
type RestaurantStore struct {
	db *sql.DB
}

// NewRestaurantStore creates a new RestaurantStore
func NewRestaurantStore(db *sql.DB) *RestaurantStore {
	return &RestaurantStore{db: db}
}

// GetAll retrieves all restaurants from the database
func (s *RestaurantStore) GetAll() ([]Restaurant, error) {
	rows, err := s.db.Query("SELECT id, name, description FROM restaurants ORDER BY id")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var restaurants []Restaurant
	for rows.Next() {
		var r Restaurant
		if err := rows.Scan(&r.ID, &r.Name, &r.Description); err != nil {
			return nil, err
		}
		restaurants = append(restaurants, r)
	}

	return restaurants, rows.Err()
}

// GetByID retrieves a single restaurant by ID
func (s *RestaurantStore) GetByID(id int64) (*Restaurant, error) {
	var r Restaurant
	err := s.db.QueryRow(
		"SELECT id, name, description FROM restaurants WHERE id = ?",
		id,
	).Scan(&r.ID, &r.Name, &r.Description)

	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}

	return &r, nil
}

// Create inserts a new restaurant into the database
func (s *RestaurantStore) Create(name, description string) (*Restaurant, error) {
	result, err := s.db.Exec(
		"INSERT INTO restaurants (name, description) VALUES (?, ?)",
		name, description,
	)
	if err != nil {
		return nil, err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return nil, err
	}

	return &Restaurant{
		ID:          id,
		Name:        name,
		Description: description,
	}, nil
}

// Update modifies an existing restaurant's description
func (s *RestaurantStore) Update(id int64, description string) error {
	result, err := s.db.Exec(
		"UPDATE restaurants SET description = ? WHERE id = ?",
		description, id,
	)
	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return sql.ErrNoRows
	}

	return nil
}

// Delete removes a restaurant from the database
func (s *RestaurantStore) Delete(id int64) error {
	result, err := s.db.Exec("DELETE FROM restaurants WHERE id = ?", id)
	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return sql.ErrNoRows
	}

	return nil
}
