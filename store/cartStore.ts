import { create } from 'zustand'
import { Product, CartItem } from '@/types'

interface CartState {
  items: CartItem[]
  shopId: string | null
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  shopId: null,

  addItem: (product) => {
    const { items, shopId } = get()

    if (shopId && shopId !== product.shop) {
      const confirmed = window.confirm(
        'Your cart contains items from another shop. Clear cart and add this item?'
      )
      if (!confirmed) return
      set({ items: [{ ...product, quantity: 1 }], shopId: product.shop })
      return
    }

    const existing = items.find((item) => item._id === product._id)
    if (existing) {
      set({
        items: items.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      })
    } else {
      set({ items: [...items, { ...product, quantity: 1 }], shopId: product.shop })
    }
  },

  removeItem: (productId) => {
    const items = get().items.filter((item) => item._id !== productId)
    set({ items, shopId: items.length === 0 ? null : get().shopId })
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId)
      return
    }
    set({
      items: get().items.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      ),
    })
  },

  clearCart: () => set({ items: [], shopId: null }),

  getTotal: () =>
    get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
}))
