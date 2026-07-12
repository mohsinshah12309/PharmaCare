import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { connectDB } from '../config/db.js'
import Category from '../models/Category.js'

dotenv.config()

const categories = [
  { name: 'Medicines', slug: 'medicine', description: 'Prescription and OTC medicines' },
  { name: 'Baby & Mother Care', slug: 'baby-mother-care', description: 'Baby care products' },
  { name: 'Nutrition & Supplements', slug: 'nutrition-supplements', description: 'Vitamins and supplements' },
  { name: 'Foods & Beverages', slug: 'foods-beverages', description: 'Health foods' },
  { name: 'Medical Devices & Support', slug: 'devices-support', description: 'Medical equipment' },
  { name: 'Personal Care', slug: 'personal-care', description: 'Personal care products' }
]

const seedCategories = async () => {
  try {
    await connectDB()
    await Category.deleteMany({})
    await Category.insertMany(categories)
    console.log('✓ Categories seeded successfully')
    process.exit(0)
  } catch (err) {
    console.error('❌ Seeding failed:', err.message)
    process.exit(1)
  }
}

seedCategories()
