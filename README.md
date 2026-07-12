# PharmaCare - Full Stack E-Commerce Application

A complete MERN stack pharmacy e-commerce platform with admin panel.

## 📁 Project Structure

```
pharmacy/
├── server/              # Node.js Express backend
│   ├── src/
│   │   ├── config/      # Database & Cloudinary config
│   │   ├── models/      # MongoDB schemas
│   │   ├── controllers/ # Business logic
│   │   ├── routes/      # API endpoints
│   │   ├── middlewares/ # Auth, upload, error handling
│   │   ├── services/    # Image upload service
│   │   ├── utils/       # JWT token generation
│   │   └── seed/        # Database seeding
│   ├── package.json
│   ├── .env
│   └── src/server.js    # Entry point
│
└── client/              # React Vite frontend
    ├── src/
    │   ├── pages/       # Page components
    │   ├── components/  # Reusable components
    │   ├── services/    # API calls
    │   ├── context/     # Auth & Cart state
    │   ├── routes/      # Protected routes
    │   ├── layouts/     # Layout components
    │   └── App.jsx      # Main routing
    ├── package.json
    ├── index.html
    └── vite.config.js
```

## 🚀 Quick Start

### 1. Install All Dependencies
```bash
npm run install-all
```

### 2. Configure Environment

**Backend (.env)**
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pharmacy
JWT_SECRET=your_jwt_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Frontend (.env)** - Already configured
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Seed Database (Optional)
```bash
npm run seed
```

### 4. Start Both Servers
```bash
npm run dev
```

- Backend: http://localhost:5000
- Frontend: http://localhost:5173

## 📋 API Routes

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `GET /api/products/categories` - Get all categories

### Admin (Protected)
- `GET /api/admin/products` - Get admin products
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `PATCH /api/admin/products/:id/stock` - Toggle stock
- `PATCH /api/admin/products/:id/stock/set` - Set stock status

## 🎯 Features

### Customer Features
- User Registration & Login
- Browse Products by Category
- Product Search
- Shopping Cart (Persistent)
- Checkout Process
- Order Confirmation
- Responsive Design

### Admin Features
- Admin Dashboard with Stats
- Add New Products
- Edit Products
- Delete Products
- Manage Stock Status
- View All Products

### Technical Features
- JWT Authentication
- Protected Routes
- Role-based Access Control
- Image Upload to Cloudinary
- MongoDB Database
- CORS Enabled
- Error Handling

## 💻 Tech Stack

### Frontend
- React 18
- React Router v6
- Vite
- Tailwind CSS
- Zustand (State Management)
- Axios (HTTP Client)
- Font Awesome (Icons)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (Authentication)
- Bcrypt (Password Hashing)
- Multer (File Upload)
- Cloudinary (Image Storage)

## 🔐 Environment Variables

Create `.env` files in both server and client directories with the provided keys.

### Database
- MongoDB Atlas URI required

### Authentication
- JWT Secret for token signing

### Image Storage
- Cloudinary API credentials for image uploads

## 📝 Default Categories

1. Medicines
2. Baby & Mother Care
3. Nutrition & Supplements
4. Foods & Beverages
5. Medical Devices & Support
6. Personal Care

## 🛠️ Scripts

```bash
npm run dev              # Run both frontend and backend
npm run server           # Run backend only
npm run client           # Run frontend only
npm run seed             # Seed database with categories
npm run install-all      # Install all dependencies
```

## 🔄 Workflow

1. **User Registration** → Create account
2. **Browse Products** → Search or browse by category
3. **Add to Cart** → Add products (persists)
4. **Checkout** → Provide shipping details
5. **Order Confirmation** → Order placed
6. **Admin Panel** → Manage inventory

## 🎨 Styling

- Tailwind CSS via CDN
- Green color scheme (#10b981)
- Mobile-first responsive design
- Smooth animations

## 📦 Deployment

Ready for deployment to Heroku, Vercel, or any cloud platform.

- Backend: Node.js compatible servers
- Frontend: Static hosting (Vercel, Netlify)

## 🤝 Support

For issues or questions, check the documentation or contact the development team.

---

**Version:** 1.0.0  
**License:** MIT  
**Status:** Production Ready ✅
