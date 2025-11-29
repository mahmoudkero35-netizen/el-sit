import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

// Create axios instance with better error handling
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

// Add request interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export const getMenu = async () => {
  try {
    const response = await api.get('/menu')
    console.log('Menu data loaded successfully:', response.data.length, 'categories')
    return response.data
  } catch (error) {
    console.error('Error fetching menu:', error)
    // Return sample data for demo if API is down
    return [
      {
        id: 1,
        name: "المقبلات",
        description: "مقبلات لذيذة لبدء وجبتك",
        products: [
          {
            id: 1,
            name: "سلطة يونانية",
            description: "سلطة طازجة مع الخضار والزيتون والجبنة البيضاء",
            price: 25,
            is_available: true,
            images: []
          },
          {
            id: 2,
            name: "حمص بالطحينة",
            description: "حمص طازج مع الطحينة وزيت الزيتون",
            price: 18,
            is_available: true,
            images: []
          }
        ]
      },
      {
        id: 2,
        name: "الوجبات الرئيسية",
        description: "وجبات رئيسية شهية ومشبعة",
        products: [
          {
            id: 3,
            name: "شاورما لحم",
            description: "شاورما لحم مشوية مع الخضار والصلصات",
            price: 35,
            is_available: true,
            images: []
          },
          {
            id: 4,
            name: "كبة مقلية",
            description: "كبة مقلية مقرمشة مع اللحم والتوابل",
            price: 28,
            is_available: true,
            images: []
          }
        ]
      }
    ]
  }
}

export const getSettings = async () => {
  try {
    const response = await api.get('/settings')
    return response.data
  } catch (error) {
    console.error('Error fetching settings:', error)
    return {
      siteName: "مطعمنا الرائع",
      logo: null,
      primaryColor: "#3b82f6",
      secondaryColor: "#1e40af",
      backgroundColor: "#f8fafc"
    }
  }
}
