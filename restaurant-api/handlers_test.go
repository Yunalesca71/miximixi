package main

import (
	"bytes"
	"database/sql"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gorilla/mux"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	_ "modernc.org/sqlite"
)

// setupTestDB creates an in-memory database for testing
func setupTestDB(t *testing.T) *sql.DB {
	db, err := sql.Open("sqlite", ":memory:")
	require.NoError(t, err)

	query := `
	CREATE TABLE IF NOT EXISTS restaurants (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		description TEXT
	);
	`
	_, err = db.Exec(query)
	require.NoError(t, err)

	return db
}

// setupTestHandler creates a handler with test database
func setupTestHandler(t *testing.T) (*Handler, *sql.DB) {
	db := setupTestDB(t)
	store := NewRestaurantStore(db)
	handler := NewHandler(store)
	return handler, db
}

func TestGetRestaurants(t *testing.T) {
	handler, db := setupTestHandler(t)
	defer db.Close()

	// Test empty list
	req := httptest.NewRequest("GET", "/api/restaurants", nil)
	rr := httptest.NewRecorder()

	handler.GetRestaurants(rr, req)

	assert.Equal(t, http.StatusOK, rr.Code)

	var emptyResponse []Restaurant
	err := json.Unmarshal(rr.Body.Bytes(), &emptyResponse)
	require.NoError(t, err)
	assert.Empty(t, emptyResponse)

	// Add some restaurants
	store := NewRestaurantStore(db)
	_, err = store.Create("麦当劳", "全球连锁快餐")
	require.NoError(t, err)
	_, err = store.Create("肯德基", "美式快餐")
	require.NoError(t, err)

	// Test with data
	req = httptest.NewRequest("GET", "/api/restaurants", nil)
	rr = httptest.NewRecorder()

	handler.GetRestaurants(rr, req)

	assert.Equal(t, http.StatusOK, rr.Code)

	var response []Restaurant
	err = json.Unmarshal(rr.Body.Bytes(), &response)
	require.NoError(t, err)
	assert.Len(t, response, 2)
	assert.Equal(t, "麦当劳", response[0].Name)
	assert.Equal(t, "肯德基", response[1].Name)
}

func TestCreateRestaurant(t *testing.T) {
	handler, db := setupTestHandler(t)
	defer db.Close()

	tests := []struct {
		name       string
		request    CreateRestaurantRequest
		wantStatus int
		wantError  string
	}{
		{
			name:       "success",
			request:    CreateRestaurantRequest{Name: "必胜客", Description: "披萨连锁"},
			wantStatus: http.StatusCreated,
		},
		{
			name:       "missing name",
			request:    CreateRestaurantRequest{Name: "", Description: "描述"},
			wantStatus: http.StatusBadRequest,
			wantError:  "name is required",
		},
		{
			name:       "success without description",
			request:    CreateRestaurantRequest{Name: "星巴克"},
			wantStatus: http.StatusCreated,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			body, _ := json.Marshal(tt.request)
			req := httptest.NewRequest("POST", "/api/restaurants", bytes.NewBuffer(body))
			req.Header.Set("Content-Type", "application/json")
			rr := httptest.NewRecorder()

			handler.CreateRestaurant(rr, req)

			assert.Equal(t, tt.wantStatus, rr.Code)

			if tt.wantError != "" {
				var errResp ErrorResponse
				err := json.Unmarshal(rr.Body.Bytes(), &errResp)
				require.NoError(t, err)
				assert.Equal(t, tt.wantError, errResp.Error)
			} else {
				var resp Restaurant
				err := json.Unmarshal(rr.Body.Bytes(), &resp)
				require.NoError(t, err)
				assert.Equal(t, tt.request.Name, resp.Name)
				assert.Equal(t, tt.request.Description, resp.Description)
				assert.NotZero(t, resp.ID)
				assert.NotEmpty(t, rr.Header().Get("Location"))
			}
		})
	}
}

