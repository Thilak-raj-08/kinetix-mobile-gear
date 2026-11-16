'use client'

import { useState } from 'react'
import { useStore } from '@/components/StoreContext'
import { BUNDLE_STEPS } from '@/data/productsData'
import {
  RiCheckLine,
  RiShoppingBag3Line,
  RiFlashlightFill,
  RiShieldCheckLine,
} from 'react-icons/ri'

export default function BundleConfiguratorPage() {
  const { products, addToCart, applyPromo } = useStore()

  const [selections, setSelections] = useState({
    case: products[0],
    charger: products[1],
    power: products[3],
    cable: products[4],
  })

  const getOptionsForStep = (stepKey) => {
    if (stepKey === 'case') return products.filter((p) => p.category === 'Cases')
    if (stepKey === 'charger') return products.filter((p) => p.category === 'Chargers')
    if (stepKey === 'power')
      return products.filter((p) => p.category === 'Power Banks' || p.category === 'Audio')
    return products.filter((p) => p.category === 'Cables' || p.category === 'Accessories')
  }

  const selectedList = Object.values(selections)
  const rawTotal = selectedList.reduce((sum, item) => sum + item.price, 0)
  const bundlePrice = Math.round(rawTotal * 0.8)
  const savedAmount = rawTotal - bundlePrice

  const handleAddFullKit = () => {
    selectedList.forEach((prod) => {
      addToCart(prod, prod.colors[0].name)
    })
    applyPromo('MAGSAFE20')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="tactile-dark rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#E85D2A] font-bold">
            MODULE 03 • CUSTOM 4-PIECE EDC WORKBENCH
          </span>
          <h1 className="text-2xl sm:text-4xl font-display font-bold text-white mt-1">
            Configure Your Everyday Carry Kit — Save 20%
          </h1>
          <p className="text-neutral-400 text-xs sm:text-sm mt-2 max-w-2xl">
            Select one hardware item from each of the 4 industrial categories below. Adding the
            complete 4-piece kit automatically applies the 20% MAGSAFE20 tier discount.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 font-mono text-right shrink-0">
          <span className="text-[10px] text-neutral-400 block">4-PIECE KIT PRICE</span>
          <span className="text-3xl font-bold text-[#E85D2A]">${bundlePrice}</span>
          <span className="text-xs text-neutral-500 line-through ml-2">${rawTotal}</span>
          <span className="block text-[11px] text-emerald-400 mt-0.5">
            You Save ${savedAmount} (20% OFF)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8 Cols: 4-Step Selector */}
        <div className="lg:col-span-8 space-y-6">
          {BUNDLE_STEPS.map((st) => {
            const options = getOptionsForStep(st.key)
            const chosen = selections[st.key]
            return (
              <div key={st.key} className="tactile-card rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#E85D2A]">
                      STEP 0{st.step}
                    </span>
                    <h3 className="text-lg font-display font-bold text-[#171717]">
                      {st.title}
                    </h3>
                    <p className="text-xs text-neutral-500">{st.subtitle}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#F4F1EA] font-mono text-xs font-bold text-[#171717]">
                    Selected: {chosen.sku}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {options.map((opt) => {
                    const isPicked = chosen.id === opt.id
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setSelections({ ...selections, [st.key]: opt })}
                        className={`text-left p-4 rounded-2xl border-2 transition-all flex gap-3.5 items-center ${
                          isPicked
                            ? 'border-[#E85D2A] bg-[#E85D2A]/5'
                            : 'border-neutral-200 hover:border-neutral-400 bg-white'
                        }`}
                      >
                        <img
                          src={opt.image}
                          alt={opt.name}
                          className="w-16 h-16 rounded-xl object-cover shrink-0 border border-neutral-200"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-neutral-500">
                              {opt.sku}
                            </span>
                            {isPicked && (
                              <span className="w-5 h-5 rounded-full bg-[#E85D2A] text-white flex items-center justify-center text-xs">
                                <RiCheckLine />
                              </span>
                            )}
                          </div>
                          <h4 className="text-xs font-bold text-[#171717] truncate mt-0.5">
                            {opt.name}
                          </h4>
                          <p className="text-sm font-mono font-bold text-[#171717] mt-1">
                            ${opt.price}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Right 4 Cols: Sticky Kit Manifest */}
        <div className="lg:col-span-4">
          <div className="tactile-card rounded-3xl p-6 sticky top-24 space-y-5">
            <div className="border-b border-neutral-200 pb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#E85D2A] font-bold">
                LIVE BUNDLE MANIFEST
              </span>
              <h3 className="text-xl font-display font-bold text-[#171717]">
                Your 4-Piece Carry Kit
              </h3>
            </div>

            <div className="space-y-3">
              {BUNDLE_STEPS.map((st) => {
                const item = selections[st.key]
                return (
                  <div
                    key={st.key}
                    className="p-3 rounded-xl bg-[#F4F1EA] flex items-center justify-between gap-2 text-xs"
                  >
                    <div className="truncate">
                      <span className="text-[10px] font-mono text-neutral-500 block">
                        0{st.step}. {st.category}
                      </span>
                      <span className="font-bold text-[#171717] truncate block">
                        {item.name}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-[#171717] shrink-0">
                      ${item.price}
                    </span>
                  </div>
                )
              })}
            </div>

            <div className="pt-3 border-t border-neutral-200 space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-neutral-500">
                <span>Standard Retail Total</span>
                <span>${rawTotal}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>20% EDC Bundle Discount</span>
                <span>-${savedAmount}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-[#171717] pt-2 border-t border-neutral-200">
                <span>Kit Total</span>
                <span>${bundlePrice}</span>
              </div>
            </div>

            <button
              onClick={handleAddFullKit}
              className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl bg-[#E85D2A] hover:bg-[#d14e1f] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md"
            >
              <RiShoppingBag3Line className="text-base" />
              <span>Add Complete 4-Piece Kit to Bag</span>
            </button>

            <p className="text-[11px] font-mono text-neutral-500 flex items-center justify-center gap-1.5">
              <RiShieldCheckLine className="text-emerald-600 text-sm" />
              Includes Promo Code MAGSAFE20 Automatically
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
