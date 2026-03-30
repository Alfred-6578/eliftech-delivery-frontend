export function ShopPageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
      <SidebarSkeleton />
      <ProductGridSkeleton />
    </div>
  )
}

export function SidebarSkeleton() {
  return (
    <aside className="w-64 shrink-0 animate-pulse">
      <div className="h-4 w-28 bg-gray-200 rounded mb-3" />
      <div className="space-y-2 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-11 bg-gray-100 rounded-lg" />
        ))}
      </div>
      <hr className="border-gray-200 mb-6" />
      <div className="h-4 w-16 bg-gray-200 rounded mb-3" />
      <div className="space-y-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-14 bg-gray-100 rounded-lg" />
        ))}
      </div>
    </aside>
  )
}

export function ProductGridSkeleton() {
  return (
    <div className="flex-1 min-w-0 animate-pulse">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="h-7 w-40 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-24 bg-gray-100 rounded" />
        </div>
        <div className="h-10 w-32 bg-gray-100 rounded-lg" />
      </div>
      <div className="flex gap-2 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-10 w-20 bg-gray-100 rounded-full" />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-100 overflow-hidden bg-white">
      <div className="bg-gray-100 h-48" />
      <div className="p-4 space-y-3">
        <div className="h-5 w-32 bg-gray-200 rounded" />
        <div className="flex items-center justify-between">
          <div className="h-5 w-16 bg-gray-200 rounded" />
          <div className="h-8 w-16 bg-gray-100 rounded-lg" />
        </div>
      </div>
    </div>
  )
}
