'use client'

import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'

export default function CartBadge() {
  const items = useCartStore((s) => s.items)
  const count = items.length

  return (
    <Link
      href="/cart"
      className="relative flex items-center gap-2 px-4 py-2 border border-orange/30 rounded-full text-orange text-sm font-medium hover:bg-orange-light transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>
      Cart
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-orange text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
          {count}
        </span>
      )}
    </Link>
  )
}
