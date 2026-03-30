'use client'

import { useState, useEffect, useMemo } from 'react'
import { Product, Shop } from '@/types'
import ProductCard from './ProductCard'
import CategoryFilter from './CategoryFilter'
import { ProductCardSkeleton } from './Skeleton'

interface ProductGridProps {
  products: Product[]
  shop: Shop | null
  loading?: boolean
}

export default function ProductGrid({ products, shop, loading }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('')

  useEffect(() => {
    setSelectedCategory('All')
  }, [shop])

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.name.split(' ')[0])))
    return ['All', ...cats.slice(0, 4)]
  }, [products])

  const filtered = useMemo(() => {
    let list = products
    if (selectedCategory !== 'All') {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(selectedCategory.toLowerCase())
      )
    }
    if (sortBy === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sortBy === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [products, selectedCategory, sortBy])

  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{shop?.name ?? 'Select a shop'}</h1>
          {shop && (
            <p className="text-gray-400 text-sm mt-1">
              {products.length} items available
            </p>
          )}
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 bg-white"
        >
          <option value="">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name">Name</option>
        </select>
      </div>

      {shop && (
        <div className="mb-6">
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>
      )}

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!loading && products.length === 0 && shop && (
        <p className="text-gray-400 text-center py-16">No products found.</p>
      )}

      {!loading && !shop && (
        <p className="text-gray-400 text-center py-16">
          Choose a shop from the sidebar to see products.
        </p>
      )}

      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {filtered.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
