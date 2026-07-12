import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb+srv://user:password@cluster.mongodb.net/pharmacy'
    await mongoose.connect(uri)
    console.log('✓ MongoDB connected')
  } catch (err) {
    console.error('❌ MongoDB error:', err.message)
    process.exit(1)
  }
}
