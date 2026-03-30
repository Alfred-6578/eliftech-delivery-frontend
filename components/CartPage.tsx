'use client'

import { useCartStore } from '@/store/cartStore'
import CartItem from './CartItem'
import CheckoutForm from './CheckoutForm'
import Link from 'next/link'

export default function CartPage() {
  const items = useCartStore((s) => s.items)
  const clearCart = useCartStore((s) => s.clearCart)

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-gray-400 mb-6">Add some items from a shop to get started.</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-orange text-white rounded-xl font-medium hover:bg-orange-dark transition-colors"
        >
          Browse Shops
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Your Cart</h1>
          <p className="text-gray-400 text-sm mt-1">
            {items.reduce((sum, i) => sum + i.quantity, 0)} items
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-sm text-red-500 hover:text-red-600 transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="flex gap-8">
        <div className="flex-1 space-y-3">
          {items.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
        </div>

        <div className="w-96 shrink-0">
          <div className="bg-gray-light rounded-2xl p-6 sticky top-24">
            <CheckoutForm />
          </div>
        </div>
      </div>
    </div>
  )
}
