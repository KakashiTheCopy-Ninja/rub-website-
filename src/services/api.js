// API service for backend communication
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Get auth token from localStorage
  getAuthToken() {
    return localStorage.getItem('adminToken');
  }

  // Set auth token
  setAuthToken(token) {
    localStorage.setItem('adminToken', token);
  }

  // Remove auth token
  removeAuthToken() {
    localStorage.removeItem('adminToken');
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getAuthToken();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    // Add auth token if available
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Don't set Content-Type for FormData
    if (options.body instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication methods
  async login(credentials) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    
    if (data.token) {
      this.setAuthToken(data.token);
    }
    
    return data;
  }

  async register(userData) {
    return await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async getCurrentUser() {
    return await this.request('/auth/me');
  }

  async updateProfile(profileData) {
    return await this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  }

  async changePassword(passwordData) {
    return await this.request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(passwordData)
    });
  }

  // Product methods
  async getProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return await this.request(`/products${queryString ? `?${queryString}` : ''}`);
  }

  async getProduct(id) {
    return await this.request(`/products/${id}`);
  }

  async createProduct(productData) {
    return await this.request('/products', {
      method: 'POST',
      body: productData // FormData
    });
  }

  async updateProduct(id, productData) {
    return await this.request(`/products/${id}`, {
      method: 'PUT',
      body: productData // FormData
    });
  }

  async deleteProduct(id) {
    return await this.request(`/products/${id}`, {
      method: 'DELETE'
    });
  }

  async getProductsByCategory(slug) {
    return await this.request(`/products/category/${slug}`);
  }

  // Gallery methods
  async getGallery(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return await this.request(`/gallery${queryString ? `?${queryString}` : ''}`);
  }

  async getGalleryItem(id) {
    return await this.request(`/gallery/${id}`);
  }

  async createGalleryItem(galleryData) {
    return await this.request('/gallery', {
      method: 'POST',
      body: galleryData // FormData
    });
  }

  async updateGalleryItem(id, galleryData) {
    return await this.request(`/gallery/${id}`, {
      method: 'PUT',
      body: galleryData // FormData
    });
  }

  async deleteGalleryItem(id) {
    return await this.request(`/gallery/${id}`, {
      method: 'DELETE'
    });
  }

  async getGalleryStats() {
    return await this.request('/gallery/categories/stats');
  }

  // Category methods
  async getCategories(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return await this.request(`/categories${queryString ? `?${queryString}` : ''}`);
  }

  async getCategory(id) {
    return await this.request(`/categories/${id}`);
  }

  async createCategory(categoryData) {
    return await this.request('/categories', {
      method: 'POST',
      body: categoryData // FormData
    });
  }

  async updateCategory(id, categoryData) {
    return await this.request(`/categories/${id}`, {
      method: 'PUT',
      body: categoryData // FormData
    });
  }

  async deleteCategory(id) {
    return await this.request(`/categories/${id}`, {
      method: 'DELETE'
    });
  }

  async getCategoryBySlug(slug) {
    return await this.request(`/categories/slug/${slug}`);
  }

  // Health check
  async healthCheck() {
    return await this.request('/health');
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;