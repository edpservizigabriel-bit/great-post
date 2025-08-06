// frontend/src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { authService } from '../services/auth';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const userData = await authService.getCurrentUser();
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Errore durante il controllo autenticazione:', error);
        localStorage.removeItem('authToken');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const { token, user } = await authService.login(email, password);
      setUser(user);
      setIsAuthenticated(true);
      return { token, user };
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Errore durante il logout:', error);
    }
  };

  const register = async (name, email, password) => {
    try {
      const { token, user } = await authService.register(name, email, password);
      setUser(user);
      setIsAuthenticated(true);
      return { token, user };
    } catch (error) {
      throw error;
    }
  };

  return {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    register
  };
};