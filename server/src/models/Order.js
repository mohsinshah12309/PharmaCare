import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ productId: mongoose.Schema.Types.ObjectId, quantity: Number, price: Number }],
  shippingAddress: String,
  paymentMethod: String,
  status: { type: String, enum: ['pending', 'confirmed', 'shipped', 'delivered'], default: 'pending' },
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Order', orderSchema)
