const mongoose = require('mongoose');
const User = require('../models/User');
const Category = require('../models/Category');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB Atlas');

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });
    
    if (!existingAdmin) {
      // Create admin user
      const adminUser = new User({
        name: 'RUB Admin',
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: 'admin'
      });

      await adminUser.save();
      console.log('✅ Admin user created successfully');
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    // Create default categories if they don't exist
    const defaultCategories = [
      {
        name: 'Feeding & Drinking Systems',
        description: 'Complete automated feeding and drinking solutions',
        icon: 'FiSettings',
        color: '#2B5D41',
        sortOrder: 1
      },
      {
        name: 'Ventilation Equipment',
        description: 'Advanced ventilation systems for optimal environment control',
        icon: 'FiWind',
        color: '#1B4332',
        sortOrder: 2
      },
      {
        name: 'Feed Additives',
        description: 'Premium quality feed additives for enhanced nutrition',
        icon: 'FiPackage',
        color: '#F4D03F',
        sortOrder: 3
      },
      {
        name: 'Cooling Systems',
        description: 'Temperature control and cooling solutions',
        icon: 'FiThermometer',
        color: '#0EA5E9',
        sortOrder: 4
      },
      {
        name: 'Control Systems',
        description: 'Automated monitoring and control equipment',
        icon: 'FiTool',
        color: '#8B5CF6',
        sortOrder: 5
      }
    ];

    const adminUser = await User.findOne({ email: process.env.ADMIN_EMAIL });

    for (const categoryData of defaultCategories) {
      const existingCategory = await Category.findOne({ name: categoryData.name });
      
      if (!existingCategory) {
        const category = new Category({
          ...categoryData,
          createdBy: adminUser._id
        });
        
        await category.save();
        console.log(`✅ Category "${categoryData.name}" created`);
      } else {
        console.log(`ℹ️  Category "${categoryData.name}" already exists`);
      }
    }

    console.log('🎉 Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedAdmin();