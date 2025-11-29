import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import CategoryCard from "../components/CategoryCard.jsx"
import { getMenu } from "../api/menu.js"

function Menu({ settings }) {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadMenu()
  }, [])

  // Update CSS variables when settings change
  useEffect(() => {
    if (settings) {
      document.documentElement.style.setProperty('--primary-color', settings.primaryColor || '#3b82f6')
      document.documentElement.style.setProperty('--secondary-color', settings.secondaryColor || '#1e40af')
      document.documentElement.style.setProperty('--background-color', settings.backgroundColor || '#f8fafc')
    }
  }, [settings])

  const loadMenu = async () => {
    try {
      setError(null)
      const menuData = await getMenu()
      setCategories(menuData)
    } catch (error) {
      console.error("Error loading menu:", error)
      setError("فشل في تحميل القائمة. تأكد من تشغيل الخادم الخلفي.")
    } finally {
      setLoading(false)
    }
  }

  const getCustomStyles = () => ({
    header: {
      backgroundColor: settings?.primaryColor || '#3b82f6',
    },
    text: {
      color: settings?.secondaryColor || '#1e40af',
    },
    background: {
      backgroundColor: settings?.backgroundColor || '#f8fafc',
    }
  })

  const styles = getCustomStyles()

  // Function to get logo URL
  const getLogoUrl = (logoPath) => {
    if (!logoPath) return null
    if (logoPath.startsWith('http')) return logoPath
    if (logoPath.startsWith('/uploads/')) return `http://localhost:5000${logoPath}`
    return `http://localhost:5000/uploads/${logoPath}`
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={styles.background}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: styles.text.color }}></div>
          <p className="mt-4" style={{ color: styles.text.color }}>جاري تحميل القائمة...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={styles.background}>
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: styles.text.color }}>خطأ في الاتصال</h2>
          <p className="mb-4" style={{ color: styles.text.color }}>{error}</p>
          <button
            onClick={loadMenu}
            className="px-6 py-2 rounded-lg transition-colors"
            style={{ backgroundColor: styles.header.backgroundColor, color: 'white' }}
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    )
  }

  const logoUrl = settings?.logo ? getLogoUrl(settings.logo) : null

  return (
    <div className="min-h-screen" style={styles.background}>
      {/* Header - بدون لوجو */}
      <header className="shadow-sm border-b" style={styles.header}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-6">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-white text-shadow text-center"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
            >
              {settings?.siteName || "قائمة الطعام"}
            </motion.h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Logo Section - في نص الموقع */}
        {logoUrl && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-12"
          >
            <div className="text-center">
              <div className="bg-white rounded-3xl p-6 shadow-2xl border border-gray-200 inline-block transform hover:scale-105 transition-transform duration-300">
                <img 
                  src={logoUrl}
                  alt="Logo"
                  className="h-32 w-32 object-contain mx-auto"
                  onError={(e) => {
                    console.error('Failed to load logo:', logoUrl)
                    e.target.style.display = 'none'
                  }}
                  onLoad={() => console.log('Logo loaded successfully:', logoUrl)}
                />
              </div>
              <p className="text-gray-600 mt-4 text-lg font-medium" style={{ color: styles.text.color }}>
              </p>
            </div>
          </motion.div>
        )}

        {/* Welcome Message */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4" style={{ color: styles.text.color }}>
            مرحباً بكم في {settings?.siteName || "قائمة الطعام"}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed" style={{ color: styles.text.color }}>
            استمتع بأشهى المأكولات والمشروبات المختارة بعناية من أجلك
          </p>
        </motion.div>

        {/* Categories */}
        <div className="space-y-12">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (index * 0.1) }}
            >
              <CategoryCard category={category} primaryColor={settings?.primaryColor} />
            </motion.div>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-12">
            <p style={{ color: styles.text.color }}>لا توجد عناصر في القائمة حالياً</p>
          </div>
        )}

        {/* Footer Section */}
        {logoUrl && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-16 pt-8 border-t border-gray-200"
          >
            <div className="flex justify-center items-center space-x-4 space-x-reverse mb-4">
              <img 
                src={logoUrl}
                alt="Logo"
                className="h-16 w-16 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
              <div>
                <h3 className="text-xl font-bold" style={{ color: styles.text.color }}>
                  {settings?.siteName || "قائمة الطعام"}
                </h3>
                <p className="text-gray-600" style={{ color: styles.text.color }}>
                  نقدم لكم أفضل ما لدينا
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}

export default Menu
