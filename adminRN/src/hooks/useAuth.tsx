import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../store';
import { loginAdmin, logoutAdmin, fetchAdminProfile } from '../store/slices/adminSlice';

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { isLoggedIn, loading, error } = useSelector((state: RootState) => state.admin);

    const login = async (credentials: { mobile: string; password: string }) => {
        try {
            await dispatch(loginAdmin(credentials)).unwrap();
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const logout = async () => {
        try {
            await dispatch(logoutAdmin()).unwrap();
            navigate('/admin/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const checkAuth = async () => {
        if (isLoggedIn) {
            try {
                await dispatch(fetchAdminProfile()).unwrap();
            } catch (error) {
                console.error('Failed to fetch admin profile:', error);
            }
        }
    };

    return { isLoggedIn, loading, error, login, logout, checkAuth };
};

