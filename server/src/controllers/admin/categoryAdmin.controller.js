import Category from '../../models/Category.js'
import Product from '../../models/Product.js'

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export const getAdminCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 })
    res.json({ categories })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body
    if (!name) return res.status(400).json({ message: 'Name is required' })

    const slug = slugify(name)

    const existing = await Category.findOne({ slug })
    if (existing) {
      return res.status(400).json({ message: 'Category already exists' })
    }

    const category = await Category.create({ name, slug, description })
    res.status(201).json({ category })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
    if (!category) return res.status(404).json({ message: 'Not found' })

    const productCount = await Product.countDocuments({ category: category._id })
    if (productCount > 0) {
      return res.status(400).json({
        message: `Cannot delete: ${productCount} product(s) still use this category`,
      })
    }

    await Category.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}