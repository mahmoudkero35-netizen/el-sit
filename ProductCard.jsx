import { useState } from "react"
import { motion } from "framer-motion"
import ProductImages from "./ProductImages.jsx"

function ProductCard({ product, primaryColor }) {
  const [showImageModal, setShowImageModal] = useState(false)

  return (
    <>
      <div className="bg-gray-50 rounded-xl p-4 border hover:shadow-md transition-shadow">
        {/* Product Images */}
        {product.images && product.images.length > 0 && (
          <div className="mb-4">
            <ProductImages 
              images={product.images} 
              onImageClick={() => setShowImageModal(true)}
            />
          </div>
        )}

        {/* Product Info */}
        <div className="space-y-2">
          <h3 className="font-bold text-lg text-gray-900">{product.name}</h3>
          
          {product.description && (
            <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
          )}
          
          <div className="flex justify-between items-center pt-2">
            <span 
              className="font-bold text-lg"
              style={{ color: primaryColor || '#059669' }}
            >
              {product.price ? `$${product.price}` : 'السعر غير متوفر'}
            </span>
            
            {product.is_available === false && (
              <span className="text-red-500 text-sm font-medium">غير متوفر</span>
            )}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div className="max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <ProductImages 
              images={product.images} 
              showLarge={true}
            />
          </div>
        </motion.div>
      )}
    </>
  )
}

export default ProductCard
