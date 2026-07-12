import dotenv from 'dotenv'
import { connectDB } from '../config/db.js'
import User from '../models/User.js'

dotenv.config()

const email = process.argv[2]

const makeAdmin = async () => {
  if (!email) {
    console.error('Usage: node src/seed/makeAdmin.js you@example.com')
    process.exit(1)
  }
  try {
    await connectDB()
    const user = await User.findOneAndUpdate(
      { email },
      { role: 'admin' },
      { new: true }
    )
    if (!user) {
      console.log('❌ No user found with that email')
    } else {
      console.log(`✓ ${user.email} is now admin`)
    }
    process.exit(0)
  } catch (err) {
    console.error('Failed:', err.message)
    process.exit(1)
  }
}

makeAdmin()