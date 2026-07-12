import Product from '../../models/Product.js'
import Category from '../../models/Category.js'
import { uploadImage } from '../../services/imageUpload.service.js'

export const getAdminProducts = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query
    const skip = (parseInt(page) - 1) * parseInt(limit)
    
    const products = await Product.find()
      .populate('category', 'name slug')
      .skip(skip)
      .limit(parseInt(limit))
    
    const total = await Product.countDocuments()
    res.json({ products, total, page: parseInt(page) })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, inStock } = req.body
    
    let imageUrl = null
    if (req.file) {
      const result = await uploadImage(req.file.buffer)
      imageUrl = result.secure_url
    }
    
    const cat = await Category.findOne({ slug: category })
    if (!cat) return res.status(400).json({ message: 'Category not found' })
    
    const product = await Product.create({
      name,
      description,
      price: parseFloat(price),
      category: cat._id,
      image: imageUrl,
      inStock: inStock === 'true'
    })
    
    res.status(201).json({ product })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, inStock } = req.body
    const product = await Product.findById(req.params.id)
    
    if (!product) return res.status(404).json({ message: 'Not found' })
    
    if (req.file) {
      const result = await uploadImage(req.file.buffer)
      product.image = result.secure_url
    }
    
    product.name = name || product.name
    product.description = description || product.description
    product.price = price || product.price
    product.inStock = inStock !== undefined ? inStock === 'true' : product.inStock
    
    if (category) {
      const cat = await Category.findOne({ slug: category })
      if (cat) product.category = cat._id
    }
    
    await product.save()
    res.json({ product })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(404).json({ message: 'Not found' })
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
