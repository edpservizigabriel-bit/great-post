// frontend/src/utils/helpers.js
// Formattazione data
export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Formattazione dimensione file
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Validazione email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validazione password
export const validatePassword = (password) => {
  return password.length >= 6;
};

// Generazione di un ID univoco
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Calcolo del progresso
export const calculateProgress = (current, total) => {
  return total > 0 ? Math.round((current / total) * 100) : 0;
};

// Formattazione monetaria
export const formatCurrency = (amount, currency = 'EUR') => {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: currency
  }).format(amount);
};