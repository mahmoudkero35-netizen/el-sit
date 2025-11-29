import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

function ProductImages({ images, showLarge = false, onImageClick }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  // Function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null
    if (imagePath.startsWith('http')) return imagePath
    if (imagePath.startsWith('/uploads/')) return `http://localhost:5000${imagePath}`
    return `http://localhost:5000/uploads/${imagePath}`
  }

  if (!images || images.length === 0) {
    return (
      <div className={`${showLarge ? 'w-full h-96' : 'h-48'} bg-gray-200 rounded-lg flex items-center justify-center`}>
        <span className="text-gray-500">لا توجد صورة</span>
      </div>
    )
  }

  if (images.length === 1) {
    const imageUrl = getImageUrl(images[0])
    return (
      <div 
        className={`${showLarge ? 'w-full h-96' : 'h-48'} bg-gray-200 rounded-lg overflow-hidden cursor-pointer`}
        onClick={onImageClick}
      >
        <img 
          src={imageUrl}
          alt="Product"
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error('Failed to load product image:', imageUrl)
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzljYTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPsOXILC8P7A8L3RleHQ+PC9zdmc+'
          }}
          onLoad={() => console.log('Product image loaded successfully:', imageUrl)}
        />
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Main Image */}
      <div 
        className={`${showLarge ? 'w-full h-96' : 'h-48'} bg-gray-200 rounded-lg overflow-hidden cursor-pointer relative`}
        onClick={onImageClick}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={getImageUrl(images[currentIndex])}
            alt={`Product ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onError={(e) => {
              console.error('Failed to load product image:', getImageUrl(images[currentIndex]))
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzljYTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPsOXILC8P7A8L3RleHQ+PC9zdmc+'
            }}
            onLoad={() => console.log('Product image loaded successfully:', getImageUrl(images[currentIndex]))}
          />
        </AnimatePresence>

        {/* Navigation Arrows */}
        {showLarge && images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage() }}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2 hover:bg-opacity-100 transition-all"
            >
              ‹
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage() }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2 hover:bg-opacity-100 transition-all"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {!showLarge && images.length > 1 && (
        <div className="flex gap-2 mt-2 overflow-x-auto slider-container">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-12 h-12 rounded border-2 ${
                index === currentIndex ? 'border-blue-500' : 'border-gray-300'
              } overflow-hidden`}
            >
              <img 
                src={getImageUrl(image)}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error('Failed to load thumbnail:', getImageUrl(image))
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzljYTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPsOXILC8P7A8L3RleHQ+PC9zdmc+'
                }}
                onLoad={() => console.log('Thumbnail loaded successfully:', getImageUrl(image))}
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  )
}

export default ProductImages
