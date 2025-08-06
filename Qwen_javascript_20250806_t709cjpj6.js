// frontend/src/services/posts.js
import api from './api';

export const postService = {
  // Ottenere tutti i post
  async getAllPosts() {
    try {
      const response = await api.get('/posts');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Errore nel caricamento dei post');
    }
  },

  // Ottenere un singolo post
  async getPostById(id) {
    try {
      const response = await api.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Errore nel caricamento del post');
    }
  },

  // Creare un nuovo post
  async createPost(postData) {
    try {
      const response = await api.post('/posts', postData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Errore durante la creazione del post');
    }
  },

  // Aggiornare un post
  async updatePost(id, postData) {
    try {
      const response = await api.put(`/posts/${id}`, postData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Errore durante l\'aggiornamento del post');
    }
  },

  // Eliminare un post
  async deletePost(id) {
    try {
      const response = await api.delete(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Errore durante l\'eliminazione del post');
    }
  },

  // Pianificare un post
  async schedulePost(postId, scheduleData) {
    try {
      const response = await api.post(`/posts/${postId}/schedule`, scheduleData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Errore durante la pianificazione del post');
    }
  },

  // Ottenere i post programmati
  async getScheduledPosts() {
    try {
      const response = await api.get('/posts/scheduled');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Errore nel caricamento dei post programmati');
    }
  }
};