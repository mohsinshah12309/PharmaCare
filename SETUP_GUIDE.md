# PharmaCare Setup Guide

Complete step-by-step guide to setup and run the pharmacy e-commerce application.

## 📦 Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB Atlas account (free tier available)
- Cloudinary account (for image upload)

## 🔧 Step 1: Environment Setup

### MongoDB Atlas
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/pharmacy`)

### Cloudinary
1. Go to https://cloudinary.com
2. Sign up for free account
3. Get your credentials:
   - Cloud Name
   - API Key
   - API Secret

## 📝 Step 2: Configure Environment Variables

### Backend (.env)
File: `server/.env`

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pharmacy?retryWrites=true&w=majority
JWT_SECRET=your_random_secret_key_here_min_32_chars
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (.env)
File: `client/.env`

```env
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Step 3: Installation

### Option A: Install All at Once
```bash
cd pharmacy
npm run install-all
```

### Option B: Install Separately
```bash
# Backend
cd pharmacy/server
npm install

# Frontend (in new terminal)
cd pharmacy/client
npm install
```

## 🌱 Step 4: Seed Database

Initialize database with default categories:

```bash
cd pharmacy
npm run seed
```

This creates 6 default product categories in MongoDB.

## ▶️ Step 5: Start Development Servers

### Option A: Both Servers
```bash
cd pharmacy
npm run dev
```

### Option B: Separate Terminals

**Terminal 1 - Backend:**
```bash
cd pharmacy/server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd pharmacy/client
npm run dev
```

### Expected Output

**Backend:**
```
✓ MongoDB connected
🚀 Server running on http://localhost:5000
```

**Frontend:**
```
  VITE v5.0.8  ready in 234 ms
  ➜  Local:   http://localhost:5173/
```

## 🔍 Step 6: Verify Installation

1. Open browser and go to: http://localhost:5173
2. Check backend health: http://localhost:5000/api/health
3. You should see:
   ```json
   {"status":"OK","timestamp":"2024-07-02T..."}
   ```

## 👤 Step 7: Create Admin User

1. Go to http://localhost:5173/register
2. Create account with:
   - Name: Admin User
   - Email: admin@pharmacy.com
   - Password: Admin123!

3. Connect to MongoDB Atlas
4. Find user in `users` collection
5. Change `role` from `"user"` to `"admin"`
6. Login with admin credentials

## 🛍️ Step 8: Test Application

### Customer Features
- ✅ Register & Login
- ✅ Browse Products (http://localhost:5173/category/medicine)
- ✅ View Product Details
- ✅ Add to Cart
- ✅ Checkout
- ✅ View Order Confirmation

### Admin Features
- ✅ Login with admin account
- ✅ Visit http://localhost:5173/admin/dashboard
- ✅ Add new product
- ✅ Manage product stock

## 🐛 Troubleshooting

### MongoDB Connection Error
```
❌ MongoDB error: connect ECONNREFUSED
```
**Solution:** 
- Check MONGODB_URI in .env
- Ensure MongoDB Atlas IP whitelist includes your IP
- Check username/password

### CORS Error
```
❌ Access to XMLHttpRequest blocked by CORS
```
**Solution:** 
- Backend CORS is enabled by default
- Check API_URL in frontend .env

### Image Upload Fails
```
❌ Error uploading image
```
**Solution:**
- Verify Cloudinary credentials in .env
- Check API key and secret
- Ensure Cloudinary account is active

### Port Already in Use
```
❌ EADDRINUSE: address already in use :::5000
```
**Solution:**
- Change PORT in server/.env
- Or kill process: `lsof -ti:5000 | xargs kill -9` (Mac/Linux)

## 📚 API Testing

Use Postman or cURL to test:

### Register
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

### Login
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

### Get Products
```bash
GET http://localhost:5000/api/products?category=medicine&page=1&limit=20
```

## 🚢 Deployment

### Frontend (Vercel)
```bash
cd client
npm run build
# Deploy dist folder
```

### Backend (Heroku)
```bash
cd server
npm run build
# Deploy with Procfile
```

## 📞 Support

- Check logs for detailed errors
- Verify all environment variables
- Ensure both servers are running
- Check MongoDB connection

## ✅ Checklist

- [ ] Node.js installed
- [ ] MongoDB Atlas configured
- [ ] Cloudinary account created
- [ ] .env files configured
- [ ] Dependencies installed
- [ ] Database seeded
- [ ] Both servers running
- [ ] Admin user created
- [ ] Able to login
- [ ] Can browse products

---

**Ready to build amazing! 🎉**
