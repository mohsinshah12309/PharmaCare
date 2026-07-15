import express from 'express'
import { getProducts, getProduct, getCategories, aiChat } from '../controllers/product.controller.js'
import { getProducts, getProduct, getCategories } from '../controllers/product.controller.js'

const router = express.Router()

router.get('/', getProducts)
router.get('/categories', getCategories)
router.post('/ai-chat', aiChat)
router.get('/:id', getProduct)

export default router
