import Product from '../../models/Product.js'

export const toggleStock = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Not found' })
    
    product.inStock = !product.inStock
    await product.save()
    res.json({ product })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const setStock = async (req, res) => {
  try {
    const { inStock } = req.body
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { inStock },
      { new: true }
    )
    if (!product) return res.status(404).json({ message: 'Not found' })
    res.json({ product })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
