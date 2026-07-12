# PharmaCare Frontend

React + Vite Frontend for Pharmacy E-Commerce Application

## Stack
- React 18
- Vite
- React Router v6
- Zustand (State Management)
- Axios (HTTP Client)
- Tailwind CSS (Styling)

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create `.env` file (already included):
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Start Development Server
```bash
npm run dev
```
Server runs on http://localhost:5173

## Project Structure
```
src/
├── pages/              # All page components
│   ├── admin/         # Admin panel pages
│   ├── Home.jsx
│   ├── Medicine.jsx
│   ├── ProductDetails.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── ...
├── components/        # Reusable components
│   ├── common/       # Navbar, Footer
│   ├── product/      # ProductCard, ProductGrid
│   └── admin/        # AdminSidebar
├── services/         # API calls
├── context/          # Auth & Cart context
├── routes/           # Protected routes
├── layouts/          # Main & Admin layouts
├── App.jsx           # Main routing
└── main.jsx          # Entry point
```

## Key Features

- **User Authentication**: Register, Login, Logout
- **Shopping Cart**: Add/Remove items, Persistent storage
- **Product Browsing**: Categories, Search, Details
- **Checkout**: Shipping form, Payment options (COD/Card)
- **Admin Panel**: Dashboard, Add/Edit products, Manage stock
- **Responsive Design**: Mobile-first with Tailwind CSS

## Authentication
- Uses localStorage to persist tokens & user data
- Auto-logout on 401 response
- Protected routes with ProtectedRoute & AdminRoute wrappers

## API Integration
- All API calls use axios with auth interceptors
- Base URL from .env (VITE_API_URL)
- Auto-attach Bearer token to all requests

## Pages
- `/` - Home
- `/category/medicine` - Product category
- `/product/:id` - Product details
- `/cart` - Shopping cart
- `/checkout` - Checkout form (protected)
- `/login` - Login page
- `/register` - Registration page
- `/admin/dashboard` - Admin dashboard (admin only)
- `/admin/add-product` - Add new product (admin only)
- `/admin/manage-stock` - Manage product stock (admin only)

## Styling
- Tailwind CSS via CDN
- Font Awesome icons via CDN
- Custom animations & utilities in index.css
- Green color scheme (primary: #10b981)

## Notes
- Cart data persists via localStorage
- Auth token saved to localStorage
- All admin routes require admin role
- Cart persists across sessions
- Mock payment processing (2s delay)

