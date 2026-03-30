'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import CartBadge from './CartBadge'

const navLinks = [
  { href: '/', label: 'Shop' },
  { href: '/cart', label: 'Cart' },
  { href: '/history', label: 'History' },
  { href: '/coupons', label: 'Coupons' },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="border-b border-orange/20 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold italic text-orange">
          QuickBite
        </Link>

        <nav className="flex items-center gap-1">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-orange text-white'
                    : 'text-gray-600 hover:text-orange'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        <CartBadge />
      </div>
    </header>
  )
}
