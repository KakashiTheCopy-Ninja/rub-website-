const express = require('express');
const { body, validationResult, param } = require('express-validator');
const Gallery = require('../models/Gallery');
const { auth, adminAuth } = require('../middleware/auth');
const { uploadMedia, handleUploadError } = require('../middleware/upload');
const { deleteFromCloudinary } = require('../config/cloudinary');

const router = express.Router();

// @route   GET /api/gallery
// @desc    Get all gallery items with filtering and pagination
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      type,
      search,
      featured,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = { isActive: true };
    
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    if (type && type !== 'all') {
      filter.type = type;
    }
    
    if (search) {
      filter.$text = { $search: search };
    }
    
    if (featured !== undefined) {
      filter.featured = featured === 'true';
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const galleryItems = await Gallery.find(filter)
      .populate('createdBy', 'name')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    // Get total count for pagination
    const total = await Gallery.countDocuments(filter);

    res.json({
      gallery: galleryItems,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get gallery error:', error);
    res.status(500).json({ message: 'Server error while fetching gallery items' });
  }
});

// @route   GET /api/gallery/:id
// @desc    Get single gallery item by ID
// @access  Public
router.get('/:id', [
  param('id').isMongoId().withMessage('Invalid gallery item ID')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const galleryItem = await Gallery.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');

    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    // Increment view count
    galleryItem.viewCount += 1;
    await galleryItem.save();

    res.json({ galleryItem });
  } catch (error) {
    console.error('Get gallery item error:', error);
    res.status(500).json({ message: 'Server error while fetching gallery item' });
  }
});

// @route   POST /api/gallery
// @desc    Create new gallery item
// @access  Private (Admin)
router.post('/', [
  adminAuth,
  uploadMedia.array('media', 20),
  body('title')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Title must be between 2 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
  body('category')
    .isIn(['equipment', 'installations', 'farms', 'products', 'videos', 'testimonials'])
    .withMessage('Invalid category'),
  body('type')
    .isIn(['image', 'video'])
    .withMessage('Type must be either image or video')
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
      title,
      description,
      type,
      category,
      location,
      client,
      projectDate,
      tags,
      featured = false,
      seoTitle,
      seoDescription
    } = req.body;

    // Process uploaded media files
    const media = req.files ? req.files.map(file => ({
      url: file.path,
      publicId: file.filename,
      type: file.mimetype.startsWith('video/') ? 'video' : 'image',
      alt: title
    })) : [];

    if (media.length === 0) {
      return res.status(400).json({ message: 'At least one media file is required' });
    }

    // Set thumbnail (first image or video thumbnail)
    const thumbnail = media[0];

    // Parse JSON fields
    const parsedTags = tags ? 
      (typeof tags === 'string' ? JSON.parse(tags) : tags) : [];

    // Create gallery item
    const galleryItem = new Gallery({
      title,
      description,
      type,
      category,
      media,
      thumbnail,
      location,
      client,
      projectDate: projectDate ? new Date(projectDate) : undefined,
      tags: parsedTags,
      featured,
      seoTitle,
      seoDescription,
      createdBy: req.user._id
    });

    await galleryItem.save();

    // Populate the response
    await galleryItem.populate('createdBy', 'name email');

    res.status(201).json({
      message: 'Gallery item created successfully',
      galleryItem
    });
  } catch (error) {
    console.error('Create gallery item error:', error);
    res.status(500).json({ message: 'Server error while creating gallery item' });
  }
});

// @route   PUT /api/gallery/:id
// @desc    Update gallery item
// @access  Private (Admin)
router.put('/:id', [
  adminAuth,
  param('id').isMongoId().withMessage('Invalid gallery item ID'),
  uploadMedia.array('media', 20),
  body('title')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Title must be between 2 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters')
], handleUploadError, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const galleryItem = await Gallery.findById(req.params.id);
    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    // Handle media updates
    let updatedMedia = [...galleryItem.media];
    
    // Add new media if uploaded
    if (req.files && req.files.length > 0) {
      const newMedia = req.files.map(file => ({
        url: file.path,
        publicId: file.filename,
        type: file.mimetype.startsWith('video/') ? 'video' : 'image',
        alt: req.body.title || galleryItem.title
      }));
      updatedMedia = [...updatedMedia, ...newMedia];
    }

    // Handle media deletions if specified
    if (req.body.deleteMedia) {
      const deleteMediaIds = JSON.parse(req.body.deleteMedia);
      for (const publicId of deleteMediaIds) {
        const mediaItem = updatedMedia.find(m => m.publicId === publicId);
        if (mediaItem) {
          await deleteFromCloudinary(publicId, mediaItem.type);
          updatedMedia = updatedMedia.filter(m => m.publicId !== publicId);
        }
      }
    }

    // Parse JSON fields
    const tags = req.body.tags ? 
      (typeof req.body.tags === 'string' ? JSON.parse(req.body.tags) : req.body.tags) : undefined;

    // Update gallery item
    const updateData = {
      ...req.body,
      media: updatedMedia,
      updatedBy: req.user._id
    };

    if (tags) updateData.tags = tags;
    if (req.body.projectDate) updateData.projectDate = new Date(req.body.projectDate);

    // Update thumbnail if media changed
    if (updatedMedia.length > 0) {
      updateData.thumbnail = updatedMedia[0];
    }

    const updatedGalleryItem = await Gallery.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    )
    .populate('createdBy', 'name email')
    .populate('updatedBy', 'name email');

    res.json({
      message: 'Gallery item updated successfully',
      galleryItem: updatedGalleryItem
    });
  } catch (error) {
    console.error('Update gallery item error:', error);
    res.status(500).json({ message: 'Server error while updating gallery item' });
  }
});

// @route   DELETE /api/gallery/:id
// @desc    Delete gallery item
// @access  Private (Admin)
router.delete('/:id', [
  adminAuth,
  param('id').isMongoId().withMessage('Invalid gallery item ID')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const galleryItem = await Gallery.findById(req.params.id);
    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    // Delete media files from Cloudinary
    for (const mediaItem of galleryItem.media) {
      try {
        await deleteFromCloudinary(mediaItem.publicId, mediaItem.type);
      } catch (error) {
        console.error('Error deleting media from Cloudinary:', error);
      }
    }

    // Delete thumbnail if exists
    if (galleryItem.thumbnail && galleryItem.thumbnail.publicId) {
      try {
        await deleteFromCloudinary(galleryItem.thumbnail.publicId);
      } catch (error) {
        console.error('Error deleting thumbnail from Cloudinary:', error);
      }
    }

    // Delete gallery item
    await Gallery.findByIdAndDelete(req.params.id);

    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Delete gallery item error:', error);
    res.status(500).json({ message: 'Server error while deleting gallery item' });
  }
});

// @route   GET /api/gallery/categories/stats
// @desc    Get gallery statistics by category
// @access  Public
router.get('/categories/stats', async (req, res) => {
  try {
    const stats = await Gallery.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          images: {
            $sum: {
              $cond: [{ $eq: ['$type', 'image'] }, 1, 0]
            }
          },
          videos: {
            $sum: {
              $cond: [{ $eq: ['$type', 'video'] }, 1, 0]
            }
          }
        }
      },
      {
        $project: {
          category: '$_id',
          count: 1,
          images: 1,
          videos: 1,
          _id: 0
        }
      }
    ]);

    res.json({ stats });
  } catch (error) {
    console.error('Get gallery stats error:', error);
    res.status(500).json({ message: 'Server error while fetching gallery statistics' });
  }
});

module.exports = router;