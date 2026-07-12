import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  originalPrice: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  image: String,
  inStock: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Product', productSchema)
