# R.U.B Associates Backend API

## Setup Instructions

### 1. MongoDB Atlas Setup
1. Create a MongoDB Atlas account at https://www.mongodb.com/atlas
2. Create a new cluster
3. Create a database user with read/write permissions
4. Get your connection string and update the `.env` file

### 2. Cloudinary Setup (for image/video uploads)
1. Create a Cloudinary account at https://cloudinary.com
2. Get your cloud name, API key, and API secret from the dashboard
3. Update the `.env` file with your Cloudinary credentials

### 3. Environment Variables
Copy the `.env` file and update the following variables:

```env
# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/rub-associates

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# JWT
JWT_SECRET=your-super-secret-key
```

### 4. Install Dependencies
```bash
cd backend
npm install
```

### 5. Seed Database
```bash
npm run seed
```

### 6. Start Development Server
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new admin user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/change-password` - Change password

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)
- `GET /api/products/category/:slug` - Get products by category

### Gallery
- `GET /api/gallery` - Get all gallery items (with filtering)
- `GET /api/gallery/:id` - Get single gallery item
- `POST /api/gallery` - Create new gallery item (Admin)
- `PUT /api/gallery/:id` - Update gallery item (Admin)
- `DELETE /api/gallery/:id` - Delete gallery item (Admin)
- `GET /api/gallery/categories/stats` - Get gallery statistics

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create new category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)
- `GET /api/categories/slug/:slug` - Get category by slug

## Features

### Security
- JWT authentication
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation and sanitization

### File Upload
- Cloudinary integration for images and videos
- Automatic image optimization
- Video processing and thumbnails
- File type validation
- Size limits (5MB for images, 100MB for videos)

### Database
- MongoDB Atlas integration
- Mongoose ODM with validation
- Indexes for performance
- Aggregation pipelines for statistics

### API Features
- RESTful API design
- Comprehensive error handling
- Request validation
- Pagination support
- Search and filtering
- Sorting capabilities

## Default Admin Credentials
- Email: admin@rubassociates.com
- Password: admin123

**Important:** Change these credentials in production!