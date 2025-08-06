// frontend/src/utils/validators.js
export const validatePostForm = (formData) => {
  const errors = [];

  if (!formData.title?.trim()) {
    errors.push('Il titolo è obbligatorio');
  }

  if (!formData.content?.trim()) {
    errors.push('Il contenuto è obbligatorio');
  }

  if (!formData.media) {
    errors.push('Seleziona un media');
  }

  if (!formData.platforms || formData.platforms.length === 0) {
    errors.push('Seleziona almeno una piattaforma');
  }

  if (formData.scheduledAt && new Date(formData.scheduledAt) < new Date()) {
    errors.push('La data di pubblicazione non può essere nel passato');
  }

  return errors;
};

export const validateAuthForm = (formData) => {
  const errors = [];

  if (!formData.email?.trim()) {
    errors.push('Email obbligatoria');
  } else if (!validateEmail(formData.email)) {
    errors.push('Email non valida');
  }

  if (!formData.password?.trim()) {
    errors.push('Password obbligatoria');
  } else if (!validatePassword(formData.password)) {
    errors.push('Password troppo corta (minimo 6 caratteri)');
  }

  if (formData.password !== formData.confirmPassword) {
    errors.push('Le password non coincidono');
  }

  return errors;
};