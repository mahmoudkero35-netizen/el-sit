import { motion, AnimatePresence } from "framer-motion"
import AnimatedProductCard from "./AnimatedProductCard.jsx"

function CategoryCard({ category, primaryColor, searchTerm, index }) {
  const highlightText = (text, highlight) => {
    if (!highlight) return text
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'))
    return parts.map((part, index) => 
      part.toLowerCase() === highlight.toLowerCase() ? 
      <mark key={index} className="bg-yellow-400/50 px-1 rounded">{part}</mark> : 
      part
    )
  }

  return (
    <motion.section 
      className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 hover:border-white/40 transition-all duration-500 overflow-hidden group"
      whileHover={{ 
        y: -10,
        scale: 1.02,
        boxShadow: "0 25px 50px rgba(0,0,0,0.3)"
      }}
      layout
    >
      {/* Category Header */}
      <motion.div 
        className="p-8 border-b border-white/20"
        style={{ 
          background: `linear-gradient(135deg, ${primaryColor || '#3b82f6'}30, transparent)`
        }}
        whileHover={{ 
          background: `linear-gradient(135deg, ${primaryColor || '#3b82f6'}50, transparent)`
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <motion.h2 
              className="text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              {highlightText(category.name, searchTerm)}
            </motion.h2>
            {category.description && (
              <motion.p 
                className="text-gray-300 text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {category.description}
              </motion.p>
            )}
          </div>
          
          {/* Animated Products Count Badge */}
          <motion.div 
            className="flex items-center space-x-3 space-x-reverse bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/30"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: index * 0.1 + 0.4,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ 
              scale: 1.1,
              backgroundColor: "rgba(255,255,255,0.3)"
            }}
          >
            <motion.span 
              className="text-2xl font-bold text-white"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {category.products?.length || 0}
            </motion.span>
            <span className="text-gray-300 text-lg">منتج</span>
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
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 50 }}
                  transition={{ 
                    delay: (index * 0.1) + (productIndex * 0.1),
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  layout
                >
                  <AnimatedProductCard 
                    product={product} 
                    primaryColor={primaryColor}
                    searchTerm={searchTerm}
                    index={productIndex}
                  />
                </motion.div>
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
                😔
              </motion.div>
              <p className="text-gray-400 text-xl">لا توجد منتجات في هذه الفئة</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  )
}

export default CategoryCard
