'use client'

import { useState } from 'react'
import { Product } from '@/types'
import { useCartStore } from '@/store/cartStore'
import ProductModal from './ProductModal'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const cartItem = useCartStore((s) => s.items.find((i) => i._id === product._id))
  const [loaded, setLoaded] = useState(false)
  const [showModal, setShowModal] = useState(false)

  return (
    <>
    <div
      className="rounded-2xl border border-gray-100 overflow-hidden bg-white hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => setShowModal(true)}
    >
      <div className="relative bg-gradient-to-b from-peach-light to-peach h-48">
        {product.image ? (
          <>
            {!loaded && (
              <div className="absolute inset-0 bg-gray-100 animate-pulse" />
            )}
            <img
              src={product.image}
              alt={product.name}
              onLoad={() => setLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            🍽️
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-base">{product.name}</h3>
        <p className="text-xs text-gray-400 mt-0.5">{product.category}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-orange font-bold text-lg">
            ${product.price.toLocaleString()}
          </span>
          {cartItem ? (
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); updateQuantity(product._id, cartItem.quantity - 1) }}
                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-orange hover:text-orange transition-colors"
              >
                −
              </button>
              <span className="w-6 text-center text-sm font-medium">{cartItem.quantity}</span>
              <button
                onClick={(e) => { e.stopPropagation(); updateQuantity(product._id, cartItem.quantity + 1) }}
                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-orange hover:text-orange transition-colors"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={(e) => { e.stopPropagation(); addItem(product) }}
              className="px-4 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-orange hover:text-orange transition-colors"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
    {showModal && (
      <ProductModal product={product} onClose={() => setShowModal(false)} />
    )}
    </>
  )
}
