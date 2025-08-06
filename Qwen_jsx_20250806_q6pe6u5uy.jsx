// frontend/src/pages/CreatePost/CreatePost.jsx (aggiornato)
import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PostForm from './PostForm';
import { useAuth } from '../../hooks/useAuth';
import { postService } from '../../services/posts';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (postData) => {
    try {
      const newPost = await postService.createPost(postData);
      // Mostra messaggio di successo
      alert('Post creato con successo!');
      navigate('/');
    } catch (error) {
      console.error('Errore durante la creazione del post:', error);
      alert('Errore durante la creazione del post: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={logout} />
      
      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Crea Nuovo Post</h1>
          <p className="text-gray-600 mt-1">Crea e programma il tuo post per i social media</p>
        </div>
        
        <PostForm onSubmit={handleSubmit} />
      </main>
    </div>
  );
};

export default CreatePost;