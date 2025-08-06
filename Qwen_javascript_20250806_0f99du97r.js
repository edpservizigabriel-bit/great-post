// frontend/src/hooks/usePosts.js
import { useState, useEffect } from 'react';
import { postService } from '../services/posts';
import { useApi } from './useApi';

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { execute } = useApi();

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await postService.getAllPosts();
      setPosts(data);
      setFilteredPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createPost = useCallback(async (postData) => {
    try {
      const newPost = await postService.createPost(postData);
      setPosts(prev => [newPost, ...prev]);
      return newPost;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const updatePost = useCallback(async (id, postData) => {
    try {
      const updatedPost = await postService.updatePost(id, postData);
      setPosts(prev => prev.map(post => post._id === id ? updatedPost : post));
      return updatedPost;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const deletePost = useCallback(async (id) => {
    try {
      await postService.deletePost(id);
      setPosts(prev => prev.filter(post => post._id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const filterPosts = useCallback((filterFn) => {
    setFilteredPosts(posts.filter(filterFn));
  }, [posts]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    filteredPosts,
    loading,
    error,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    filterPosts
  };
};