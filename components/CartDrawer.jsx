'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from './StoreContext'
import {
  RiCloseLine,
  RiAddLine,
  RiSubtractLine,
  RiArrowRightLine,
  RiShieldCheckLine,
  RiTruckLine,
} from 'react-icons/ri'

export default function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    updateQty,
    subtotal,
    discountPct,
    discountAmount,
    shippingCost,
    finalTotal,
    applyPromo,
  } = useStore()

  const [inputCode, setInputCode] = useState('')
  const [promoMsg, setPromoMsg] = useState('')

  const handlePromo = (e) => {
    e.preventDefault()
    const ok = applyPromo(inputCode)
    setPromoMsg(ok ? 'Promo code applied!' : 'Try VOLT15 or MAGSAFE20')
  }

  const freeShipRemaining = Math.max(0, 90 - subtotal)

  return (
    <AnimatePresence>
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/55 backdrop-blur-xs"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="relative z-10 w-full max-w-md bg-[#F4F1EA] h-full flex flex-col justify-between border-l border-[#D6CFC0] shadow-2xl"
          >
            {/* Header */}
            <div className="p-5 bg-white border-b border-[#DED8CA] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E85D2A] font-bold">
                  DISPATCH MANIFEST
                </span>
                <h3 className="text-lg font-display font-bold text-[#171717]">
                  Your Carry Bag ({cart.length} items)
                </h3>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 rounded-xl bg-[#F4F1EA] hover:bg-neutral-200 text-[#171717]"
              >
                <RiCloseLine className="text-xl" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            <div className="px-5 py-3 bg-[#171717] text-[#F4F1EA] text-xs font-mono flex items-center justify-between">
              <span className="flex items-center gap-2">
                <RiTruckLine className="text-[#E85D2A] text-base" />
                {freeShipRemaining === 0
                  ? 'UNLOCKED: FREE EXPRESS AIR DISPATCH'
                  : `Add $${freeShipRemaining} more for Free Express Shipping`}
              </span>
              <span className="text-[#E85D2A] font-bold">
                {Math.min(100, Math.round((subtotal / 90) * 100))}%
              </span>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <p className="font-display font-bold text-neutral-700 text-base">
                    Your gear bag is currently empty.
                  </p>
                  <p className="text-xs text-neutral-500">
                    Add a MagSafe case, 100W GaN station, or build a custom 4-piece kit.
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.color}`}
                    className="tactile-card rounded-2xl p-3.5 flex gap-3.5 items-center"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-18 h-18 rounded-xl object-cover border border-neutral-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-mono text-neutral-500">
                        {item.product.sku} • {item.deviceLabel}
                      </p>
                      <h4 className="text-xs font-bold text-[#171717] truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-[#E85D2A] font-mono font-semibold mt-0.5">
                        Finish: {item.color}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="inline-flex items-center gap-2 bg-[#F4F1EA] border border-[#DCD5C7] rounded-lg px-2 py-0.5">
                          <button
                            onClick={() => updateQty(item.product.id, item.color, -1)}
                            className="text-xs font-bold p-0.5"
                          >
                            <RiSubtractLine />
                          </button>
                          <span className="text-xs font-mono font-bold">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.product.id, item.color, 1)}
                            className="text-xs font-bold p-0.5"
                          >
                            <RiAddLine />
                          </button>
                        </div>
                        <span className="text-sm font-mono font-bold text-[#171717]">
                          ${item.product.price * item.qty}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            <div className="p-5 bg-white border-t border-[#DED8CA] space-y-4">
              <form onSubmit={handlePromo} className="flex gap-2">
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="Promo code (VOLT15)"
                  className="flex-1 px-3 py-2 rounded-xl bg-[#F4F1EA] border border-[#DCD5C7] text-xs font-mono uppercase focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#171717] text-white text-xs font-mono font-bold"
                >
                  Apply
                </button>
              </form>
              {promoMsg && (
                <p className="text-[11px] font-mono text-[#E85D2A]">{promoMsg}</p>
              )}

              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                {discountPct > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount ({discountPct}%)</span>
                    <span>-${discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-600">
                  <span>Express Courier</span>
                  <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost}`}</span>
                </div>
                <div className="pt-2 border-t border-neutral-200 flex justify-between text-base font-bold text-[#171717]">
                  <span>Total Due</span>
                  <span>${finalTotal}</span>
                </div>
              </div>

              <Link
                href="/track-order"
                onClick={() => setCartOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#E85D2A] hover:bg-[#d14e1f] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all"
              >
                <span>Proceed to Checkout &amp; Dispatch</span>
                <RiArrowRightLine className="text-base" />
              </Link>

              <p className="text-[11px] font-mono text-neutral-500 flex items-center justify-center gap-1.5">
                <RiShieldCheckLine className="text-emerald-600 text-sm" />
                Lifetime Aramid Structural Warranty Included
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
