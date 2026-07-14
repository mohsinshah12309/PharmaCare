import { create } from 'zustand'

export const useCart = create((set, get) => ({
  items: JSON.parse(localStorage.getItem('cart')) || [],

  addItem: (product, unit) => {
    const { items } = get()
    const unitLabel = unit?.label || 'Standard'
    const unitPrice = unit?.price ?? product.price
    const cartId = `${product._id}__${unitLabel}`

    const existing = items.find((i) => i.cartId === cartId)
    const newItems = existing
      ? items.map((i) => (i.cartId === cartId ? { ...i, quantity: i.quantity + 1 } : i))
      : [
          ...items,
          {
            cartId,
            _id: product._id,
            name: product.name,
            image: product.image,
            unitLabel,
            price: unitPrice,
            quantity: 1,
          },
        ]

    localStorage.setItem('cart', JSON.stringify(newItems))
    set({ items: newItems })
  },

  removeItem: (cartId) => {
    const { items } = get()
    const newItems = items.filter((i) => i.cartId !== cartId)
    localStorage.setItem('cart', JSON.stringify(newItems))
    set({ items: newItems })
  },

  updateQuantity: (cartId, qty) => {
    const { items } = get()
    const newItems =
      qty <= 0
        ? items.filter((i) => i.cartId !== cartId)
        : items.map((i) => (i.cartId === cartId ? { ...i, quantity: qty } : i))
    localStorage.setItem('cart', JSON.stringify(newItems))
    set({ items: newItems })
  },

  clearCart: () => {
    localStorage.removeItem('cart')
    set({ items: [] })
  },

  getTotalPrice: () => get().items.reduce((t, i) => t + i.price * i.quantity, 0),
  getTotalItems: () => get().items.reduce((t, i) => t + i.quantity, 0),
}))