import { motion } from "framer-motion"
import ProductCard from "./ProductCard.jsx"

function CategoryCard({ category, primaryColor }) {
  return (
    <section className="bg-white rounded-2xl shadow-sm border p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h2>
        {category.description && (
          <p className="text-gray-600">{category.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.products?.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard product={product} primaryColor={primaryColor} />
          </motion.div>
        ))}
      </div>

      {(!category.products || category.products.length === 0) && (
        <p className="text-gray-500 text-center py-4">لا توجد منتجات في هذه الفئة</p>
      )}
    </section>
  )
}

export default CategoryCard
