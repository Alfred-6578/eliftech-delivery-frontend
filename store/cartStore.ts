import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product, CartItem, Order } from '@/types'

interface ReorderInfo {
  name: string
  email: string
  phone: string
  address: string
}

interface CartState {
  items: CartItem[]
  reorderInfo: ReorderInfo | null
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  reorder: (order: Order) => void
  clearCart: () => void
  clearReorderInfo: () => void
  getTotal: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      reorderInfo: null,

      addItem: (product) => {
        const { items } = get()
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
          set({ items: [...items, { ...product, quantity: 1 }] })
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item._id !== productId) })
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

      reorder: (order) => {
        const newItems: CartItem[] = []
        for (const shopEntry of order.shops) {
          for (const item of shopEntry.items) {
            const existing = newItems.find((i) => i._id === item.product._id)
            if (existing) {
              existing.quantity += item.quantity
            } else {
              newItems.push({
                _id: item.product._id,
                name: item.product.name,
                price: item.product.price,
                image: '',
                category: '',
                shop: shopEntry.shop?._id ?? '',
                quantity: item.quantity,
              })
            }
          }
        }
        set({
          items: [...get().items, ...newItems],
          reorderInfo: {
            name: order.name,
            email: order.email,
            phone: order.phone,
            address: order.address,
          },
        })
      },

      clearCart: () => set({ items: [], reorderInfo: null }),

      clearReorderInfo: () => set({ reorderInfo: null }),

      getTotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: 'quickbite-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
)
