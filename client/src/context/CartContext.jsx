import { create } from 'zustand'
export const useCart = create((set, get) => ({
  items: JSON.parse(localStorage.getItem('cart')) || [],
  addItem: (product) => {
    const { items } = get()
    const existing = items.find(i => i._id === product._id)
    const newItems = existing ? items.map(i => i._id === product._id ? {...i, quantity: i.quantity + 1} : i) : [...items, { ...product, quantity: 1 }]
    localStorage.setItem('cart', JSON.stringify(newItems))
    set({ items: newItems })
  },
  removeItem: (id) => {
    const { items } = get()
    const newItems = items.filter(i => i._id !== id)
    localStorage.setItem('cart', JSON.stringify(newItems))
    set({ items: newItems })
  },
  updateQuantity: (id, qty) => {
    const { items } = get()
    const newItems = qty <= 0 ? items.filter(i => i._id !== id) : items.map(i => i._id === id ? {...i, quantity: qty} : i)
    localStorage.setItem('cart', JSON.stringify(newItems))
    set({ items: newItems })
  },
  clearCart: () => {
    localStorage.removeItem('cart')
    set({ items: [] })
  },
  getTotalPrice: () => get().items.reduce((t, i) => t + (i.price * i.quantity), 0),
  getTotalItems: () => get().items.reduce((t, i) => t + i.quantity, 0),
}))
