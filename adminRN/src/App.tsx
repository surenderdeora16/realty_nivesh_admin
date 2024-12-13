import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import ProtectedRoute from './ProtectedRoute';
import AdminRoutes from './AdminRoutes';
import SignIn from './pages/Authentication/SignIn';
import Loader from './common/Loader';

const App: React.FC = () => {
  const { isLoggedIn, loading, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isLoggedIn ? (
            <Navigate to="/" replace />
          ) : (
            <SignIn />
          )
        }
      />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AdminRoutes />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;

