// frontend/src/services/auth.js
import api from './api';

export const authService = {
  // Login utente
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', {
        email,
        password
      });
      
      const { token, user } = response.data;
      
      // Salva il token nel localStorage
      localStorage.setItem('authToken', token);
      
      return { token, user };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Errore durante il login');
    }
  },

  // Registrazione utente
  async register(name, email, password) {
    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password
      });
      
      const { token, user } = response.data;
      
      localStorage.setItem('authToken', token);
      
      return { token, user };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Errore durante la registrazione');
    }
  },

  // Logout utente
  async logout() {
    try {
      // Se hai un endpoint di logout sul backend
      await api.post('/auth/logout');
    } catch (error) {
      console.warn('Errore durante il logout:', error);
    } finally {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
  },

  // Verifica se l'utente è autenticato
  isAuthenticated() {
    const token = localStorage.getItem('authToken');
    return !!token;
  },

  // Ottenere l'utente corrente
  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      return response.data.user;
    } catch (error) {
      throw new Error('Errore durante il recupero dell\'utente');
    }
  }
};