import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import { PageLoader } from '../common/Loading';

const AdminRoutes = () => {
  const { isAuthenticated, loading } = useAdmin();

  if (loading) {
    return <PageLoader message="Loading admin panel..." />;
  }

  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <AdminLogin />
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          isAuthenticated ? <AdminDashboard /> : <Navigate to="/admin/login" replace />
        } 
      />
      <Route 
        path="/" 
        element={<Navigate to={isAuthenticated ? "/admin/dashboard" : "/admin/login"} replace />} 
      />
    </Routes>
  );
};

export default AdminRoutes;