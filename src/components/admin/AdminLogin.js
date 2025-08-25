// src/components/admin/AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiLock, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';
import { useAdmin } from '../../context/AdminContext';
import './AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAdmin();
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setLoginError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    if (!formData.username || !formData.password) {
      setLoginError('Please fill in all fields');
      return;
    }

    const result = await login(formData);
    
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setLoginError(result.error || 'Login failed');
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-container">
        <motion.div
          className="login-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo Section */}
          <div className="login-header">
            <div className="login-logo">
              <div className="logo-icon">RUB</div>
            </div>
            <h1 className="login-title">Admin Portal</h1>
            <p className="login-subtitle">Sign in to manage your products and content</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="login-form">
            {(loginError || error) && (
              <div className="error-message">
                <FiAlertCircle size={16} />
                <span>{loginError || error}</span>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <div className="input-wrapper">
                <FiUser className="input-icon" size={18} />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your username"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-wrapper">
                <FiLock className="input-icon" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your password"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={`login-button ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="demo-credentials">
            <h4>Demo Credentials:</h4>
            <p><strong>Username:</strong> admin</p>
            <p><strong>Password:</strong> admin123</p>
          </div>
        </motion.div>

        {/* Background Elements */}
        <div className="background-elements">
          <div className="bg-circle bg-circle-1"></div>
          <div className="bg-circle bg-circle-2"></div>
          <div className="bg-circle bg-circle-3"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;