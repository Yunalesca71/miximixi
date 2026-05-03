## Why

Currently, the restaurant selector frontend uses hardcoded restaurant data embedded in the React components. This makes it difficult to:
- Update restaurant information without redeploying the frontend
- Add or remove restaurants dynamically
- Share restaurant data across different parts of the application

The backend API has been built with full CRUD operations for restaurant management. This change connects the frontend to the backend API, enabling dynamic restaurant data management.

## What Changes

- Replace hardcoded restaurant list in the frontend with dynamic data fetched from the backend API
- Add API client layer to communicate with the restaurant backend service
- Implement loading states while fetching data
- Add error handling for API failures
- Update the RestaurantSelector component to use API data instead of static data

## Capabilities

### New Capabilities
- `api-client`: HTTP client module for communicating with the restaurant backend API
- `restaurant-data-fetching`: Dynamic fetching and caching of restaurant list from backend

### Modified Capabilities
- `restaurant-display`: Modify to display data from API instead of hardcoded list

## Impact

**Affected Code:**
- `miximixi/src/components/RestaurantSelector.jsx` - Update to use API data
- `miximixi/src/App.jsx` - May need to pass API client or handle data fetching

**APIs:**
- `GET http://localhost:8080/api/restaurants` - New dependency on backend service

**Dependencies:**
- Backend service must be running on port 8080
- Frontend requires CORS support (already configured in backend)
