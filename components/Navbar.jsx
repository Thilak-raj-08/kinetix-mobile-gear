'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useStore } from './StoreContext'
import {
  RiShoppingBag3Line,
  RiSmartphoneLine,
  RiMenuLine,
  RiCloseLine,
  RiFlashlightFill,
} from 'react-icons/ri'

const navLinks = [
  { href: '/', label: 'Storefront' },
  { href: '/shop', label: 'All Gear (8)' },
  { href: '/bundle', label: 'Build EDC Kit (-20%)' },
  { href: '/compatibility', label: 'Qi2 & Wattage Lab' },
  { href: '/track-order', label: 'Checkout & Track' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { totalCount, setCartOpen, devices, selectedDevice, setSelectedDevice } = useStore()

  return (
    <header className="sticky top-0 z-40 bg-[#F4F1EA]/95 backdrop-blur-md border-b border-[#DCD5C7]">
      {/* Top Industrial Telemetry Bar */}
      <div className="bg-[#161616] text-[#F4F1EA] text-[11px] font-mono py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#E85D2A] animate-pulse" />
            <span>FREE EXPRESS DISPATCH OVER $90 • CODE: VOLT15 FOR 15% OFF</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-neutral-400">
            <span>QI2 15W CERTIFIED</span>
            <span>•</span>
            <span>600D AEROSPACE ARAMID</span>
            <span>•</span>
            <span>LIFETIME WARRANTY</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl bg-white border border-[#DCD5C7] text-[#171717]"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <RiCloseLine className="text-xl" /> : <RiMenuLine className="text-xl" />}
          </button>

          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#171717] text-[#F4F1EA] flex items-center justify-center font-mono font-bold text-lg shadow-sm">
              <RiFlashlightFill className="text-[#E85D2A] text-xl" />
            </div>
            <div>
              <span className="font-display font-bold text-lg tracking-tight text-[#171717] block leading-none">
                VOLT &amp; GRAIN
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                INDUSTRIAL MOBILE CARRY
              </span>
            </div>
          </Link>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/80 border border-[#DED8CA] rounded-full p-1.5">
          {navLinks.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  active
                    ? 'bg-[#171717] text-[#F4F1EA] shadow-sm'
                    : 'text-neutral-600 hover:text-[#171717]'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Right: Device Selector & Slide-Over Bag Button */}
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-1.5 bg-white border border-[#DCD5C7] rounded-xl px-3 py-1.5">
            <RiSmartphoneLine className="text-[#E85D2A] text-sm" />
            <select
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e.target.value)}
              aria-label="Select your phone model"
              className="bg-transparent text-xs font-mono font-semibold text-[#171717] focus:outline-none cursor-pointer"
            >
              {devices.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setCartOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E85D2A] hover:bg-[#d14e1f] text-white font-mono text-xs font-bold transition-all shadow-sm"
          >
            <RiShoppingBag3Line className="text-base" />
            <span>BAG ({totalCount})</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-[#DCD5C7] px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-xs font-bold ${
                pathname === link.href
                  ? 'bg-[#171717] text-white'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
