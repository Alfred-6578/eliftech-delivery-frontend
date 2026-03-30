'use client'

interface CategoryFilterProps {
  categories: string[]
  selected: string
  onSelect: (category: string) => void
}

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors ${
            selected === cat
              ? 'bg-orange text-white border-orange'
              : 'border-gray-200 text-gray-600 hover:border-orange/40 hover:text-orange'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
