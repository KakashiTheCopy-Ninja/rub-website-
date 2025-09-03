const express = require('express');
const { body, validationResult, param } = require('express-validator');
const Category = require('../models/Category');
const Product = require('../models/Product');
const { auth, adminAuth } = require('../middleware/auth');
const { uploadImages, handleUploadError } = require('../middleware/upload');
const { deleteFromCloudinary } = require('../config/cloudinary');

const router = express.Router();

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { active = 'true', sortBy = 'sortOrder' } = req.query;
    
    const filter = {};
    if (active !== 'all') {
      filter.isActive = active === 'true';
    }

    const categories = await Category.find(filter)
      .populate('createdBy', 'name')
      .sort({ [sortBy]: 1 })
      .lean();

    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error while fetching categories' });
  }
});

// @route   GET /api/categories/:id
// @desc    Get single category by ID
// @access  Public
router.get('/:id', [
  param('id').isMongoId().withMessage('Invalid category ID')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const category = await Category.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ category });
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({ message: 'Server error while fetching category' });
  }
});

// @route   POST /api/categories
// @desc    Create new category
// @access  Private (Admin)
router.post('/', [
  adminAuth,
  uploadImages.single('image'),
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Category name must be between 2 and 50 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('color')
    .optional()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage('Please enter a valid hex color')
], handleUploadError, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { name, description, icon, color, sortOrder = 0 } = req.body;

    // Check if category with same name exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category with this name already exists' });
    }

    // Process uploaded image
    const image = req.file ? {
      url: req.file.path,
      publicId: req.file.filename
    } : undefined;

    // Create category
    const category = new Category({
      name,
      description,
      icon,
      color,
      image,
      sortOrder,
      createdBy: req.user._id
    });

    await category.save();

    // Populate the response
    await category.populate('createdBy', 'name email');

    res.status(201).json({
      message: 'Category created successfully',
      category
    });
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ message: 'Server error while creating category' });
  }
});

// @route   PUT /api/categories/:id
// @desc    Update category
// @access  Private (Admin)
router.put('/:id', [
  adminAuth,
  param('id').isMongoId().withMessage('Invalid category ID'),
  uploadImages.single('image'),
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Category name must be between 2 and 50 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('color')
    .optional()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage('Please enter a valid hex color')
], handleUploadError, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Handle image update
    let updatedImage = category.image;
    
    if (req.file) {
      // Delete old image if exists
      if (category.image && category.image.publicId) {
        try {
          await deleteFromCloudinary(category.image.publicId);
        } catch (error) {
          console.error('Error deleting old category image:', error);
        }
      }
      
      updatedImage = {
        url: req.file.path,
        publicId: req.file.filename
      };
    }

    // Update category
    const updateData = {
      ...req.body,
      image: updatedImage,
      updatedBy: req.user._id
    };

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    )
    .populate('createdBy', 'name email');

    res.json({
      message: 'Category updated successfully',
      category: updatedCategory
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Category name already exists' });
    }
    console.error('Update category error:', error);
    res.status(500).json({ message: 'Server error while updating category' });
  }
});

// @route   DELETE /api/categories/:id
// @desc    Delete category
// @access  Private (Admin)
router.delete('/:id', [
  adminAuth,
  param('id').isMongoId().withMessage('Invalid category ID')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check if category has products
    const productCount = await Product.countDocuments({ category: req.params.id });
    if (productCount > 0) {
      return res.status(400).json({ 
        message: `Cannot delete category. It has ${productCount} products associated with it.` 
      });
    }

    // Delete category image from Cloudinary
    if (category.image && category.image.publicId) {
      try {
        await deleteFromCloudinary(category.image.publicId);
      } catch (error) {
        console.error('Error deleting category image from Cloudinary:', error);
      }
    }

    // Delete category
    await Category.findByIdAndDelete(req.params.id);

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ message: 'Server error while deleting category' });
  }
});

// @route   GET /api/categories/slug/:slug
// @desc    Get category by slug
// @access  Public
router.get('/slug/:slug', async (req, res) => {
  try {
    const category = await Category.findOne({ 
      slug: req.params.slug, 
      isActive: true 
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ category });
  } catch (error) {
    console.error('Get category by slug error:', error);
    res.status(500).json({ message: 'Server error while fetching category' });
  }
});

module.exports = router;