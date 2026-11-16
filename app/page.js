'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useStore } from '@/components/StoreContext'
import {
  RiArrowRightLine,
  RiArrowRightUpLine,
  RiShoppingBag3Line,
  RiShieldCheckLine,
  RiFlashlightFill,
  RiStarFill,
  RiCheckLine,
  RiSmartphoneLine,
} from 'react-icons/ri'

export default function HomePage() {
  const { products, devices, selectedDevice, setSelectedDevice, addToCart } = useStore()
  const [selectedColors, setSelectedColors] = useState({})

  const featuredProducts = products.slice(0, 6)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Editorial Hero Showcase */}
      <section className="tactile-card rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E85D2A]/10 border border-[#E85D2A]/30 text-[#E85D2A] text-xs font-mono font-bold mb-5">
              <span>SERIES 04 • TACTILE EVERYDAY CARRY</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-bold text-[#171717] tracking-tight leading-[1.08]">
              Engineered Armor &amp; 100W GaN Power for Modern Phones.
            </h1>
            <p className="text-neutral-600 text-sm sm:text-base mt-4 leading-relaxed">
              600D aerospace aramid fiber cases, solid CNC aluminum Qi2 power banks, and
              Kevlar-braided 240W cords crafted for tactile precision—never generic plastic.
            </p>

            {/* Interactive Phone Compatibility Bar */}
            <div className="mt-6 p-4 rounded-2xl bg-[#F4F1EA] border border-[#DCD5C7]">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-2">
                SELECT YOUR DEVICE FOR INSTANT QI2 / MAGSAFE FITMENT:
              </label>
              <div className="flex flex-wrap gap-2">
                {devices.map((dev) => (
                  <button
                    key={dev.id}
                    onClick={() => setSelectedDevice(dev.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                      selectedDevice === dev.id
                        ? 'bg-[#171717] text-white shadow-sm'
                        : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-[#DCD5C7]'
                    }`}
                  >
                    {dev.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-200 flex flex-wrap items-center gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#E85D2A] hover:bg-[#d14e1f] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md"
            >
              <span>Shop All Accessories</span>
              <RiArrowRightLine className="text-base" />
            </Link>
            <Link
              href="/bundle"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#171717] hover:bg-neutral-800 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all"
            >
              <span>Build 4-Piece EDC Kit (-20%)</span>
              <RiArrowRightUpLine className="text-base text-[#E85D2A]" />
            </Link>
          </div>
        </div>

        {/* Right Custom Photorealistic Flat-Lay Studio Image */}
        <div className="lg:col-span-6 relative min-h-[320px] lg:min-h-[520px] bg-[#E8E2D5] border-t lg:border-t-0 lg:border-l border-[#DFD9CE] overflow-hidden">
          <img
            src="/images/hero-flatlay.jpg"
            alt="Volt & Grain Mobile Accessories Studio Flatlay"
            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#171717]/90 backdrop-blur-md text-[#F4F1EA] flex items-center justify-between text-xs font-mono">
            <div>
              <span className="text-[#E85D2A] font-bold block">BENCH TESTED SPEC</span>
              <span>N52H 1,500g MagSafe Array • GaN III 100W</span>
            </div>
            <span className="px-3 py-1 rounded-lg bg-white/10 text-white font-bold">
              2.4m Drop Rated
            </span>
          </div>
        </div>
      </section>

      {/* Category Spotlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: '600D Aramid & Leather Cases',
            sub: 'CNC Camera Bezel • 1,500g MagSafe Lock',
            image: '/images/magsafe-case.jpg',
            tag: 'FROM $46',
            href: '/shop',
          },
          {
            title: '100W GaN III Desktop & Wall Power',
            sub: '0–80% in 24 Mins • Real-Time Thermal Guard',
            image: '/images/gan-charger.jpg',
            tag: 'FROM $74',
            href: '/shop',
          },
          {
            title: 'Acoustic-01 Lossless ANC Buds',
            sub: '48dB Hybrid ANC • Qi2 MagSafe Case',
            image: '/images/wireless-earbuds.jpg',
            tag: 'FROM $129',
            href: '/shop',
          },
        ].map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="group tactile-card rounded-2xl overflow-hidden flex flex-col justify-between"
          >
            <div className="relative h-60 overflow-hidden bg-[#EBE6DC]">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-[#171717] text-white font-mono text-[11px] font-bold">
                {cat.tag}
              </span>
            </div>
            <div className="p-5 flex items-center justify-between gap-3">
              <div>
                <h3 className="font-display font-bold text-base text-[#171717]">
                  {cat.title}
                </h3>
                <p className="text-xs font-mono text-neutral-500 mt-0.5">{cat.sub}</p>
              </div>
              <Link
                href={cat.href}
                className="w-10 h-10 rounded-xl bg-[#F4F1EA] group-hover:bg-[#E85D2A] group-hover:text-white flex items-center justify-center transition-colors shrink-0"
              >
                <RiArrowRightLine />
              </Link>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Featured Bestsellers 3-Column Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#E85D2A] font-bold">
              ENGINEERED HARDWARE
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-[#171717] mt-1">
              Flagship Mobile Accessories
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#171717] hover:text-[#E85D2A]"
          >
            <span>VIEW FULL 8-ITEM CATALOG</span>
            <RiArrowRightLine />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => {
            const activeColor = selectedColors[product.id] || product.colors[0].name
            return (
              <div
                key={product.id}
                className="tactile-card rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#E85D2A] transition-all duration-300"
              >
                <div>
                  <div className="relative h-60 bg-[#ECE7DD] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#171717]/90 text-white font-mono text-[10px] font-bold">
                      {product.badge}
                    </span>
                    <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-white/95 text-[#171717] font-mono text-xs font-bold flex items-center gap-1 shadow">
                      <RiStarFill className="text-amber-500" /> {product.rating} ({product.reviews})
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 mb-1">
                      <span>{product.sku}</span>
                      <span>{product.category}</span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-[#171717] leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-xs text-neutral-600 mt-2 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Color Swatch Selector */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {product.colors.map((c) => (
                          <button
                            key={c.name}
                            onClick={() =>
                              setSelectedColors({ ...selectedColors, [product.id]: c.name })
                            }
                            title={c.name}
                            className={`w-5 h-5 rounded-full border-2 transition-transform ${
                              activeColor === c.name
                                ? 'border-[#E85D2A] scale-115'
                                : 'border-neutral-300'
                            }`}
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                        <span className="text-[11px] font-mono text-neutral-500 ml-1">
                          {activeColor}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-3 border-t border-neutral-200 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-xl font-mono font-bold text-[#171717]">
                      ${product.price}
                    </span>
                    <span className="text-xs font-mono text-neutral-400 line-through ml-1.5">
                      ${product.originalPrice}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(product, activeColor)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#171717] hover:bg-[#E85D2A] text-white font-mono text-xs font-bold transition-colors"
                  >
                    <RiShoppingBag3Line className="text-sm" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Industrial Bundle Callout Banner */}
      <section className="tactile-dark rounded-3xl p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#E85D2A] font-bold">
            CUSTOM EVERYDAY CARRY CONFIGURATOR
          </span>
          <h3 className="text-2xl sm:text-4xl font-display font-bold text-white">
            Build Your 4-Piece MagSafe &amp; GaN Power Kit — Save 20% Instantly.
          </h3>
          <p className="text-neutral-400 text-sm max-w-2xl leading-relaxed">
            Pair any MagSafe Case + 100W GaN Charger + 10,000mAh Qi2 Power Bank + 240W Kevlar
            Cord and unlock automatic 20% bundle pricing plus complimentary express air courier.
          </p>
        </div>
        <div className="lg:col-span-4 flex lg:justify-end">
          <Link
            href="/bundle"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-[#E85D2A] hover:bg-[#d14e1f] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg"
          >
            <RiFlashlightFill className="text-base" />
            <span>Launch Kit Configurator</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
