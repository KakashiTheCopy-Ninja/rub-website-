const express = require('express');
const { body, validationResult, param } = require('express-validator');
const Product = require('../models/Product');
const Category = require('../models/Category');
const { auth, adminAuth } = require('../middleware/auth');
const { uploadImages, handleUploadError } = require('../middleware/upload');
const { deleteFromCloudinary } = require('../config/cloudinary');

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products with filtering and pagination
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      search,
      inStock,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      featured
    } = req.query;

    // Build filter object
    const filter = { isActive: true };
    
    if (category) {
      const categoryDoc = await Category.findOne({ slug: category });
      if (categoryDoc) {
        filter.category = categoryDoc._id;
      }
    }
    
    if (search) {
      filter.$text = { $search: search };
    }
    
    if (inStock !== undefined) {
      filter.inStock = inStock === 'true';
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const products = await Product.find(filter)
      .populate('category', 'name slug color')
      .populate('createdBy', 'name')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    // Get total count for pagination
    const total = await Product.countDocuments(filter);

    res.json({
      products,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error while fetching products' });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', [
  param('id').isMongoId().withMessage('Invalid product ID')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const product = await Product.findById(req.params.id)
      .populate('category', 'name slug color description')
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ product });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Server error while fetching product' });
  }
});

// @route   POST /api/products
// @desc    Create new product
// @access  Private (Admin)
router.post('/', [
  adminAuth,
  uploadImages.array('images', 10),
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Product name must be between 2 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('category')
    .isMongoId()
    .withMessage('Invalid category ID'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('origin')
    .trim()
    .notEmpty()
    .withMessage('Product origin is required')
], handleUploadError, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const {
      name,
      description,
      category,
      price,
      currency = 'PKR',
      origin,
      manufacturer,
      inStock = true,
      stockQuantity = 0,
      specifications,
      features,
      tags,
      seoTitle,
      seoDescription
    } = req.body;

    // Verify category exists
    const categoryDoc = await Category.findById(category);
    if (!categoryDoc) {
      return res.status(400).json({ message: 'Category not found' });
    }

    // Process uploaded images
    const images = req.files ? req.files.map(file => ({
      url: file.path,
      publicId: file.filename,
      alt: name
    })) : [];

    // Parse JSON fields if they're strings
    const parsedSpecifications = specifications ? 
      (typeof specifications === 'string' ? JSON.parse(specifications) : specifications) : [];
    const parsedFeatures = features ? 
      (typeof features === 'string' ? JSON.parse(features) : features) : [];
    const parsedTags = tags ? 
      (typeof tags === 'string' ? JSON.parse(tags) : tags) : [];

    // Create product
    const product = new Product({
      name,
      description,
      category,
      price,
      currency,
      origin,
      manufacturer,
      inStock,
      stockQuantity,
      images,
      specifications: parsedSpecifications,
      features: parsedFeatures,
      tags: parsedTags,
      seoTitle,
      seoDescription,
      createdBy: req.user._id
    });

    await product.save();

    // Update category product count
    await Category.findByIdAndUpdate(category, {
      $inc: { productCount: 1 }
    });

    // Populate the response
    await product.populate('category', 'name slug color');
    await product.populate('createdBy', 'name email');

    res.status(201).json({
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error while creating product' });
  }
});

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Private (Admin)
router.put('/:id', [
  adminAuth,
  param('id').isMongoId().withMessage('Invalid product ID'),
  uploadImages.array('images', 10),
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Product name must be between 2 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number')
], handleUploadError, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Handle image updates
    let updatedImages = [...product.images];
    
    // Add new images if uploaded
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => ({
        url: file.path,
        publicId: file.filename,
        alt: req.body.name || product.name
      }));
      updatedImages = [...updatedImages, ...newImages];
    }

    // Handle image deletions if specified
    if (req.body.deleteImages) {
      const deleteImageIds = JSON.parse(req.body.deleteImages);
      for (const publicId of deleteImageIds) {
        await deleteFromCloudinary(publicId);
        updatedImages = updatedImages.filter(img => img.publicId !== publicId);
      }
    }

    // Parse JSON fields
    const specifications = req.body.specifications ? 
      (typeof req.body.specifications === 'string' ? JSON.parse(req.body.specifications) : req.body.specifications) : undefined;
    const features = req.body.features ? 
      (typeof req.body.features === 'string' ? JSON.parse(req.body.features) : req.body.features) : undefined;
    const tags = req.body.tags ? 
      (typeof req.body.tags === 'string' ? JSON.parse(req.body.tags) : req.body.tags) : undefined;

    // Update product
    const updateData = {
      ...req.body,
      images: updatedImages,
      updatedBy: req.user._id
    };

    if (specifications) updateData.specifications = specifications;
    if (features) updateData.features = features;
    if (tags) updateData.tags = tags;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    )
    .populate('category', 'name slug color')
    .populate('createdBy', 'name email')
    .populate('updatedBy', 'name email');

    res.json({
      message: 'Product updated successfully',
      product: updatedProduct
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error while updating product' });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Private (Admin)
router.delete('/:id', [
  adminAuth,
  param('id').isMongoId().withMessage('Invalid product ID')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete images from Cloudinary
    for (const image of product.images) {
      try {
        await deleteFromCloudinary(image.publicId);
      } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
      }
    }

    // Delete product
    await Product.findByIdAndDelete(req.params.id);

    // Update category product count
    await Category.findByIdAndUpdate(product.category, {
      $inc: { productCount: -1 }
    });

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error while deleting product' });
  }
});

// @route   GET /api/products/category/:slug
// @desc    Get products by category slug
// @access  Public
router.get('/category/:slug', async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const products = await Product.find({ 
      category: category._id, 
      isActive: true 
    })
    .populate('category', 'name slug color')
    .sort({ createdAt: -1 });

    res.json({
      category,
      products
    });
  } catch (error) {
    console.error('Get products by category error:', error);
    res.status(500).json({ message: 'Server error while fetching products' });
  }
});

module.exports = router;