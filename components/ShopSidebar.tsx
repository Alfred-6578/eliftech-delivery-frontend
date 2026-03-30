'use client'

import { Shop } from '@/types'

const ratingFilters = [
  { label: 'All Shops', min: 0, max: 5 },
  { label: '4.0 – 5.0', min: 4, max: 5, stars: 5 },
  { label: '3.0 – 4.0', min: 3, max: 4, stars: 4 },
  { label: '2.0 – 3.0', min: 2, max: 3, stars: 3 },
]

interface ShopSidebarProps {
  shops: Shop[]
  selectedShopId: string | null
  onSelectShop: (shop: Shop) => void
  ratingFilter: { min: number; max: number }
  onRatingFilter: (filter: { min: number; max: number }) => void
}

function StarRating({ count }: { count: number }) {
  return (
    <span className="text-orange text-sm">
      {'★'.repeat(count)}
    </span>
  )
}

export default function ShopSidebar({
  shops,
  selectedShopId,
  onSelectShop,
  ratingFilter,
  onRatingFilter,
}: ShopSidebarProps) {
  const filteredShops = shops.filter(
    (shop) => shop.rating >= ratingFilter.min && shop.rating <= ratingFilter.max
  )

  return (
    <aside className="w-64 shrink-0">
      <div className="mb-6">
        <h3 className="text-xs font-bold text-orange uppercase tracking-wider mb-3">
          Filter by Rating
        </h3>
        <div className="space-y-2">
          {ratingFilters.map((filter) => {
            const isActive =
              ratingFilter.min === filter.min && ratingFilter.max === filter.max
            return (
              <button
                key={filter.label}
                onClick={() => onRatingFilter({ min: filter.min, max: filter.max })}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                  isActive
                    ? 'border-orange bg-orange-light text-orange font-medium'
                    : 'border-gray-200 text-gray-600 hover:border-orange/40'
                }`}
              >
                <span>{filter.label}</span>
                {filter.stars && <StarRating count={filter.stars} />}
              </button>
            )
          })}
        </div>
      </div>

      <hr className="border-gray-200 mb-6" />

      <div>
        <h3 className="text-xs font-bold text-orange uppercase tracking-wider mb-3">
          Shops
        </h3>
        <div className="space-y-1">
          {filteredShops.length > 0 ? filteredShops.map((shop) => (
            <button
              key={shop._id}
              onClick={() => onSelectShop(shop)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                selectedShopId === shop._id
                  ? 'border border-orange bg-orange-light'
                  : 'hover:bg-gray-light'
              }`}
            >
              <p className="font-semibold text-sm">{shop.name}</p>
              <p className="text-xs text-orange mt-0.5">★ {shop.rating.toFixed(1)}</p>
            </button>
          )) : <p className="text-sm text-gray-400 px-4">No shops found</p>}
        </div>
      </div>
    </aside>
  )
}
