// src/context/AdminContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AdminContext = createContext();

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  products: [],
  categories: [
    { id: 1, name: 'Feeding & Drinking Systems', slug: 'feeding-drinking' },
    { id: 2, name: 'Ventilation Equipment', slug: 'ventilation' },
    { id: 3, name: 'Feed Additives', slug: 'feed-additives' },
    { id: 4, name: 'Cooling Systems', slug: 'cooling' },
    { id: 5, name: 'Control Systems', slug: 'control' }
  ],
  partners: [
    { id: 1, company: "CHORE TIME", country: "USA" },
    { id: 2, company: "HIRED HAND", country: "USA" },
    { id: 3, company: "HUTEK ASIA", country: "Thailand" },
    { id: 4, company: "MUYANG GROUP", country: "China" },
    { id: 5, company: "PERICOLI", country: "Italy" }
  ],
  loading: false,
  error: null
};

// Sample products data
const sampleProducts = [
  {
    id: 1,
    name: "China Feeding System",
    description: "Complete automated feeding system with precision control for optimal feed distribution.",
    category: "feeding-drinking",
    price: 15000,
    image: "/assets/images/china-feeding-system.jpg",
    specifications: {
      capacity: "500-1000 birds",
      material: "Galvanized Steel",
      power: "220V",
      warranty: "2 years"
    },
    features: [
      "Automated feed distribution",
      "Adjustable feeding schedules",
      "Low maintenance design",
      "Easy installation"
    ],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "Exhaust Fan 42\"",
    description: "High-efficiency exhaust fan for optimal poultry house ventilation and air circulation.",
    category: "ventilation",
    price: 850,
    image: "/assets/images/exhaust-fan-42.jpg",
    specifications: {
      diameter: "42 inches",
      airflow: "18000 CFM",
      power: "1.5 HP",
      material: "Aluminum blades"
    },
    features: [
      "High airflow capacity",
      "Energy efficient motor",
      "Weather resistant",
      "Low noise operation"
    ],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    name: "Vitamin & Mineral Premix",
    description: "Complete nutritional supplement providing essential vitamins and minerals for poultry health.",
    category: "feed-additives",
    price: 45,
    image: "/assets/images/vitamin-mineral-premix.jpg",
    specifications: {
      weight: "25 kg bag",
      shelf_life: "24 months",
      dosage: "2.5 kg per ton of feed",
      storage: "Cool, dry place"
    },
    features: [
      "Essential vitamins A, D, E, K",
      "Trace minerals included",
      "Improves egg production",
      "Enhances immunity"
    ],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

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
  ADD_CATEGORY: 'ADD_CATEGORY',
  UPDATE_CATEGORY: 'UPDATE_CATEGORY',
  DELETE_CATEGORY: 'DELETE_CATEGORY'
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
        products: state.products.filter(product => product.id !== action.payload),
        loading: false
      };
    
    case ACTIONS.ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload]
      };
    
    case ACTIONS.UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map(category => 
          category.id === action.payload.id ? action.payload : category
        )
      };
    
    case ACTIONS.DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(category => category.id !== action.payload)
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
    const savedAuth = localStorage.getItem('adminAuth');
    const savedProducts = localStorage.getItem('adminProducts');
    
    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: authData });
    }
    
    if (savedProducts) {
      const products = JSON.parse(savedProducts);
      dispatch({ type: ACTIONS.LOAD_PRODUCTS, payload: products });
    } else {
      // Load sample data if no saved products
      dispatch({ type: ACTIONS.LOAD_PRODUCTS, payload: sampleProducts });
      localStorage.setItem('adminProducts', JSON.stringify(sampleProducts));
    }
  }, []);

  // Save products to localStorage whenever products change
  useEffect(() => {
    if (state.products.length > 0) {
      localStorage.setItem('adminProducts', JSON.stringify(state.products));
    }
  }, [state.products]);

  // Admin actions
  const login = async (credentials) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    
    try {
      // Simple authentication (in real app, this would be an API call)
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        const user = {
          id: 1,
          username: 'admin',
          email: 'admin@rub.com',
          role: 'admin',
          name: 'R.U.B Admin'
        };
        
        localStorage.setItem('adminAuth', JSON.stringify(user));
        dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: user });
        return { success: true };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminAuth');
    dispatch({ type: ACTIONS.LOGOUT });
  };

  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    dispatch({ type: ACTIONS.ADD_PRODUCT, payload: newProduct });
    return newProduct;
  };

  const updateProduct = (id, productData) => {
    const updatedProduct = {
      ...productData,
      id,
      updatedAt: new Date().toISOString()
    };
    dispatch({ type: ACTIONS.UPDATE_PRODUCT, payload: updatedProduct });
    return updatedProduct;
  };

  const deleteProduct = (id) => {
    dispatch({ type: ACTIONS.DELETE_PRODUCT, payload: id });
  };

  const addCategory = (categoryData) => {
    const newCategory = {
      ...categoryData,
      id: Date.now()
    };
    dispatch({ type: ACTIONS.ADD_CATEGORY, payload: newCategory });
    return newCategory;
  };

  const updateCategory = (id, categoryData) => {
    const updatedCategory = { ...categoryData, id };
    dispatch({ type: ACTIONS.UPDATE_CATEGORY, payload: updatedCategory });
    return updatedCategory;
  };

  const deleteCategory = (id) => {
    dispatch({ type: ACTIONS.DELETE_CATEGORY, payload: id });
  };

  const value = {
    ...state,
    login,
    logout,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory
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