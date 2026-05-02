package main

// Restaurant represents a restaurant entity in the system
type Restaurant struct {
	ID          int64  `json:"id" example:"1"`
	Name        string `json:"name" example:"麦当劳"`
	Description string `json:"description" example:"全球连锁快餐品牌"`
}

// CreateRestaurantRequest represents the request body for creating a restaurant
type CreateRestaurantRequest struct {
	Name        string `json:"name" example:"肯德基" validate:"required"`
	Description string `json:"description" example:"美式快餐连锁"`
}

// UpdateRestaurantRequest represents the request body for updating a restaurant
type UpdateRestaurantRequest struct {
	Description string `json:"description" example:"更新后的简介" validate:"required"`
}

// ErrorResponse represents an error response
type ErrorResponse struct {
	Error string `json:"error" example:"name is required"`
}

// SuccessResponse represents a generic success message
type SuccessResponse struct {
	Message string `json:"message" example:"operation successful"`
}
