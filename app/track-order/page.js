'use client'

import { useState } from 'react'
import { useStore } from '@/components/StoreContext'
import {
  RiTruckLine,
  RiCheckLine,
  RiShieldCheckLine,
  RiMapPin2Line,
  RiCheckboxCircleFill,
} from 'react-icons/ri'

const STAGES = [
  'Order Confirmed',
  'Bench Tested & Packed',
  'Out for Delivery',
  'Delivered',
]

export default function TrackOrderAndCheckoutPage() {
  const { cart, subtotal, discountAmount, shippingCost, finalTotal, orders, placeOrder } =
    useStore()

  const [shipping, setShipping] = useState({
    name: '',
    email: '',
    city: 'Colombo',
    country: 'Sri Lanka',
    address: '',
  })
  const [justPlacedId, setJustPlacedId] = useState(null)

  const handleCheckout = (e) => {
    e.preventDefault()
    if (cart.length === 0) return
    const id = placeOrder(shipping)
    setJustPlacedId(id)
    setShipping({ name: '', email: '', city: 'Colombo', country: 'Sri Lanka', address: '' })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Express Checkout Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 tactile-card rounded-3xl p-6 sm:p-8 space-y-5">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#E85D2A] font-bold">
              MODULE 05 • EXPRESS AIR COURIER CHECKOUT
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#171717] mt-1">
              Dispatch Your Mobile Gear Order
            </h1>
          </div>

          {justPlacedId && (
            <div className="p-4 rounded-2xl bg-emerald-950 text-emerald-300 border border-emerald-700 font-mono text-xs flex items-center justify-between">
              <span>
                ✓ Order #{justPlacedId} confirmed &amp; queued for Quality Bench Testing below!
              </span>
              <RiCheckboxCircleFill className="text-lg text-emerald-400" />
            </div>
          )}

          <form onSubmit={handleCheckout} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-neutral-500 mb-1">FULL NAME *</label>
                <input
                  type="text"
                  required
                  value={shipping.name}
                  onChange={(e) => setShipping({ ...shipping, name: e.target.value })}
                  placeholder="Jeyarajan Thilakraj"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F1EA] border border-[#DCD5C7] focus:outline-none focus:border-[#E85D2A]"
                />
              </div>
              <div>
                <label className="block font-mono text-neutral-500 mb-1">EMAIL ADDRESS *</label>
                <input
                  type="email"
                  required
                  value={shipping.email}
                  onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                  placeholder="thilakraj@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F1EA] border border-[#DCD5C7] focus:outline-none focus:border-[#E85D2A]"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-neutral-500 mb-1">
                STREET DELIVERY ADDRESS *
              </label>
              <input
                type="text"
                required
                value={shipping.address}
                onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                placeholder="No. 42, Point Pedro Road, Jaffna / Colombo"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F1EA] border border-[#DCD5C7] focus:outline-none focus:border-[#E85D2A]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-neutral-500 mb-1">CITY</label>
                <input
                  type="text"
                  value={shipping.city}
                  onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F1EA] border border-[#DCD5C7]"
                />
              </div>
              <div>
                <label className="block font-mono text-neutral-500 mb-1">COUNTRY</label>
                <input
                  type="text"
                  value={shipping.country}
                  onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F1EA] border border-[#DCD5C7]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={cart.length === 0}
              className="w-full py-4 rounded-xl bg-[#E85D2A] hover:bg-[#d14e1f] disabled:bg-neutral-300 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all"
            >
              {cart.length === 0
                ? 'Your Bag is Empty — Add Gear from Shop'
                : `Authorize Express Order ($${finalTotal})`}
            </button>
          </form>
        </div>

        {/* Right: Order Manifest Summary */}
        <div className="lg:col-span-5 tactile-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-mono uppercase text-[#E85D2A] font-bold">
              CURRENT BAG MANIFEST
            </span>
            <h3 className="text-xl font-display font-bold text-[#171717] mt-1">
              Items Ready for Dispatch ({cart.length})
            </h3>

            <div className="mt-4 space-y-2.5">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.color}`}
                  className="p-3 rounded-xl bg-[#F4F1EA] flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-bold text-[#171717]">{item.product.name}</p>
                    <p className="font-mono text-[11px] text-neutral-500">
                      {item.color} • Qty {item.qty}
                    </p>
                  </div>
                  <span className="font-mono font-bold">${item.product.price * item.qty}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-200 space-y-1.5 text-xs font-mono">
            <div className="flex justify-between text-neutral-600">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Promo Savings</span>
                <span>-${discountAmount}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-600">
              <span>DHL Express Courier</span>
              <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost}`}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-[#171717] pt-2 border-t border-neutral-200">
              <span>Total</span>
              <span>${finalTotal}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Order Dispatch Telemetry Tracker */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#E85D2A] font-bold">
            LIVE COURIER TELEMETRY
          </span>
          <h2 className="text-2xl font-display font-bold text-[#171717]">
            Active Shipments &amp; Serialized Quality Logs ({orders.length})
          </h2>
        </div>

        <div className="space-y-4">
          {orders.map((ord) => (
            <div key={ord.id} className="tactile-card rounded-3xl p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-[#E85D2A]">
                    WAYBILL #{ord.id}
                  </span>
                  <h3 className="text-lg font-display font-bold text-[#171717]">
                    {ord.customer} — {ord.city}
                  </h3>
                  <p className="text-xs font-mono text-neutral-500">{ord.date}</p>
                </div>
                <div className="text-right font-mono">
                  <span className="px-3 py-1 rounded-full bg-[#171717] text-white text-xs font-bold">
                    {ord.status}
                  </span>
                  <p className="text-sm font-bold text-[#171717] mt-1">Paid: ${ord.total}</p>
                </div>
              </div>

              {/* 4-Stage Progress Stepper */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {STAGES.map((stageName, index) => {
                  const done = index + 1 <= ord.step
                  return (
                    <div
                      key={stageName}
                      className={`p-3 rounded-xl border text-xs font-mono flex items-center gap-2 ${
                        done
                          ? 'bg-[#171717] text-white border-[#171717]'
                          : 'bg-[#F4F1EA] text-neutral-400 border-neutral-200'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                          done ? 'bg-[#E85D2A] text-white' : 'bg-neutral-300 text-neutral-600'
                        }`}
                      >
                        {done ? <RiCheckLine /> : index + 1}
                      </span>
                      <span className="truncate">{stageName}</span>
                    </div>
                  )
                })}
              </div>

              <div className="text-xs font-mono text-neutral-600 flex flex-wrap gap-2">
                {ord.items.map((it, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-[#F4F1EA] border border-[#DCD5C7]"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
