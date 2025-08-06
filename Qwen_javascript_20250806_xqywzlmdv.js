// frontend/src/services/social.js
import api from './api';

export const socialService = {
  // Ottenere gli account social connessi
  async getConnectedAccounts() {
    try {
      const response = await api.get('/social/accounts');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Errore nel caricamento degli account social');
    }
  },

  // Connettere un account social
  async connectAccount(platform, code) {
    try {
      const response = await api.post('/social/connect', {
        platform,
        code
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Errore durante la connessione dell\'account');
    }
  },

  // Disconnettere un account social
  async disconnectAccount(platform) {
    try {
      const response = await api.delete(`/social/disconnect/${platform}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Errore durante la disconnessione dell\'account');
    }
  },

  // Ottenere le informazioni dell'account
  async getAccountInfo(platform) {
    try {
      const response = await api.get(`/social/account/${platform}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Errore nel caricamento delle informazioni dell\'account');
    }
  },

  // Ottenere i post pubblicati su una piattaforma
  async getPlatformPosts(platform, limit = 10) {
    try {
      const response = await api.get(`/social/posts/${platform}`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Errore nel caricamento dei post della piattaforma');
    }
  },

  // Ottenere suggerimenti per il timing
  async getTimingSuggestions(platform) {
    try {
      const response = await api.get(`/social/timing/${platform}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Errore nel caricamento dei suggerimenti di timing');
    }
  }
};