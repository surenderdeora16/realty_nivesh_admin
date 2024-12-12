import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const AdminAuthLayout: React.FC = () => {
    const { isLoggedIn } = useSelector((state: RootState) => state.admin);
    const location = useLocation();

    if (isLoggedIn) {
        return <Navigate to="/admin/dashboard" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default AdminAuthLayout;

