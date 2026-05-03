// API configuration for restaurant backend service
const API_BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:8080'

export const RESTAURANTS_ENDPOINT = '/api/restaurants'

export const API_URLS = {
  restaurants: `${API_BASE_URL}${RESTAURANTS_ENDPOINT}`,
}

export default API_BASE_URL
