import express from 'express'
import { auth } from '../middlewares/auth.js'
import { isAdmin } from '../middlewares/isAdmin.js'
import { upload } from '../middlewares/upload.js'
import { getAdminProducts, createProduct, updateProduct, deleteProduct } from '../controllers/admin/productAdmin.controller.js'
import { toggleStock, setStock } from '../controllers/admin/stock.controller.js'
import { getAdminCategories, createCategory, deleteCategory } from '../controllers/admin/categoryAdmin.controller.js'

const router = express.Router()

router.use(auth, isAdmin)

router.get('/products', getAdminProducts)
router.post('/products', upload.single('image'), createProduct)
router.put('/products/:id', upload.single('image'), updateProduct)
router.delete('/products/:id', deleteProduct)
router.patch('/products/:id/stock', toggleStock)
router.patch('/products/:id/stock/set', setStock)

router.get('/categories', getAdminCategories)
router.post('/categories', createCategory)
router.delete('/categories/:id', deleteCategory)

export default router