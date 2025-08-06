// frontend/src/components/PostEditor/PostEditor.jsx (aggiornato)
import React, { useState } from 'react';
import MediaUploader from './MediaUploader';
import TextEditor from './TextEditor';
import HashtagManager from './HashtagManager';
import Button from '../ui/Button';
import { postService } from '../../services/posts';
import { validatePostForm } from '../../utils/validators';

const PostEditor = ({ onSubmit, initialData = null }) => {
  const [post, setPost] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    media: initialData?.media || null,
    hashtags: initialData?.hashtags || [],
    platforms: [],
    scheduledAt: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleMediaUpload = (media) => {
    setPost(prev => ({ ...prev, media }));
  };

  const handleTextChange = (content) => {
    setPost(prev => ({ ...prev, content }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validazione
    const validationErrors = validatePostForm(post);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors([]);

    try {
      const postData = {
        ...post,
        hashtags: post.hashtags.map(tag => tag.startsWith('#') ? tag : `#${tag}`)
      };
      
      const result = await postService.createPost(postData);
      await onSubmit(result);
    } catch (error) {
      console.error('Errore durante l\'invio del post:', error);
      setErrors([error.message]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">Crea Nuovo Post</h2>
      
      {errors.length > 0 && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4">
          <ul className="list-disc list-inside text-red-700">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ... resto del form ... */}
      </form>
    </div>
  );
};

export default PostEditor;