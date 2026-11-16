'use client'

import { useState } from 'react'
import {
  RiFlashlightFill,
  RiSmartphoneLine,
  RiTempColdLine,
  RiShieldCheckLine,
} from 'react-icons/ri'

const PHONE_PROFILES = [
  {
    id: 'iphone-16-pro-max',
    name: 'iPhone 16 Pro Max',
    batteryMah: 4685,
    maxWiredW: 38,
    maxWirelessW: 25,
    zeroTo50Wired: '19 mins',
    zeroTo80Wired: '34 mins',
    magnetRing: 'Native Apple MagSafe + Qi2',
    pullStrengthG: 1550,
  },
  {
    id: 'galaxy-s25-ultra',
    name: 'Samsung Galaxy S25 Ultra',
    batteryMah: 5000,
    maxWiredW: 45,
    maxWirelessW: 15,
    zeroTo50Wired: '16 mins',
    zeroTo80Wired: '29 mins',
    magnetRing: 'Qi2 via Volt & Grain Aramid Case',
    pullStrengthG: 1500,
  },
  {
    id: 'pixel-9-pro-xl',
    name: 'Google Pixel 9 Pro XL',
    batteryMah: 5060,
    maxWiredW: 37,
    maxWirelessW: 15,
    zeroTo50Wired: '21 mins',
    zeroTo80Wired: '36 mins',
    magnetRing: 'Qi2 via Volt & Grain Aramid Case',
    pullStrengthG: 1480,
  },
]

export default function CompatibilityLabPage() {
  const [selectedProfile, setSelectedProfile] = useState(PHONE_PROFILES[0])
  const [selectedAdapterW, setSelectedAdapterW] = useState(100)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="tactile-card rounded-3xl p-6 sm:p-10">
        <span className="text-xs font-mono uppercase tracking-widest text-[#E85D2A] font-bold">
          MODULE 04 • QI2 MAGNETIC &amp; GAN III TELEMETRY LAB
        </span>
        <h1 className="text-2xl sm:text-4xl font-display font-bold text-[#171717] mt-1">
          Interactive Fast-Charge &amp; Magnetic Fitment Analyzer
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-2xl">
          Test how our HyperCore GaN III chargers and N52H neodymium MagSafe arrays perform with
          your exact smartphone hardware.
        </p>

        {/* Device & Wattage Controls */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-[#F4F1EA] border border-[#DCD5C7] space-y-3">
              <label className="block text-[11px] font-mono uppercase font-bold text-neutral-600">
                1. CHOOSE TARGET HANDSET:
              </label>
              <div className="space-y-2">
                {PHONE_PROFILES.map((prof) => (
                  <button
                    key={prof.id}
                    onClick={() => setSelectedProfile(prof)}
                    className={`w-full text-left px-4 py-3 rounded-xl font-mono text-xs font-bold flex items-center justify-between transition-all ${
                      selectedProfile.id === prof.id
                        ? 'bg-[#171717] text-white shadow'
                        : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-[#DCD5C7]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <RiSmartphoneLine className="text-[#E85D2A] text-base" />
                      {prof.name}
                    </span>
                    <span className="text-[10px] opacity-75">{prof.batteryMah} mAh</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#F4F1EA] border border-[#DCD5C7] space-y-3">
              <label className="block text-[11px] font-mono uppercase font-bold text-neutral-600">
                2. SELECT GAN CHARGER OUTPUT:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[35, 65, 100].map((w) => (
                  <button
                    key={w}
                    onClick={() => setSelectedAdapterW(w)}
                    className={`py-2.5 rounded-xl font-mono text-xs font-bold transition-all ${
                      selectedAdapterW === w
                        ? 'bg-[#E85D2A] text-white'
                        : 'bg-white text-[#171717] border border-[#DCD5C7]'
                    }`}
                  >
                    {w}W GaN III
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right 7 Cols: Live Telemetry Output */}
          <div className="lg:col-span-7 tactile-dark rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#E85D2A]">
                  BENCHMARK SIMULATION
                </span>
                <h3 className="text-xl font-display font-bold text-white">
                  {selectedProfile.name} + {selectedAdapterW}W HyperCore GaN
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 font-mono text-xs font-bold">
                USB-PD 3.1 PPS Optimal
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
              <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800">
                <span className="text-[10px] text-neutral-400 block">PEAK WIRED DRAW</span>
                <span className="text-xl font-bold text-[#E85D2A]">
                  {Math.min(selectedAdapterW, selectedProfile.maxWiredW)}W
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800">
                <span className="text-[10px] text-neutral-400 block">0 → 50% CHARGE</span>
                <span className="text-xl font-bold text-white">
                  {selectedProfile.zeroTo50Wired}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800">
                <span className="text-[10px] text-neutral-400 block">0 → 80% CHARGE</span>
                <span className="text-xl font-bold text-emerald-400">
                  {selectedProfile.zeroTo80Wired}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800">
                <span className="text-[10px] text-neutral-400 block">N52H MAGNET LOCK</span>
                <span className="text-xl font-bold text-white">
                  {selectedProfile.pullStrengthG}g
                </span>
              </div>
            </div>

            {/* Visual Charge Curve */}
            <div className="space-y-3 font-mono text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-neutral-400">
                    Wired USB-C 240W Kevlar Cord Efficiency
                  </span>
                  <span className="text-emerald-400 font-bold">94.8% GaN Conversion</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-neutral-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#E85D2A] to-emerald-400 w-[94%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-neutral-400">
                    Qi2 Magnetic Alignment ({selectedProfile.magnetRing})
                  </span>
                  <span className="text-white font-bold">
                    {selectedProfile.maxWirelessW}W Peak Wireless
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-neutral-800 overflow-hidden">
                  <div className="h-full bg-[#E85D2A] w-[86%]" />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <RiTempColdLine /> Active Cryo-Check: 34.2°C Max Surface Temp
              </span>
              <span className="flex items-center gap-1.5">
                <RiShieldCheckLine className="text-[#E85D2A]" /> Over-Voltage Protection Verified
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
