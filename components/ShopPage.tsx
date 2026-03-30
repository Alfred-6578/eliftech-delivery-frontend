'use client'

import { useState, useEffect } from 'react'
import { Shop, Product } from '@/types'
import { getShops, getProductsByShop } from '@/lib/api'
import ShopSidebar from './ShopSidebar'
import ProductGrid from './ProductGrid'
import { ShopPageSkeleton } from './Skeleton'

export default function ShopPage() {
  const [shops, setShops] = useState<Shop[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null)
  const [ratingFilter, setRatingFilter] = useState({ min: 0, max: 5 })
  const [loading, setLoading] = useState(true)
  const [productsLoading, setProductsLoading] = useState(false)

  useEffect(() => {
    getShops().then((data) => {
      setShops(data)
      if (data.length > 0) {
        setSelectedShop(data[0])
      }
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (!selectedShop) return
    setProductsLoading(true)
    getProductsByShop(selectedShop._id).then((data) => {
      setProducts(data)
      setProductsLoading(false)
    })
  }, [selectedShop])

  const handleSelectShop = (shop: Shop) => {
    setSelectedShop(shop)
  }

  if (loading) {
    return <ShopPageSkeleton />
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
      <ShopSidebar
        shops={shops}
        selectedShopId={selectedShop?._id ?? null}
        onSelectShop={handleSelectShop}
        ratingFilter={ratingFilter}
        onRatingFilter={setRatingFilter}
      />
      <ProductGrid
        products={products}
        shop={selectedShop}
        loading={productsLoading}
      />
    </div>
  )
}
