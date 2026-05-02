package main

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

// Handler holds the dependencies for HTTP handlers
type Handler struct {
	store *RestaurantStore
}

// NewHandler creates a new Handler with the given store
func NewHandler(store *RestaurantStore) *Handler {
	return &Handler{store: store}
}

// GetRestaurants godoc
// @Summary      获取所有餐厅
// @Description  返回系统中所有餐厅的列表
// @Tags         restaurants
// @Accept       json
// @Produce      json
// @Success      200  {array}   Restaurant
// @Router       /api/restaurants [get]
func (h *Handler) GetRestaurants(w http.ResponseWriter, r *http.Request) {
	restaurants, err := h.store.GetAll()
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "failed to fetch restaurants")
		return
	}

	// Return empty array if no restaurants
	if restaurants == nil {
		restaurants = []Restaurant{}
	}

	respondWithJSON(w, http.StatusOK, restaurants)
}

// CreateRestaurant godoc
// @Summary      创建新餐厅
// @Description  创建一个新的餐厅记录
// @Tags         restaurants
// @Accept       json
// @Produce      json
// @Param        request  body      CreateRestaurantRequest  true  "餐厅信息"
// @Success      201      {object}  Restaurant
// @Failure      400      {object}  ErrorResponse
// @Router       /api/restaurants [post]
func (h *Handler) CreateRestaurant(w http.ResponseWriter, r *http.Request) {
	var req CreateRestaurantRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		respondWithError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	if req.Name == "" {
		respondWithError(w, http.StatusBadRequest, "name is required")
		return
	}

	restaurant, err := h.store.Create(req.Name, req.Description)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "failed to create restaurant")
		return
	}

	w.Header().Set("Location", "/api/restaurants/"+strconv.FormatInt(restaurant.ID, 10))
	respondWithJSON(w, http.StatusCreated, restaurant)
}

// UpdateRestaurant godoc
// @Summary      更新餐厅简介
// @Description  修改指定餐厅的简介信息
// @Tags         restaurants
// @Accept       json
// @Produce      json
// @Param        id       path      int                     true  "餐厅ID"
// @Param        request  body      UpdateRestaurantRequest  true  "更新的简介"
// @Success      200      {object}  Restaurant
// @Failure      400      {object}  ErrorResponse
// @Failure      404      {object}  ErrorResponse
// @Router       /api/restaurants/{id} [put]
func (h *Handler) UpdateRestaurant(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	idStr := vars["id"]

	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "invalid id format")
		return
	}

	var req UpdateRestaurantRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		respondWithError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	// Check if restaurant exists
	existing, err := h.store.GetByID(id)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "failed to fetch restaurant")
		return
	}
	if existing == nil {
		respondWithError(w, http.StatusNotFound, "restaurant not found")
		return
	}

	// Update the restaurant
	if err := h.store.Update(id, req.Description); err != nil {
		respondWithError(w, http.StatusInternalServerError, "failed to update restaurant")
		return
	}

	// Fetch updated restaurant
	updated, err := h.store.GetByID(id)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "failed to fetch updated restaurant")
		return
	}

	respondWithJSON(w, http.StatusOK, updated)
}

// DeleteRestaurant godoc
// @Summary      删除餐厅
// @Description  删除指定的餐厅记录
// @Tags         restaurants
// @Accept       json
// @Produce      json
// @Param        id   path      int  true  "餐厅ID"
// @Success      204
// @Failure      404  {object}  ErrorResponse
// @Router       /api/restaurants/{id} [delete]
func (h *Handler) DeleteRestaurant(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	idStr := vars["id"]

	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "invalid id format")
		return
	}

	if err := h.store.Delete(id); err != nil {
		if err == sql.ErrNoRows {
			respondWithError(w, http.StatusNotFound, "restaurant not found")
			return
		}
		respondWithError(w, http.StatusInternalServerError, "failed to delete restaurant")
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

// Helper functions

func respondWithError(w http.ResponseWriter, code int, message string) {
	respondWithJSON(w, code, ErrorResponse{Error: message})
}

func respondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(payload)
}
