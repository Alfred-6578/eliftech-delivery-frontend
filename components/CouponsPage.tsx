'use client'

import { useState, useEffect } from 'react'
import { Coupon } from '@/types'
import { getCoupons } from '@/lib/api'
import CouponCard from './CouponCard'

function CouponCardSkeleton() {
  return (
    <div className="border border-gray-100 rounded-2xl p-5 animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="h-12 w-28 bg-gray-100 rounded-xl" />
        <div className="h-6 w-16 bg-gray-100 rounded-full" />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="h-5 w-24 bg-gray-200 rounded mb-2" />
          <div className="h-3 w-32 bg-gray-100 rounded" />
        </div>
        <div className="h-9 w-24 bg-gray-100 rounded-lg" />
      </div>
    </div>
  )
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCoupons().then((data) => {
      setCoupons(data ?? [])
      setLoading(false)
    })
  }, [])

  const active = coupons.filter((c) => c.isActive && new Date(c.expiresAt) >= new Date())
  const inactive = coupons.filter((c) => !c.isActive || new Date(c.expiresAt) < new Date())

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-1">Coupons</h1>
      <p className="text-gray-400 text-sm mb-6">
        {loading ? '' : `${active.length} active coupon${active.length !== 1 ? 's' : ''}`}
      </p>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <CouponCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!loading && coupons.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🏷️</div>
          <p className="text-gray-400">No coupons available.</p>
        </div>
      )}

      {!loading && active.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {active.map((coupon) => (
            <CouponCard key={coupon._id} coupon={coupon} />
          ))}
        </div>
      )}

      {!loading && inactive.length > 0 && (
        <>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Expired / Inactive
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {inactive.map((coupon) => (
              <CouponCard key={coupon._id} coupon={coupon} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
