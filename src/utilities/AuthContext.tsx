import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as authService from '../services/authService';
import { registerLogoutCallback } from '../services/api';
import { User } from './types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (payload: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
  }) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = () => {
    setUser(null);
    authService.clearToken();
    localStorage.removeItem('sparkvybzent_user');
    // Force redirect to signin when token invalid/expired
    if (window.location.pathname !== '/signin') {
      window.location.href = '/signin';
    }
  };

  // register logout callback so api layer can clear session on 401
  useEffect(() => {
    registerLogoutCallback(logout);
  }, []);

  useEffect(() => {
    // attempt to restore session if token exists
    const init = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          const me = await authService.getCurrentUser();
          setUser(me);
          localStorage.setItem('sparkvybzent_user', JSON.stringify(me));
        } catch (e) {
          // token invalid or expired
          logout();
        }
      }
      setIsLoading(false);
    };
    init();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const resp = await authService.signin({ email, password });
      authService.storeToken(resp.token);
      const me = await authService.getCurrentUser();
      setUser(me);
      localStorage.setItem('sparkvybzent_user', JSON.stringify(me));
      setIsLoading(false);
      return true;
    } catch (err) {
      setIsLoading(false);
      return false;
    }
  };

  const signup = async (payload: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
  }): Promise<boolean> => {
    setIsLoading(true);
    try {
      const resp = await authService.signup(payload);
      authService.storeToken(resp.token);
      const me = await authService.getCurrentUser();
      setUser(me);
      localStorage.setItem('sparkvybzent_user', JSON.stringify(me));
      setIsLoading(false);
      return true;
    } catch (err) {
      setIsLoading(false);
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};