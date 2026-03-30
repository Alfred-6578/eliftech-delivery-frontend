'use client'

import { CartItem as CartItemType } from '@/types'
import { useCartStore } from '@/store/cartStore'

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100">
      <div className="w-20 h-20 shrink-0 bg-gradient-to-b from-peach-light to-peach rounded-xl flex items-center justify-center">
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-14 h-14 object-contain" />
        ) : (
          <span className="text-3xl">🍽️</span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm">{item.name}</h3>
        <p className="text-orange font-bold mt-1">${item.price.toLocaleString()}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item._id, item.quantity - 1)}
          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-orange hover:text-orange transition-colors"
        >
          −
        </button>
        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item._id, item.quantity + 1)}
          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-orange hover:text-orange transition-colors"
        >
          +
        </button>
      </div>

      <div className="w-20 text-right">
        <p className="font-bold text-sm">${(item.price * item.quantity).toLocaleString()}</p>
      </div>

      <button
        onClick={() => removeItem(item._id)}
        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
      </button>
    </div>
  )
}
