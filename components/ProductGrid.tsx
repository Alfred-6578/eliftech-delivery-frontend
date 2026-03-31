'use client'

import { useState, useEffect, useMemo } from 'react'
import { Product, Shop } from '@/types'
import ProductCard from './ProductCard'
import CategoryFilter from './CategoryFilter'
import { ProductCardSkeleton } from './Skeleton'

const PRODUCTS_PER_PAGE = 6

function getPageNumbers(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages: (number | '...')[] = [1]
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  if (start > 2) pages.push('...')
  for (let i = start; i <= end; i++) pages.push(i)
  if (end < total - 1) pages.push('...')
  pages.push(total)
  return pages
}

interface ProductGridProps {
  products: Product[]
  shop: Shop | null
  loading?: boolean
}

export default function ProductGrid({ products, shop, loading }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    setSelectedCategory('All')
    setPage(1)
  }, [shop])

  useEffect(() => {
    setPage(1)
  }, [selectedCategory, sortBy])

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category)))
    return ['All', ...cats]
  }, [products])

  const filtered = useMemo(() => {
    let list = products
    if (selectedCategory !== 'All') {
      list = list.filter((p) => p.category === selectedCategory)
    }
    if (sortBy === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sortBy === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [products, selectedCategory, sortBy])

  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE)

  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{shop?.name ?? 'Select a shop'}</h1>
          {shop && (
            <p className="text-gray-400 text-sm mt-1">
              {filtered.length} items available
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
          {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && shop && (
        <p className="text-gray-400 text-center py-16">No products found.</p>
      )}

      {!loading && !shop && (
        <p className="text-gray-400 text-center py-16">
          Choose a shop from the sidebar to see products.
        </p>
      )}

      {!loading && paginated.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {paginated.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-orange hover:text-orange transition-colors disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-600"
              >
                Previous
              </button>
              {getPageNumbers(page, totalPages).map((p, i) =>
                p === '...' ? (
                  <span key={`dot-${i}`} className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">...</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p as number)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                      page === p
                        ? 'bg-orange text-white'
                        : 'border border-gray-200 text-gray-600 hover:border-orange hover:text-orange'
                    }`}
                  >
                    {p}
                  </button>
                )
              )}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-orange hover:text-orange transition-colors disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-600"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
