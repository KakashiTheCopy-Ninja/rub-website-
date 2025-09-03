// src/context/AdminContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import apiService from '../../services/api';

const AdminContext = createContext();

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  products: [],
  categories: [],
  gallery: [],
  loading: false,
  error: null
};


// Action types
const ACTIONS = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  LOAD_PRODUCTS: 'LOAD_PRODUCTS',
  ADD_PRODUCT: 'ADD_PRODUCT',
  UPDATE_PRODUCT: 'UPDATE_PRODUCT',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
  LOAD_CATEGORIES: 'LOAD_CATEGORIES',
  LOAD_GALLERY: 'LOAD_GALLERY',
  ADD_GALLERY_ITEM: 'ADD_GALLERY_ITEM',
  UPDATE_GALLERY_ITEM: 'UPDATE_GALLERY_ITEM',
  DELETE_GALLERY_ITEM: 'DELETE_GALLERY_ITEM'
};

// Reducer
const adminReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null
      };
    
    case ACTIONS.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    
    case ACTIONS.LOAD_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false
      };
    
    case ACTIONS.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
        loading: false
      };
    
    case ACTIONS.UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map(product => 
          product.id === action.payload.id ? action.payload : product
        ),
        loading: false
      };
    
    case ACTIONS.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product => product._id !== action.payload),
        loading: false
      };
    
    case ACTIONS.LOAD_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        loading: false
      };
    
    case ACTIONS.LOAD_GALLERY:
      return {
        ...state,
        gallery: action.payload,
        loading: false
      };
    
    case ACTIONS.ADD_GALLERY_ITEM:
      return {
        ...state,
        gallery: [...state.gallery, action.payload],
        loading: false
      };
    
    case ACTIONS.UPDATE_GALLERY_ITEM:
      return {
        ...state,
        gallery: state.gallery.map(item => 
          item._id === action.payload._id ? action.payload : item
        ),
        loading: false
      };
    
    case ACTIONS.DELETE_GALLERY_ITEM:
      return {
        ...state,
        gallery: state.gallery.filter(item => item._id !== action.payload),
        loading: false
      };
    
    default:
      return state;
  }
};

// Admin Provider Component
export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  // Load initial data
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = apiService.getAuthToken();
    if (token) {
      try {
        dispatch({ type: ACTIONS.SET_LOADING, payload: true });
        const userData = await apiService.getCurrentUser();
        dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: userData.user });
        await loadInitialData();
      } catch (error) {
        console.error('Auth check failed:', error);
        apiService.removeAuthToken();
        dispatch({ type: ACTIONS.SET_ERROR, payload: 'Session expired' });
      }
    }
    dispatch({ type: ACTIONS.SET_LOADING, payload: false });
  };

  const loadInitialData = async () => {
    try {
      const [productsData, categoriesData, galleryData] = await Promise.all([
        apiService.getProducts(),
        apiService.getCategories(),
        apiService.getGallery()
      ]);
      
      dispatch({ type: ACTIONS.LOAD_PRODUCTS, payload: productsData.products || [] });
      dispatch({ type: ACTIONS.LOAD_CATEGORIES, payload: categoriesData.categories || [] });
      dispatch({ type: ACTIONS.LOAD_GALLERY, payload: galleryData.gallery || [] });
    } catch (error) {
      console.error('Error loading initial data:', error);
      dispatch({ type: ACTIONS.SET_ERROR, payload: 'Failed to load data' });
    }
  };

  // Admin actions
  const login = async (credentials) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    
    try {
      const loginData = await apiService.login({
        email: credentials.username, // Using username as email
        password: credentials.password
      });
      
      dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: loginData.user });
      await loadInitialData();
      return { success: true };
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    apiService.removeAuthToken();
    dispatch({ type: ACTIONS.LOGOUT });
  };

  const addProduct = async (productData) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const result = await apiService.createProduct(productData);
      dispatch({ type: ACTIONS.ADD_PRODUCT, payload: result.product });
      return result.product;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const result = await apiService.updateProduct(id, productData);
      dispatch({ type: ACTIONS.UPDATE_PRODUCT, payload: result.product });
      return result.product;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  const deleteProduct = async (id) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      await apiService.deleteProduct(id);
      dispatch({ type: ACTIONS.DELETE_PRODUCT, payload: id });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  const addGalleryItem = async (galleryData) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const result = await apiService.createGalleryItem(galleryData);
      dispatch({ type: ACTIONS.ADD_GALLERY_ITEM, payload: result.galleryItem });
      return result.galleryItem;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  const updateGalleryItem = async (id, galleryData) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const result = await apiService.updateGalleryItem(id, galleryData);
      dispatch({ type: ACTIONS.UPDATE_GALLERY_ITEM, payload: result.galleryItem });
      return result.galleryItem;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  const deleteGalleryItem = async (id) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      await apiService.deleteGalleryItem(id);
      dispatch({ type: ACTIONS.DELETE_GALLERY_ITEM, payload: id });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  const value = {
    ...state,
    login,
    logout,
    addProduct,
    updateProduct,
    deleteProduct,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

// Hook to use admin context
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};