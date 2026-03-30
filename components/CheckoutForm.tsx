'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { createOrder, validateCoupon } from '@/lib/api'
import { useRouter } from 'next/navigation'

export default function CheckoutForm() {
  const { items, getTotal, clearCart } = useCartStore()
  const router = useRouter()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  })
  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [couponError, setCouponError] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const subtotal = getTotal()
  const discountAmount = subtotal * (discount / 100)
  const total = subtotal - discountAmount

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return
    setCouponError('')
    try {
      const data = await validateCoupon(couponCode)
      if (data && data.discount) {
        setDiscount(data.discount)
        setCouponApplied(true)
      } else {
        setCouponError('Invalid coupon code')
      }
    } catch {
      setCouponError('Invalid coupon code')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) return

    setSubmitting(true)
    try {
      const itemsByShop: Record<string, typeof items> = {}
      for (const item of items) {
        if (!itemsByShop[item.shop]) itemsByShop[item.shop] = []
        itemsByShop[item.shop].push(item)
      }

      await Promise.all(
        Object.entries(itemsByShop).map(([shopId, shopItems]) =>
          createOrder({
            ...form,
            shop: shopId,
            items: shopItems.map((item) => ({
              product: item._id,
              quantity: item.quantity,
            })),
          })
        )
      )
      clearCart()
      router.push('/history')
    } catch {
      alert('Failed to place order. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-lg font-bold mb-4">Delivery Details</h2>
        <div className="space-y-3">
          {[
            { name: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
            { name: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com' },
            { name: 'phone', label: 'Phone', type: 'tel', placeholder: '1234567890' },
            { name: 'address', label: 'Address', type: 'text', placeholder: '123 Main St' },
          ].map(({ name, label, type, placeholder }) => (
            <div key={name}>
              <label className="block text-sm text-gray-500 mb-1">{label}</label>
              <input
                name={name}
                type={type}
                placeholder={placeholder}
                value={form[name as keyof typeof form]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange transition-colors"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-4">Coupon</h2>
        <div className="flex gap-2">
          <input
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter coupon code"
            disabled={couponApplied}
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange transition-colors disabled:bg-gray-50"
          />
          <button
            type="button"
            onClick={handleApplyCoupon}
            disabled={couponApplied}
            className="px-5 py-2.5 bg-orange text-white rounded-lg text-sm font-medium hover:bg-orange-dark transition-colors disabled:opacity-50"
          >
            {couponApplied ? 'Applied' : 'Apply'}
          </button>
        </div>
        {couponError && <p className="text-red-500 text-xs mt-1">{couponError}</p>}
        {couponApplied && (
          <p className="text-green-600 text-xs mt-1">Coupon applied! {discount}% off</p>
        )}
      </div>

      <div className="border-t border-gray-100 pt-4 space-y-2">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Subtotal</span>
          <span>${subtotal.toLocaleString()}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount ({discount}%)</span>
            <span>-${discountAmount.toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-lg pt-2">
          <span>Total</span>
          <span className="text-orange">${total.toLocaleString()}</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting || items.length === 0}
        className="w-full py-3 bg-orange text-white rounded-xl font-semibold hover:bg-orange-dark transition-colors disabled:opacity-50"
      >
        {submitting ? 'Placing Order...' : 'Place Order'}
      </button>
    </form>
  )
}