func TestUpdateRestaurant(t *testing.T) {
	handler, db := setupTestHandler(t)
	defer db.Close()

	// Create a restaurant to update
	store := NewRestaurantStore(db)
	restaurant, err := store.Create("汉堡王", "汉堡连锁")
	require.NoError(t, err)

	tests := []struct {
		name       string
		id         string
		request    UpdateRestaurantRequest
		wantStatus int
		wantError  string
	}{
		{
			name:       "success",
			id:         "1",
			request:    UpdateRestaurantRequest{Description: " flame-grilled burgers"},
			wantStatus: http.StatusOK,
		},
		{
			name:       "not found",
			id:         "999",
			request:    UpdateRestaurantRequest{Description: "new description"},
			wantStatus: http.StatusNotFound,
			wantError:  "restaurant not found",
		},
		{
			name:       "invalid id",
			id:         "abc",
			request:    UpdateRestaurantRequest{Description: "desc"},
			wantStatus: http.StatusBadRequest,
			wantError:  "invalid id format",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			body, _ := json.Marshal(tt.request)
			req := httptest.NewRequest("PUT", "/api/restaurants/"+tt.id, bytes.NewBuffer(body))
			req.Header.Set("Content-Type", "application/json")

			// Add route variables
			vars := map[string]string{"id": tt.id}
			req = mux.SetURLVars(req, vars)

			rr := httptest.NewRecorder()

			handler.UpdateRestaurant(rr, req)

			assert.Equal(t, tt.wantStatus, rr.Code)

			if tt.wantError != "" {
				var errResp ErrorResponse
				err := json.Unmarshal(rr.Body.Bytes(), &errResp)
				require.NoError(t, err)
				assert.Equal(t, tt.wantError, errResp.Error)
			} else {
				var resp Restaurant
				err := json.Unmarshal(rr.Body.Bytes(), &resp)
				require.NoError(t, err)
				assert.Equal(t, restaurant.ID, resp.ID)
				assert.Equal(t, restaurant.Name, resp.Name)
				assert.Equal(t, tt.request.Description, resp.Description)
			}
		})
	}
}

func TestDeleteRestaurant(t *testing.T) {
	handler, db := setupTestHandler(t)
	defer db.Close()

	// Create a restaurant to delete
	store := NewRestaurantStore(db)
	_, err := store.Create("德克士", "炸鸡连锁")
	require.NoError(t, err)

	tests := []struct {
		name       string
		id         string
		wantStatus int
		wantError  string
	}{
		{
			name:       "success",
			id:         "1",
			wantStatus: http.StatusNoContent,
		},
		{
			name:       "not found",
			id:         "999",
			wantStatus: http.StatusNotFound,
			wantError:  "restaurant not found",
		},
		{
			name:       "invalid id",
			id:         "abc",
			wantStatus: http.StatusBadRequest,
			wantError:  "invalid id format",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// Reset database for each test except first
			if tt.name == "success" {
				_, _ = store.Create("德克士", "炸鸡连锁") // recreate for first test
			}

			req := httptest.NewRequest("DELETE", "/api/restaurants/"+tt.id, nil)

			// Add route variables
			vars := map[string]string{"id": tt.id}
			req = mux.SetURLVars(req, vars)

			rr := httptest.NewRecorder()

			handler.DeleteRestaurant(rr, req)

			assert.Equal(t, tt.wantStatus, rr.Code)

			if tt.wantError != "" {
				var errResp ErrorResponse
				body := rr.Body.Bytes()
				if len(body) > 0 {
					err := json.Unmarshal(body, &errResp)
					require.NoError(t, err)
					assert.Equal(t, tt.wantError, errResp.Error)
				}
			}
		})
	}
}

func TestCreateRestaurant_InvalidJSON(t *testing.T) {
	handler, db := setupTestHandler(t)
	defer db.Close()

	req := httptest.NewRequest("POST", "/api/restaurants", bytes.NewBufferString("invalid json"))
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()

	handler.CreateRestaurant(rr, req)

	assert.Equal(t, http.StatusBadRequest, rr.Code)

	var errResp ErrorResponse
	err := json.Unmarshal(rr.Body.Bytes(), &errResp)
	require.NoError(t, err)
	assert.Equal(t, "invalid request body", errResp.Error)
}

func TestUpdateRestaurant_InvalidJSON(t *testing.T) {
	handler, db := setupTestHandler(t)
	defer db.Close()

	req := httptest.NewRequest("PUT", "/api/restaurants/1", bytes.NewBufferString("invalid json"))
	req.Header.Set("Content-Type", "application/json")

	vars := map[string]string{"id": "1"}
	req = mux.SetURLVars(req, vars)

	rr := httptest.NewRecorder()

	handler.UpdateRestaurant(rr, req)

	assert.Equal(t, http.StatusBadRequest, rr.Code)

	var errResp ErrorResponse
	err := json.Unmarshal(rr.Body.Bytes(), &errResp)
	require.NoError(t, err)
	assert.Equal(t, "invalid request body", errResp.Error)
}
