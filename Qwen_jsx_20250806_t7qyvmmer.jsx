// frontend/src/pages/Dashboard/Dashboard.jsx (aggiornato)
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import DashboardContent from './DashboardContent';
import { useAuth } from '../../hooks/useAuth';
import { usePosts } from '../../hooks/usePosts';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const { posts, loading: postsLoading, error } = usePosts();

  useEffect(() => {
    setLoading(postsLoading);
  }, [postsLoading]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={logout} />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <DashboardContent 
          posts={posts} 
          loading={loading}
          onNewPost={() => window.location.href = '/create-post'}
        />
      </main>
    </div>
  );
};

export default Dashboard;