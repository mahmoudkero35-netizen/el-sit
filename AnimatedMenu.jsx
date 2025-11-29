import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { getMenu } from "../api/menu.js"

// Floating Particles Background
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}

// Animated Product Card
const ProductCard = ({ product, index }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden group cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <img 
            src={`http://localhost:5000/uploads/${product.images[0].image_path}`}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-400 text-4xl">🍽️</span>
          </div>
        )}
        
        {/* Hover Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              className="absolute inset-0 bg-black/40 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium"
              >
                عرض التفاصيل
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Availability Badge */}
        <motion.div 
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-medium ${
            product.is_available 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
        >
          {product.is_available ? 'متوفر' : 'غير متوفر'}
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <motion.h3 
          className="font-bold text-lg text-gray-900 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.2 }}
        >
          {product.name}
        </motion.h3>
        
        {product.description && (
          <motion.p 
            className="text-gray-600 text-sm mb-3 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            {product.description}
          </motion.p>
        )}
        
        <motion.div 
          className="flex justify-between items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.4 }}
        >
          <motion.span 
            className="font-bold text-xl text-blue-600"
            whileHover={{ scale: 1.05 }}
          >
            {product.price} ر.س
          </motion.span>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              product.is_available
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!product.is_available}
          >
            {product.is_available ? 'إضافة إلى الطلب' : 'غير متوفر'}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Category Section
