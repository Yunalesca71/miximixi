## Why

The MixiMixi application currently uses a static restaurant list on the frontend. To enable dynamic restaurant management, user customization, and data persistence, we need a dedicated backend service. This service will provide CRUD operations for restaurant data with a lightweight, efficient architecture suitable for a personal/demo project.

## What Changes

Create a complete Go-based REST API backend service with:
- SQLite database with restaurant table (id, name, description)
- RESTful endpoints for CRUD operations
- Comprehensive tests using Go's standard testing framework
- Interactive API documentation (Swagger/OpenAPI)
- Deployment script for easy setup

## Capabilities

### New Capabilities
- `restaurant-crud`: Full CRUD operations for restaurant management via REST API
- `api-documentation`: Interactive Swagger UI documentation for all endpoints
- `automated-testing`: Unit and integration tests with coverage reporting
- `deployment-automation`: Shell script for automated deployment

### Modified Capabilities
- None (new backend service)

## Impact

- **New Components**: Go service, SQLite database, API documentation UI
- **Integration Point**: Frontend RestaurantSelector will call this API
- **Deployment**: New service requires separate deployment process
- **Dependencies**: Go 1.21+, SQLite3
