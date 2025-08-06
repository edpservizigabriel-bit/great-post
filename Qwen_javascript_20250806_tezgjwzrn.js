// frontend/src/services/analytics.js
import api from './api';

export const analyticsService = {
  // Ottenere le statistiche globali
  async getGlobalStats() {
    try {
      const response = await api.get('/analytics/stats');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Errore nel caricamento delle statistiche');
    }
  },

  // Ottenere le statistiche per piattaforma
  async getPlatformStats() {
    try {
      const response = await api.get('/analytics/platforms');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Errore nel caricamento delle statistiche piattaforma');
    }
  },

  // Ottenere le statistiche per periodo
  async getPeriodStats(startDate, endDate) {
    try {
      const response = await api.get('/analytics/period', {
        params: { startDate, endDate }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Errore nel caricamento delle statistiche per periodo');
    }
  },

  // Ottenere i dati di performance per un post
  async getPostPerformance(postId) {
    try {
      const response = await api.get(`/analytics/post/${postId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Errore nel caricamento delle performance del post');
    }
  },

  // Ottenere il trend di performance
  async getPerformanceTrend() {
    try {
      const response = await api.get('/analytics/trend');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Errore nel caricamento del trend di performance');
    }
  }
};