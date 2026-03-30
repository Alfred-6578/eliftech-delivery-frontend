'use client'

import { useState } from 'react'
import { Coupon } from '@/types'

interface CouponCardProps {
  coupon: Coupon
}

export default function CouponCard({ coupon }: CouponCardProps) {
  const [copied, setCopied] = useState(false)
  const expired = new Date(coupon.expiresAt) < new Date()
  const inactive = !coupon.isActive || expired

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={`relative border rounded-2xl p-5 transition-shadow ${
        inactive
          ? 'border-gray-200 bg-gray-50 opacity-60'
          : 'border-orange/20 bg-white hover:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="bg-orange-light text-orange text-2xl font-bold px-4 py-2 rounded-xl">
          {coupon.discount}% OFF
        </div>
        {inactive && (
          <span className="text-xs text-gray-400 border border-gray-200 rounded-full px-3 py-1">
            {expired ? 'Expired' : 'Inactive'}
          </span>
        )}
        {!inactive && (
          <span className="text-xs text-green-600 border border-green-200 bg-green-50 rounded-full px-3 py-1">
            Active
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono font-bold text-lg tracking-wider">{coupon.code}</p>
          <p className="text-xs text-gray-400 mt-1">
            Expires {new Date(coupon.expiresAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </div>
        <button
          onClick={handleCopy}
          disabled={inactive}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            copied
              ? 'bg-green-50 text-green-600 border border-green-200'
              : inactive
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'border border-orange text-orange hover:bg-orange hover:text-white'
          }`}
        >
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>
    </div>
  )
}
