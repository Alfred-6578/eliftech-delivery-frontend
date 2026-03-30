'use client'

import { Product } from '@/types'
import { useCartStore } from '@/store/cartStore'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const cartItem = useCartStore((s) => s.items.find((i) => i._id === product._id))

  return (
    <div className="rounded-2xl border border-gray-100 overflow-hidden bg-white hover:shadow-md transition-shadow">
      <div className="relative bg-gradient-to-b from-peach-light to-peach h-48 flex items-center justify-center">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-32 w-32 object-contain"
          />
        ) : (
          <div className="h-32 w-32 rounded-full bg-peach flex items-center justify-center text-4xl">
            🍽️
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-base">{product.name}</h3>
        <div className="flex items-center justify-between mt-3">
          <span className="text-orange font-bold text-lg">
            ${product.price.toLocaleString()}
          </span>
          {cartItem ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(product._id, cartItem.quantity - 1)}
                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-orange hover:text-orange transition-colors"
              >
                −
              </button>
              <span className="w-6 text-center text-sm font-medium">{cartItem.quantity}</span>
              <button
                onClick={() => updateQuantity(product._id, cartItem.quantity + 1)}
                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-orange hover:text-orange transition-colors"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => addItem(product)}
              className="px-4 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-orange hover:text-orange transition-colors"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
