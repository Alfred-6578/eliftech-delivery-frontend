'use client'

import { useState, useEffect } from 'react'
import { Order } from '@/types'
import { getOrders } from '@/lib/api'
import OrderCard from './OrderCard'

function OrderCardSkeleton() {
  return (
    <div className="border border-gray-100 rounded-2xl bg-white overflow-hidden animate-pulse">
      <div className="flex items-center justify-between px-6 py-4 bg-gray-light">
        <div>
          <div className="h-3 w-24 bg-gray-200 rounded mb-1.5" />
          <div className="h-3 w-32 bg-gray-200 rounded" />
        </div>
        <div className="h-6 w-16 bg-gray-200 rounded" />
      </div>
      <div className="px-6 py-4 space-y-3">
        <div className="h-4 w-28 bg-gray-200 rounded" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex justify-between">
            <div className="h-4 w-40 bg-gray-100 rounded" />
            <div className="h-4 w-12 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
      <div className="px-6 py-3 border-t border-gray-100 flex gap-4">
        <div className="h-3 w-20 bg-gray-100 rounded" />
        <div className="h-3 w-32 bg-gray-100 rounded" />
      </div>
    </div>
  )
}

export default function HistoryPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() && !phone.trim()) return
    setLoading(true)
    setSearched(true)
    const params: Record<string, string> = {}
    if (email.trim()) params.email = email.trim()
    if (phone.trim()) params.phone = phone.trim()
    const data = await getOrders(params)
    setOrders(data ?? [])
    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-1">Order History</h1>
      <p className="text-gray-400 text-sm mb-6">Find your orders by email and phone</p>

      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange transition-colors"
        />
        <input
          type="tel"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange transition-colors"
        />
        <button
          type="submit"
          disabled={loading || (!email.trim() && !phone.trim())}
          className="px-6 py-2.5 bg-orange text-white rounded-lg text-sm font-medium hover:bg-orange-dark transition-colors disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {loading && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <OrderCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!loading && searched && orders.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">📋</div>
          <p className="text-gray-400">No orders found.</p>
        </div>
      )}

      {!loading && orders.length > 0 && (
        <>
          <p className="text-gray-400 text-sm mb-4">
            {orders.length} order{orders.length !== 1 ? 's' : ''} found
          </p>
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
