// frontend/src/services/subscriptions.js
import api from './api';

export const subscriptionService = {
  // Ottenere lo stato dell'abbonamento
  async getSubscription() {
    try {
      const response = await api.get('/subscriptions');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Errore nel caricamento dell\'abbonamento');
    }
  },

  // Creare un abbonamento
  async createSubscription(planId, paymentMethod) {
    try {
      const response = await api.post('/subscriptions', {
        planId,
        paymentMethod
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Errore durante la creazione dell\'abbonamento');
    }
  },

  // Aggiornare un abbonamento
  async updateSubscription(subscriptionId, updateData) {
    try {
      const response = await api.put(`/subscriptions/${subscriptionId}`, updateData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Errore durante l\'aggiornamento dell\'abbonamento');
    }
  },

  // Annullare un abbonamento
  async cancelSubscription(subscriptionId) {
    try {
      const response = await api.delete(`/subscriptions/${subscriptionId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Errore durante l\'annullamento dell\'abbonamento');
    }
  },

  // Ottenere i piani disponibili
  async getPlans() {
    try {
      const response = await api.get('/subscriptions/plans');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Errore nel caricamento dei piani');
    }
  }
};