const CategorySection = ({ category, index }) => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, type: "spring", stiffness: 50 }}
      className="mb-12"
    >
      <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Category Header */}
        <motion.div 
          className="p-8 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50"
          whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <motion.h2 
                className="text-4xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 + 0.1 }}
              >
                {category.name}
              </motion.h2>
              {category.description && (
                <motion.p 
                  className="text-gray-600 text-lg leading-relaxed max-w-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.2 }}
                >
                  {category.description}
                </motion.p>
              )}
            </div>
            
            {/* Products Count */}
            <motion.div 
              className="flex items-center space-x-3 space-x-reverse bg-white rounded-2xl px-6 py-3 shadow-lg border border-gray-200"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.2 + 0.3, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.span 
                className="text-2xl font-bold text-gray-900"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {category.products?.length || 0}
              </motion.span>
              <span className="text-gray-600 text-lg">منتج</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="p-8">
          <AnimatePresence>
            {category.products && category.products.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                layout
              >
                {category.products.map((product, productIndex) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    index={productIndex}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl mb-4"
                >
                  🍽️
                </motion.div>
                <p className="text-gray-500 text-xl">لا توجد منتجات في هذه الفئة</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  )
}

function AnimatedMenu({ settings }) {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    loadMenu()
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const loadMenu = async () => {
    try {
      setError(null)
      const menuData = await getMenu()
      setCategories(menuData)
    } catch (error) {
      console.error("Error loading menu:", error)
      setError("تعذر تحميل القائمة. تأكد من تشغيل الخادم الخلفي على المنفذ 5000.")
    } finally {
      setLoading(false)
    }
  }

  const getLogoUrl = (logoPath) => {
    if (!logoPath) return null
    if (logoPath.startsWith('http')) return logoPath
    if (logoPath.startsWith('/uploads/')) return `http://localhost:5000${logoPath}`
    return `http://localhost:5000/uploads/${logoPath}`
  }

  const filteredCategories = categories
    .map(category => ({
      ...category,
      products: category.products?.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory ? category.id === selectedCategory : true)
      )
    }))
    .filter(category => category.products?.length > 0)

  const allCategories = [{ id: null, name: "الكل", icon: "📁" }, ...categories]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-600 text-lg"
          >
            جاري تحميل القائمة السحرية...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <motion.div
            animate={{ bounce: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="text-6xl mb-4"
          >
            ⚡
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">خطأ في الاتصال</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={loadMenu}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all"
          >
            إعادة المحاولة
          </motion.button>
        </motion.div>
      </div>
    )
  }

  const logoUrl = settings?.logo ? getLogoUrl(settings.logo) : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 overflow-hidden">
      <FloatingParticles />
      
      {/* Modern Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-2xl' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              className="flex items-center space-x-4 space-x-reverse"
              whileHover={{ scale: 1.05 }}
            >
              {logoUrl && (
                <motion.div 
                  className="flex items-center justify-center bg-white rounded-3xl p-3 shadow-2xl"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <img 
                    src={logoUrl}
                    alt="Logo"
                    className="h-12 w-12 object-contain"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                </motion.div>
              )}
              <motion.h1 
                className={`text-3xl font-bold transition-colors ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}
                style={{ textShadow: isScrolled ? 'none' : '2px 2px 20px rgba(0,0,0,0.5)' }}
              >
                {settings?.siteName || "مطعمنا الرائع"}
              </motion.h1>
            </motion.div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
              {['القائمة', 'عن المطعم', 'اتصل بنا'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item}`}
                  className={`font-medium transition-colors ${
                    isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated Background Elements */}
        <motion.div 
          className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full backdrop-blur-sm"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div 
          className="text-center text-white z-10 max-w-4xl mx-auto px-4"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h2 
            className="text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            {settings?.siteName || "مطعمنا الرائع"}
          </motion.h2>
          
          <motion.p 
            className="text-2xl opacity-95 mb-8 leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            استمتع برحلة طعام سحرية مع أشهى المأكولات والمشروبات
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(255,255,255,0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all"
            >
              استعرض القائمة
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all"
            >
              تعرف علينا
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-center">
            <div className="text-sm mb-2 opacity-80">مرر للأسفل</div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ↓
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mb-12"
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/20">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Search Input */}
              <div className="flex-1 w-full">
                <motion.div className="relative">
                  <input
                    type="text"
                    placeholder="🔍 ابحث عن طبق، مشروب، أو وجبة..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-2xl px-6 py-4 pl-14 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500 shadow-lg"
                  />
                  <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Category Filter */}
              <div className="flex gap-3 overflow-x-auto pb-2 lg:pb-0">
                <AnimatePresence>
                  {allCategories.map((category, index) => (
                    <motion.button
                      key={category.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ 
                        scale: 1.1,
                        y: -2
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-6 py-3 rounded-xl whitespace-nowrap transition-all backdrop-blur-sm border ${
                        selectedCategory === category.id
                          ? 'bg-blue-600 text-white border-blue-600 shadow-2xl'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500 hover:text-blue-600'
                      }`}
                    >
                      {category.icon && <span className="ml-2">{category.icon}</span>}
                      {category.name}
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Categories Grid */}
        <AnimatePresence>
          {filteredCategories.length > 0 ? (
            <div className="space-y-8">
              {filteredCategories.map((category, index) => (
                <CategorySection 
                  key={category.id} 
                  category={category} 
                  index={index}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-8xl mb-6"
              >
                🍽️
              </motion.div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">لا توجد نتائج سحرية</h3>
              <p className="text-gray-600 text-lg">
                {searchTerm || selectedCategory 
                  ? "جرب البحث بكلمات أخرى أو اختر فئة مختلفة" 
                  : "سيتم إضافة المنتجات قريباً"
                }
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-gray-900 to-black text-white mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Brand */}
            <div className="text-center md:text-right">
              {logoUrl && (
                <motion.img 
                  src={logoUrl}
                  alt="Logo"
                  className="h-20 w-20 object-contain mx-auto md:mx-0 md:ml-auto mb-6 bg-white/10 rounded-3xl p-4 backdrop-blur-sm"
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.1
                  }}
                  transition={{ duration: 0.5 }}
                />
              )}
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {settings?.siteName || "مطعمنا الرائع"}
              </h3>
              <p className="text-gray-400 text-lg">نقدم لكم تجربة طعام سحرية لا تُنسى</p>
            </div>

            {/* Contact Info */}
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-6">معلومات الاتصال</h4>
              <div className="space-y-3 text-gray-400">
                <motion.p whileHover={{ x: 5 }} className="flex items-center justify-center gap-2">
                  <span className="text-2xl">📞</span> +966 123 456 789
                </motion.p>
                <motion.p whileHover={{ x: 5 }} className="flex items-center justify-center gap-2">
                  <span className="text-2xl">📧</span> info@restaurant.com
                </motion.p>
                <motion.p whileHover={{ x: 5 }} className="flex items-center justify-center gap-2">
                  <span className="text-2xl">📍</span> الرياض، السعودية
                </motion.p>
              </div>
            </div>

            {/* Hours */}
            <div className="text-center md:text-left">
              <h4 className="text-xl font-semibold mb-6">أوقات العمل</h4>
              <div className="space-y-3 text-gray-400">
                <motion.p whileHover={{ x: -5 }}>الأحد - الخميس: ٨ ص - ١٢ م</motion.p>
                <motion.p whileHover={{ x: -5 }}>الجمعة - السبت: ٤ م - ١٢ م</motion.p>
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <motion.div 
            className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              © 2024 {settings?.siteName || "مطعمنا الرائع"}. جميع الحقوق محفوظة.
            </motion.p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  )
}

export default AnimatedMenu
