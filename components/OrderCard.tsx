'use client'

import { useRouter } from 'next/navigation'
import { Order } from '@/types'
import { useCartStore } from '@/store/cartStore'

interface OrderCardProps {
  order: Order
}

export default function OrderCard({ order }: OrderCardProps) {
  const reorder = useCartStore((s) => s.reorder)
  const router = useRouter()

  const handleReorder = () => {
    reorder(order)
    router.push('/cart')
  }

  const date = new Date(order.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="border border-gray-100 rounded-2xl bg-white overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between px-6 py-4 bg-gray-light">
        <div>
          <p className="text-xs text-gray-400">Order #{order._id.slice(-6).toUpperCase()}</p>
          <p className="text-xs text-gray-400 mt-0.5">{date}</p>
        </div>
        <span className="text-orange font-bold text-lg">
          ${order.totalPrice.toFixed(2)}
        </span>
      </div>

      <div className="px-6 py-4 space-y-4">
        {order.shops.map((shopEntry, idx) => (
          <div key={shopEntry.shop?._id ?? idx}>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              {shopEntry.shop?.name ?? 'Unknown Shop'}
            </p>
            <div className="space-y-2">
              {shopEntry.items.map((item) => (
                <div key={item._id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">{item.quantity}x</span>
                    <span>{item.product?.name ?? item.name}</span>
                  </div>
                  <span className="text-gray-500">
                    ${((item.product?.price ?? item.price) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2 pt-2 border-t border-gray-100">
              <span>Subtotal</span>
              <span>${shopEntry.subtotal.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 py-3 border-t border-gray-100 flex items-center gap-4 text-xs text-gray-400">
        <span>{order.name}</span>
        <span>{order.email}</span>
        <span className="ml-auto">{order.address}</span>
        <button
          onClick={handleReorder}
          className="ml-2 px-4 py-1.5 bg-orange text-white text-xs font-medium rounded-lg hover:bg-orange-dark transition-colors"
        >
          Reorder
        </button>
      </div>
    </div>
  )
}
