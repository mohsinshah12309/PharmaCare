import Product from '../models/Product.js'
import Category from '../models/Category.js'
import { chatWithCatalog } from '../services/ai.service.js'

export const getProducts = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 20 } = req.query
    
    let query = {}
    if (category) {
      const cat = await Category.findOne({ slug: category })
      if (cat) query.category = cat._id
    }
    if (search) query.name = { $regex: search, $options: 'i' }
    
    const skip = (parseInt(page) - 1) * parseInt(limit)
    const products = await Product.find(query)
      .populate('category', 'name slug')
      .skip(skip)
      .limit(parseInt(limit))
    
    const total = await Product.countDocuments(query)
    res.json({ products, total, page: parseInt(page), limit: parseInt(limit) })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name slug')
    if (!product) return res.status(404).json({ message: 'Not found' })
    res.json({ product })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    res.json({ categories })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const aiChat = async (req, res) => {
  try {
    const { message } = req.body
    if (!message || !message.trim()) {
      return res.status(400).json({ message: 'Message is required' })
    }
    const result = await chatWithCatalog(message)
    res.json(result)
  } catch (err) {
    console.error('AI chat error:', err.message)
    res.status(500).json({ message: 'AI assistant is temporarily unavailable' })
  }
}