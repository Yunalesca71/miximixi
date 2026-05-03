import { useState, useEffect, useCallback } from 'react'
import { API_URLS } from '../config/api'

export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchRestaurants = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(API_URLS.restaurants)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      // Transform backend data to frontend format
      // Backend: { id, name, description }
      // Frontend: { id, name, description, type }
      const transformedData = data.map(restaurant => ({
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description || '',
        type: 'chinese' // Default type, backend can extend later
      }))

      setRestaurants(transformedData)
    } catch (err) {
      console.error('Failed to fetch restaurants:', err)
      setError(err.message || '无法加载餐厅数据，请检查后端服务是否运行')
      setRestaurants([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRestaurants()
  }, [fetchRestaurants])

  const refetch = useCallback(() => {
    fetchRestaurants()
  }, [fetchRestaurants])

  return { restaurants, loading, error, refetch }
}

export default useRestaurants
