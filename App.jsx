import { useState, useEffect } from 'react'
import './style.css'

function App() {
  const [menu, setMenu] = useState([])
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [menuResponse, settingsResponse] = await Promise.all([
        fetch('http://localhost:5000/api/menu'),
        fetch('http://localhost:5000/api/settings')
      ])
      
      if (!menuResponse.ok || !settingsResponse.ok) {
        throw new Error('فشل في تحميل البيانات')
      }
      
      const menuData = await menuResponse.json()
      const settingsData = await settingsResponse.json()
      
      setMenu(menuData)
      setSettings(settingsData)
      
      // تحديد أول فئة نشطة
      if (menuData.length > 0) {
        setActiveCategory(menuData[0].id)
      }
    } catch (error) {
      console.error('Error loading data:', error)
      // بيانات افتراضية في حالة الخطأ
      setSettings({
        siteName: "مطعمنا الرائع",
        description: "تجربة طعام استثنائية تنتظرك",
        primaryColor: "#3b82f6"
      })
    } finally {
      setLoading(false)
    }
  }

  // دالة لمعالجة أخطاء تحميل الصور
  const handleImageError = (e) => {
    e.target.style.display = 'none'
    const parent = e.target.parentElement
    if (parent && !parent.querySelector('.image-fallback')) {
      const fallback = document.createElement('div')
      fallback.className = 'image-fallback'
      fallback.innerHTML = '🍕'
      parent.appendChild(fallback)
    }
  }

  // فتح الصورة بحجم كامل
  const openImageModal = (imageUrl, productIndex, categoryProducts) => {
    const productsWithImages = categoryProducts.filter(p => p.image_url)
    const actualIndex = productsWithImages.findIndex(p => p.image_url === imageUrl)
    setSelectedImage(imageUrl)
    setCurrentImageIndex(actualIndex)
  }

  // إغلاق نافذة الصورة
  const closeImageModal = () => {
    setSelectedImage(null)
    setCurrentImageIndex(0)
  }

  // التنقل بين الصور
  const navigateImages = (direction, categoryProducts) => {
    const productsWithImages = categoryProducts.filter(p => p.image_url)
    let newIndex = currentImageIndex
    
    if (direction === 'next') {
      newIndex = (currentImageIndex + 1) % productsWithImages.length
    } else {
      newIndex = (currentImageIndex - 1 + productsWithImages.length) % productsWithImages.length
    }
    
    setCurrentImageIndex(newIndex)
    setSelectedImage(productsWithImages[newIndex].image_url)
  }

  // الحصول على جميع المنتجات مع الصور في الفئة النشطة
  const getProductsWithImages = () => {
    const currentCategoryObj = menu.find(cat => cat.id === activeCategory)
    return currentCategoryObj?.products?.filter(p => p.image_url) || []
  }

  if (loading) {
    return (
      <div className="loading-container">
        {/* 🔥 خلفية متحركة للشاشة */}
        <div className="animated-bg">
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
        </div>
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p className="loading-text">جاري تحميل القائمة...</p>
        </div>
      </div>
    )
  }

  const currentCategory = menu.find(cat => cat.id === activeCategory)
  const products = currentCategory?.products || []
  const productsWithImages = getProductsWithImages()

  return (
    <div className="app">
      {/* 🔥 خلفية متحركة للصفحة */}
      <div className="animated-bg">
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
      </div>

      {/* الهيدر البطولي */}
      <header className="hero-header">
        <div className="container">
          <div className="hero-content">
            {settings.logo_url && (
              <img 
                src={`http://localhost:5000${settings.logo_url}`} 
                alt={settings.siteName} 
                className="logo"
                onError={handleImageError}
              />
            )}
            <h1 className="site-title">
              {settings.siteName || 'مطعمنا الرائع'}
            </h1>
            <p className="site-description">
              {settings.description || 'تجربة طعام استثنائية تنتظرك'}
            </p>
            
            {/* معلومات الاتصال */}
            <div className="contact-info">
              {settings.phone && (
                <div className="contact-item">
                  <span>📞</span>
                  <span>{settings.phone}</span>
                </div>
              )}
              {settings.workingHours && (
                <div className="contact-item">
                  <span>🕒</span>
                  <span>{settings.workingHours}</span>
                </div>
              )}
              {settings.address && (
                <div className="contact-item">
                  <span>📍</span>
                  <span>{settings.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <main>
        {/* 🔥 شبكة البطاقات المربعة للفئات */}
        <section className="categories-section">
          <div className="container">
            <h2 className="categories-title">تصفح أصنافنا</h2>
            <div className="categories-grid">
              {menu.map((category, index) => (
                <div
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`category-card fade-in-up ${activeCategory === category.id ? 'active' : ''}`}
                  style={{
                    borderColor: activeCategory === category.id ? category.color : 'transparent',
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <span 
                    className="category-icon"
                    style={{ color: category.color || settings.primaryColor }}
                  >
                    {category.icon}
                  </span>
                  <h3 className="category-name">{category.name}</h3>
                  <p className="category-description">
                    {category.description || 'استمتع بأشهى الأطباق'}
                  </p>
                  <span className="category-count">
                    {category.products?.length || 0} منتج
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* المنتجات */}
        <section className="products-section">
          <div className="container">
            {currentCategory && (
              <h2 className="products-title">
                {currentCategory.name} - {products.length} منتج
              </h2>
            )}
            
            {products.length > 0 ? (
              <div className="products-grid">
                {products.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="product-card"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* 🔥 صورة المنتج قابلة للنقر */}
                    <div 
                      className="product-image-container"
                      onClick={() => product.image_url && openImageModal(product.image_url, index, products)}
                    >
                      {product.image_url ? (
                        <img 
                          src={`http://localhost:5000${product.image_url}`} 
                          alt={product.name}
                          className="product-image"
                          onError={handleImageError}
                        />
                      ) : (
                        <div className="image-fallback">🍕</div>
                      )}
                    </div>
                    
                    {/* معلومات المنتج */}
                    <div className="product-info">
                      <div className="product-header">
                        <h3 className="product-name">{product.name}</h3>
                        <span className="product-price">
                          {product.price} ر.س
                        </span>
                      </div>
                      
                      <p className="product-description">
                        {product.description}
                      </p>
                      
                      {/* حالة التوفر */}
                      <div className={`product-status ${
                        product.is_available ? 'status-available' : 'status-unavailable'
                      }`}>
                        {product.is_available ? '🟢 متوفر' : '🔴 غير متوفر'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">🍽️</div>
                <h3 className="empty-title">لا توجد منتجات في هذه الفئة</h3>
                <p className="empty-description">نعمل على إضافة منتجات جديدة قريباً</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* 🔥 نافذة عرض الصورة بحجم كامل */}
      {selectedImage && (
        <div className="image-modal" onClick={closeImageModal}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={`http://localhost:5000${selectedImage}`} 
              alt="صورة المنتج" 
              className="modal-image"
            />
            
            {/* زر الإغلاق */}
            <button className="modal-close" onClick={closeImageModal}>
              ✕
            </button>
            
            {/* أزرار التنقل إذا كان هناك أكثر من صورة */}
            {productsWithImages.length > 1 && (
              <>
                <button 
                  className="modal-nav modal-prev"
                  onClick={() => navigateImages('prev', products)}
                >
                  ‹
                </button>
                <button 
                  className="modal-nav modal-next"
                  onClick={() => navigateImages('next', products)}
                >
                  ›
                </button>
                <div className="modal-counter">
                  {currentImageIndex + 1} / {productsWithImages.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* الفوتر */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <h2 className="footer-title">
              {settings.siteName || 'مطعمنا الرائع'}
            </h2>
            
            <div className="social-links">
              {settings.facebook && (
                <a 
                  href={settings.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link"
                >
                  فيسبوك
                </a>
              )}
              {settings.instagram && (
                <a 
                  href={settings.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link"
                >
                  إنستغرام
                </a>
              )}
              {settings.twitter && (
                <a 
                  href={settings.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link"
                >
                  تويتر
                </a>
              )}
            </div>
            
            <p className="copyright">
              © {new Date().getFullYear()} {settings.siteName || 'مطعمنا الرائع'}. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
