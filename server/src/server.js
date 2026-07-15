import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import 'express-async-errors'
import http from 'http'
import { Server } from 'socket.io'
import { connectDB } from './config/db.js'
import authRoutes from './routes/auth.routes.js'
import productRoutes from './routes/product.routes.js'
import adminRoutes from './routes/admin.routes.js'
import { errorHandler } from './middlewares/errorHandler.js'
import orderRoutes from './routes/order.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const httpServer = http.createServer(app)

export const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
})

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id)

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id)
  })
})

app.get('/', (req, res) => {
  res.json({ message: 'PharmaCare API is running', status: 'ok' })
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ limit: '50mb', extended: true }))

connectDB()

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() })
})

app.use(errorHandler)

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})