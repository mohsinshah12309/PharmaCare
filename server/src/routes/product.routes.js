import express from 'express'
import { getProducts, getProduct, getCategories } from '../controllers/product.controller.js'

const router = express.Router()

router.get('/', getProducts)
router.get('/categories', getCategories)
router.get('/:id', getProduct)

export default router
