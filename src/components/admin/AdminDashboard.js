// src/components/admin/AdminDashboard.js
import React, { useState } from 'react';
import { 
  FiGrid, 
  FiPackage, 
  FiImage,
  FiSettings, 
  FiLogOut,
  FiPlus,
  FiEye,
  FiEdit,
  FiTrash2,
  FiSearch,
  FiFilter
} from 'react-icons/fi';
import { useAdmin } from '../../context/AdminContext';
import ProductForm from './ProductForm';
import GalleryForm from './GalleryForm';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { 
    user, 
    products, 
    categories,
    gallery,
    logout, 
    deleteProduct,
    addProduct,
    updateProduct,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem
  } = useAdmin();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [showProductForm, setShowProductForm] = useState(false);
  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingGalleryItem, setEditingGalleryItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleLogout = () => {
    logout();
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleAddGalleryItem = () => {
    setEditingGalleryItem(null);
    setShowGalleryForm(true);
  };

  const handleEditGalleryItem = (item) => {
    setEditingGalleryItem(item);
    setShowGalleryForm(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
      } catch (error) {
        alert('Error deleting product: ' + error.message);
      }
    }
  };

  const handleDeleteGalleryItem = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this gallery item?')) {
      try {
        await deleteGalleryItem(itemId);
      } catch (error) {
        alert('Error deleting gallery item: ' + error.message);
      }
    }
  };

  const handleSaveProduct = async (productData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, productData);
      } else {
        await addProduct(productData);
      }
    } catch (error) {
      console.error('Error saving product:', error);
      throw error;
    }
  };

  const handleSaveGalleryItem = async (galleryData) => {
    try {
      if (editingGalleryItem) {
        await updateGalleryItem(editingGalleryItem._id, galleryData);
      } else {
        await addGalleryItem(galleryData);
      }
    } catch (error) {
      console.error('Error saving gallery item:', error);
      throw error;
    }
  };
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           (product.category && product.category.slug === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const stats = {
    totalProducts: products.length,
    totalCategories: categories.length,
    totalGalleryItems: gallery.length,
    inStockProducts: products.filter(p => p.inStock).length,
    outOfStockProducts: products.filter(p => !p.inStock).length
  };

  const renderOverview = () => (
    <div className="overview-content">
      <div className="welcome-section">
        <h2>Welcome back, {user?.name || 'Admin'}!</h2>
        <p>Here's what's happening with your products today.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#1E40AF15' }}>
            <FiPackage size={24} style={{ color: '#1E40AF' }} />
          </div>
          <div className="stat-info">
            <h3>{stats.totalProducts}</h3>
            <p>Total Products</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#10B98115' }}>
            <FiImage size={24} style={{ color: '#10B981' }} />
          </div>
          <div className="stat-info">
            <h3>{stats.totalGalleryItems}</h3>
            <p>Gallery Items</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#10B98115' }}>
            <FiEye size={24} style={{ color: '#10B981' }} />
          </div>
          <div className="stat-info">
            <h3>{stats.inStockProducts}</h3>
            <p>In Stock</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#F5946515' }}>
            <FiSettings size={24} style={{ color: '#F59E0B' }} />
          </div>
          <div className="stat-info">
            <h3>{stats.outOfStockProducts}</h3>
            <p>Out of Stock</p>
          </div>
        </div>
      </div>

      <div className="recent-products">
        <h3>Recent Items</h3>
        <div className="product-list">
          {[...products, ...gallery].slice(-5).map(item => (
            <div key={item._id} className="product-item">
              <div className="product-image">
                <img 
                  src={item.images?.[0]?.url || item.media?.[0]?.url || '/assets/images/product-placeholder.jpg'} 
                  alt={item.name || item.title} 
                />
              </div>
              <div className="product-info">
                <h4>{item.name || item.title}</h4>
                <p>{item.description.substring(0, 100)}...</p>
                {item.price && <span className="product-price">${item.price}</span>}
              </div>
              <div className="product-status">
                <span className={`status-badge ${item.inStock !== false ? 'in-stock' : 'out-of-stock'}`}>
                  {item.type ? item.type.charAt(0).toUpperCase() + item.type.slice(1) : 
                   (item.inStock ? 'In Stock' : 'Out of Stock')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="products-content">
      <div className="products-header">
        <h2>Product Management</h2>
        <button className="add-product-btn" onClick={handleAddProduct}>
          <FiPlus size={18} />
          Add Product
        </button>
      </div>

      <div className="products-filters">
        <div className="search-box">
          <FiSearch className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-box">
          <FiFilter className="filter-icon" size={18} />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category._id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product._id} className="product-card">
            <div className="product-image">
              <img 
                src={product.images?.[0]?.url || '/assets/images/product-placeholder.jpg'} 
                alt={product.name}
                onError={(e) => {
                  e.target.src = '/assets/images/product-placeholder.jpg';
                }}
              />
            </div>
            
            <div className="product-details">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">
                {product.description.substring(0, 100)}...
              </p>
              
              <div className="product-meta">
                <span className="product-price">${product.price}</span>
                <span className={`status-badge ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              
              <div className="product-category">
                {product.category?.name || 'Uncategorized'}
              </div>
            </div>

            <div className="product-actions">
              <button 
                className="action-btn view-btn"
                title="View Product"
              >
                <FiEye size={16} />
              </button>
              <button 
                className="action-btn edit-btn"
                onClick={() => handleEditProduct(product)}
                title="Edit Product"
              >
                <FiEdit size={16} />
              </button>
              <button 
                className="action-btn delete-btn"
                onClick={() => handleDeleteProduct(product._id)}
                title="Delete Product"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          <FiPackage size={48} />
          <h3>No products found</h3>
          <p>Try adjusting your search or filter criteria, or add a new product.</p>
          <button className="add-product-btn" onClick={handleAddProduct}>
            <FiPlus size={18} />
            Add Your First Product
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <div className="admin-logo">
            <div className="logo-icon">RUB</div>
            <span className="logo-text">Admin</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <FiGrid size={20} />
            <span>Overview</span>
          </button>
          
          <button
            className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <FiPackage size={20} />
            <span>Products</span>
          </button>
          
          <button
            className={`nav-item ${activeTab === 'gallery' ? 'active' : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            <FiImage size={20} />
            <span>Gallery</span>
          </button>
          
          <button
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <FiSettings size={20} />
            <span>Settings</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">{user?.name?.charAt(0) || 'A'}</div>
            <div className="user-details">
              <span className="user-name">{user?.name || 'Admin'}</span>
              <span className="user-role">{user?.role || 'Administrator'}</span>
            </div>
          </div>
          
          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      <div className="admin-main">
        <div className="main-header">
          <h1>Dashboard</h1>
          <div className="header-actions">
            <span className="current-date">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </div>

        <div className="main-content">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'products' && renderProducts()}
          {activeTab === 'gallery' && renderGallery()}
          {activeTab === 'settings' && <div>Settings (Coming Soon)</div>}
        </div>
      </div>

      {showProductForm && (
        <ProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onClose={() => {
            setShowProductForm(false);
            setEditingProduct(null);
          }}
        />
      )}

      {showGalleryForm && (
        <GalleryForm
          galleryItem={editingGalleryItem}
          onSave={handleSaveGalleryItem}
          onClose={() => {
            setShowGalleryForm(false);
            setEditingGalleryItem(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;