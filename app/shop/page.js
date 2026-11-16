'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/components/StoreContext'
import {
  RiSearchLine,
  RiShoppingBag3Line,
  RiStarFill,
  RiCloseLine,
  RiCheckLine,
  RiShieldCheckLine,
} from 'react-icons/ri'

const CATEGORIES = ['All', 'Cases', 'Chargers', 'Power Banks', 'Audio', 'Cables', 'Accessories']

export default function ShopCatalogPage() {
  const { products, addToCart, selectedDevice } = useStore()
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [selectedColors, setSelectedColors] = useState({})
  const [quickViewProduct, setQuickViewProduct] = useState(null)

  const filtered = products
    .filter((p) => {
      const matchCat = category === 'All' || p.category === category
      const q = search.toLowerCase()
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      return matchCat && matchSearch
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
      return 0
    })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="tactile-card rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#E85D2A] font-bold">
            CATALOGUE 02 • COMPLETE HARDWARE LINEUP
          </span>
          <h1 className="text-2xl sm:text-4xl font-display font-bold text-[#171717] mt-1">
            All Mobile Accessories ({filtered.length})
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            Every unit is serialized and bench-tested for Qi2 magnetic alignment and USB-PD 3.1 thermal stability.
          </p>
        </div>

        {/* Search & Sort */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search SKU, GaN, Aramid..."
              className="pl-9 pr-4 py-2.5 rounded-xl bg-[#F4F1EA] border border-[#DCD5C7] text-xs font-mono focus:outline-none focus:border-[#E85D2A]"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-[#F4F1EA] border border-[#DCD5C7] text-xs font-mono font-semibold"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated (4.9★)</option>
          </select>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all ${
              category === cat
                ? 'bg-[#171717] text-white shadow'
                : 'bg-white text-neutral-600 hover:text-[#171717] border border-[#DCD5C7]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((product) => {
          const activeColor = selectedColors[product.id] || product.colors[0].name
          return (
            <motion.div
              layout
              key={product.id}
              className="tactile-card rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#E85D2A] transition-all"
            >
              <div>
                <div className="relative h-60 bg-[#EBE6DC] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#171717]/90 text-white font-mono text-[10px] font-bold">
                    {product.badge}
                  </span>
                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-white/95 hover:bg-[#171717] hover:text-white text-[#171717] font-mono text-[10px] font-bold transition-colors shadow"
                  >
                    + Tech Specs
                  </button>
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-white/95 text-[#171717] font-mono text-xs font-bold flex items-center gap-1 shadow">
                    <RiStarFill className="text-amber-500" /> {product.rating}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 mb-1">
                    <span>{product.sku}</span>
                    <span>{product.specs.weight}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#171717]">
                    {product.name}
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>

                  {/* Color Swatches */}
                  <div className="mt-4 flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() =>
                          setSelectedColors({ ...selectedColors, [product.id]: c.name })
                        }
                        className={`w-5 h-5 rounded-full border-2 ${
                          activeColor === c.name
                            ? 'border-[#E85D2A] scale-115'
                            : 'border-neutral-300'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                    <span className="text-[11px] font-mono text-neutral-500 ml-1">
                      {activeColor}
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-neutral-200 flex items-center justify-between gap-2">
                <div>
                  <span className="text-xl font-mono font-bold text-[#171717]">
                    ${product.price}
                  </span>
                  <span className="text-xs font-mono text-neutral-400 line-through ml-1.5">
                    ${product.originalPrice}
                  </span>
                </div>

                <button
                  onClick={() => addToCart(product, activeColor, selectedDevice)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#E85D2A] hover:bg-[#d14e1f] text-white font-mono text-xs font-bold transition-colors"
                >
                  <RiShoppingBag3Line />
                  <span>Add to Bag</span>
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Quick View Technical Blueprint Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickViewProduct(null)}
              className="fixed inset-0 bg-black/65 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              className="relative z-10 w-full max-w-xl rounded-3xl bg-white border border-[#DCD5C7] overflow-hidden shadow-2xl"
            >
              <div className="relative h-64 bg-[#EBE6DC]">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setQuickViewProduct(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#171717] text-white flex items-center justify-center"
                >
                  <RiCloseLine className="text-lg" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <span className="text-xs font-mono text-[#E85D2A] font-bold">
                    {quickViewProduct.sku} • HARDWARE SPECIFICATION SHEET
                  </span>
                  <h3 className="text-2xl font-display font-bold text-[#171717] mt-0.5">
                    {quickViewProduct.name}
                  </h3>
                  <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                    {quickViewProduct.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-[#F4F1EA]">
                    <span className="text-[10px] text-neutral-500 block">CHASSIS / MATERIAL</span>
                    <span className="font-bold text-[#171717]">
                      {quickViewProduct.specs.material}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F4F1EA]">
                    <span className="text-[10px] text-neutral-500 block">MAGNET / OUTPUT</span>
                    <span className="font-bold text-[#171717]">
                      {quickViewProduct.specs.magnetForce}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F4F1EA]">
                    <span className="text-[10px] text-neutral-500 block">NET MASS</span>
                    <span className="font-bold text-[#171717]">
                      {quickViewProduct.specs.weight}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F4F1EA]">
                    <span className="text-[10px] text-neutral-500 block">COVERAGE</span>
                    <span className="font-bold text-emerald-700">
                      {quickViewProduct.specs.warranty}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-2xl font-mono font-bold text-[#171717]">
                    ${quickViewProduct.price}
                  </span>
                  <button
                    onClick={() => {
                      addToCart(quickViewProduct, quickViewProduct.colors[0].name)
                      setQuickViewProduct(null)
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E85D2A] text-white font-mono text-xs font-bold"
                  >
                    <RiShoppingBag3Line /> Add to Carry Bag
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
