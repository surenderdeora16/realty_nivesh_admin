import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import ProtectedRoute from './ProtectedRoute';
import AdminRoutes from './AdminRoutes';
import SignIn from './pages/Authentication/SignIn';
import Loader from './common/Loader';

const App: React.FC = () => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
      <Routes>
        <Route
          path="/admin/login"
          element={
            isLoggedIn ? (
              <Navigate to="/admin" replace />
            ) : (
              <SignIn />
            )
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminRoutes />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
  );
};

export default App;

