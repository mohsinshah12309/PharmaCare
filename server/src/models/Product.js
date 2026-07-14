import mongoose from 'mongoose'

const unitSchema = new mongoose.Schema({
  label: { type: String, required: true },   // e.g. "1 Tablet", "Pack of 6"
  price: { type: Number, required: true },
}, { _id: false })

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },   // kept as fallback/default price
  originalPrice: Number,
  units: { type: [unitSchema], default: [] }, // optional — if empty, product sells as single unit at `price`
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  image: String,
  inStock: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Product', productSchema)