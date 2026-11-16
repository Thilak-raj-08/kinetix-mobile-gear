'use client'

import { createContext, useContext, useState } from 'react'
import { PRODUCTS, DEVICES } from '@/data/productsData'

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [selectedDevice, setSelectedDevice] = useState('iphone-16-pro')
  const [cart, setCart] = useState([
    {
      product: PRODUCTS[0],
      color: PRODUCTS[0].colors[0].name,
      deviceLabel: 'iPhone 16 Pro / Pro Max',
      qty: 1,
    },
    {
      product: PRODUCTS[4],
      color: PRODUCTS[4].colors[0].name,
      deviceLabel: 'Universal USB-C',
      qty: 1,
    },
  ])
  const [cartOpen, setCartOpen] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [discountPct, setDiscountPct] = useState(0)
  const [orders, setOrders] = useState([
    {
      id: 'VG-89412',
      date: '16 Nov 2026, 14:10',
      customer: 'Jeyarajan Thilakraj',
      city: 'Jaffna / Colombo Express',
      total: 142,
      status: 'Out for Delivery',
      step: 3,
      items: [
        'Monolith Aramid & Full-Grain MagSafe Case (Alpine Sage)',
        'HyperCore 100W 3-Port GaN III Pro Station',
      ],
    },
  ])

  const addToCart = (product, colorName, customDevice) => {
    const chosenColor = colorName || product.colors[0].name
    const devObj = DEVICES.find((d) => d.id === (customDevice || selectedDevice))
    const deviceLabel = devObj ? devObj.label : 'Universal Qi2 / USB-C'

    setCart((prev) => {
      const idx = prev.findIndex(
        (item) => item.product.id === product.id && item.color === chosenColor
      )
      if (idx > -1) {
        const updated = [...prev]
        updated[idx] = { ...updated[idx], qty: updated[idx].qty + 1 }
        return updated
      }
      return [...prev, { product, color: chosenColor, deviceLabel, qty: 1 }]
    })
    setCartOpen(true)
  }

  const updateQty = (productId, color, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.color === color) {
            return { ...item, qty: Math.max(0, item.qty + delta) }
          }
          return item
        })
        .filter((item) => item.qty > 0)
    )
  }

  const applyPromo = (code) => {
    const clean = code.trim().toUpperCase()
    setPromoCode(clean)
    if (clean === 'VOLT15' || clean === 'MAGSAFE20') {
      setDiscountPct(clean === 'MAGSAFE20' ? 20 : 15)
      return true
    }
    return false
  }

  const placeOrder = (shippingInfo) => {
    const newOrder = {
      id: `VG-${Math.floor(89420 + Math.random() * 500)}`,
      date: 'Just now (Live Dispatch)',
      customer: shippingInfo.name || 'Express Customer',
      city: `${shippingInfo.city || 'Colombo'}, ${shippingInfo.country || 'Sri Lanka'}`,
      total: finalTotal,
      status: 'Quality Bench Tested & Packed',
      step: 2,
      items: cart.map((c) => `${c.product.name} (${c.color}) × ${c.qty}`),
    }
    setOrders((prev) => [newOrder, ...prev])
    setCart([])
    return newOrder.id
  }

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0)
  const discountAmount = Math.round((subtotal * discountPct) / 100)
  const shippingCost = subtotal >= 90 || subtotal === 0 ? 0 : 8
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingCost)
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0)

  return (
    <StoreContext.Provider
      value={{
        products: PRODUCTS,
        devices: DEVICES,
        selectedDevice,
        setSelectedDevice,
        cart,
        cartOpen,
        setCartOpen,
        addToCart,
        updateQty,
        promoCode,
        discountPct,
        applyPromo,
        subtotal,
        discountAmount,
        shippingCost,
        finalTotal,
        totalCount,
        orders,
        placeOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  return ctx
}
