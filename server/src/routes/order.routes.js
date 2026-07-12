import express from 'express'
import { auth } from '../middlewares/auth.js'
import { createOrder, getMyOrders } from '../controllers/order.controller.js'

const router = express.Router()

router.use(auth)
router.post('/', createOrder)
router.get('/my-orders', getMyOrders)

export default router