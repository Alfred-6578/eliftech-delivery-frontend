'use client'

import { useState } from 'react'
import { Product } from '@/types'
import { useCartStore } from '@/store/cartStore'

interface ProductModalProps {
  product: Product
  onClose: () => void
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const addItem = useCartStore((s) => s.addItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const cartItem = useCartStore((s) => s.items.find((i) => i._id === product._id))
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md mx-4 overflow-hidden shadow-xl animate-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-gradient-to-b from-peach-light to-peach h-64">
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
            <div className="w-full h-full flex items-center justify-center text-6xl">
              🍽️
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-gray-600 hover:bg-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <span className="text-xs text-orange font-medium bg-orange-light px-2.5 py-1 rounded-full">
            {product.category}
          </span>
          <h2 className="text-xl font-bold mt-3">{product.name}</h2>
          <p className="text-orange font-bold text-2xl mt-2">
            ${product.price.toLocaleString()}
          </p>

          <div className="mt-6">
            {cartItem ? (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">In cart</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(product._id, cartItem.quantity - 1)}
                    className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:border-orange hover:text-orange transition-colors"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-semibold">{cartItem.quantity}</span>
                  <button
                    onClick={() => updateQuantity(product._id, cartItem.quantity + 1)}
                    className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:border-orange hover:text-orange transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => addItem(product)}
                className="w-full py-3 bg-orange text-white rounded-xl font-semibold hover:bg-orange-dark transition-colors"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
