import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../utilities/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, adminOnly = false }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // For demo purposes, allow access to account and admin pages without authentication
  const isDemoRoute = location.pathname === '/account' || location.pathname.startsWith('/admin');

  if (isLoading && !isDemoRoute) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user && !isDemoRoute) {
    // Redirect to sign in, but remember where they wanted to go
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (adminOnly && user?.role !== 'admin' && !isDemoRoute) {
    // If trying to access admin area but not admin, redirect to home
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;