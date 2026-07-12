import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import 'express-async-errors'
import { connectDB } from './config/db.js'
import authRoutes from './routes/auth.routes.js'
import productRoutes from './routes/product.routes.js'
import adminRoutes from './routes/admin.routes.js'
import { errorHandler } from './middlewares/errorHandler.js'

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// Connect Database
connectDB()

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/admin', adminRoutes)

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Error Handler Middleware
app.use(errorHandler)

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'API Route not found' })
})

export default app
