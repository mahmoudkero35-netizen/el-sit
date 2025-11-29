import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

export const getSiteSettings = async () => {
  try {
    const response = await api.get('/settings')
    return response.data
  } catch (error) {
    console.error('Error fetching site settings:', error)
    // Return default settings if API fails
    return {
      siteName: "قائمة الطعام",
      logo: null,
      primaryColor: "#3b82f6",
      secondaryColor: "#1e40af",
      backgroundColor: "#f8fafc"
    }
  }
}

export default api
