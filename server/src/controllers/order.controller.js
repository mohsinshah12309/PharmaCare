import Order from '../models/Order.js'
import Product from '../models/Product.js'
import { appendOrderToExcel } from '../services/excel.service.js'
import { sendOrderEmail } from '../services/email.service.js'
import { appendOrderToGoogleSheet } from '../services/googleSheets.service.js'

export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, name, phone, city, postal, totalAmount } = req.body

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' })
    }

    const orderNumber = 'ORD-' + Date.now()

    const order = await Order.create({
      orderNumber,
      user: req.user.id,
      items: items.map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
        price: i.price,
      })),
      shippingAddress,
      paymentMethod,
      totalAmount,
    })

    // Build full item details for Excel + email (name, description, price)
    const detailedItems = await Promise.all(
      items.map(async (i) => {
        const product = await Product.findById(i.productId)
        return {
          name: product?.name || 'Unknown',
          description: product?.description || '',
          price: i.price,
          quantity: i.quantity,
        }
      })
    )

    const customer = { name, phone, address: shippingAddress, city, postal }

    // Write to Excel (don't let failures block the order response)
try {
  await appendOrderToExcel({ orderNumber, customer, items: detailedItems, totalAmount })
} catch (e) {
  console.error('Excel write failed:', e.message)
}

// Write to Google Sheets
try {
  await appendOrderToGoogleSheet({ orderNumber, customer, items: detailedItems, totalAmount })
} catch (e) {
  console.error('Google Sheets write failed:', e.message)
}

    // Send email (don't let failures block the order response)
    try {
      await sendOrderEmail({ orderNumber, customer, items: detailedItems, totalAmount })
    } catch (e) {
      console.error('Email send failed:', e.message)
    }

    res.status(201).json({ order })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 })
    res.json({ orders })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}