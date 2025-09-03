const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  type: {
    type: String,
    required: true,
    enum: ['image', 'video'],
    default: 'image'
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['equipment', 'installations', 'farms', 'products', 'videos', 'testimonials'],
    default: 'equipment'
  },
  media: [{
    url: {
      type: String,
      required: true
    },
    publicId: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['image', 'video'],
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    caption: {
      type: String,
      default: ''
    }
  }],
  thumbnail: {
    url: String,
    publicId: String
  },
  location: {
    type: String,
    trim: true
  },
  client: {
    type: String,
    trim: true
  },
  projectDate: {
    type: Date
  },
  tags: [{
    type: String,
    trim: true
  }],
  featured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  viewCount: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  sortOrder: {
    type: Number,
    default: 0
  },
  seoTitle: {
    type: String,
    trim: true
  },
  seoDescription: {
    type: String,
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Indexes for better performance
gallerySchema.index({ category: 1 });
gallerySchema.index({ type: 1 });
gallerySchema.index({ featured: 1 });
gallerySchema.index({ isActive: 1 });
gallerySchema.index({ createdAt: -1 });
gallerySchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Gallery', gallerySchema);