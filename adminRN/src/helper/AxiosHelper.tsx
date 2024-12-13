import axios from "axios";
import { toast } from 'react-toastify';
import { store } from '../store';
import { logdedOutAdmin } from '../redux/admin/adminSlice';
// import { logdedOutUser } from '../redux/user/userSlice';

declare global {
    interface ImportMeta {
        env: {
            VITE_API_BASE_URL: string;
            VITE_LICENCE: string;
            VITE_LOG_ERRORS_IN_CONSOLE: string;
        };
    }
}

const commonHeaders = () => {
    axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
    axios.defaults.headers.common['x-api-key'] = import.meta.env.VITE_LICENCE;
    axios.defaults.crossDomain = true;
    axios.defaults.withCredentials = true;
};

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
    refreshSubscribers.push(cb);
};

const onTokenRefreshed = (token: string) => {
    refreshSubscribers.map(cb => cb(token));
};

const refreshAuthToken = async () => {
    try {
        const response = await axios.post('/admin/refresh-token');
        const { token } = response.data;
        localStorage.setItem('authToken', token);
        return token;
    } catch (error) {
        throw error;
    }
};

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve) => {
                    subscribeTokenRefresh((token: string) => {
                        originalRequest.headers['Authorization'] = 'Bearer ' + token;
                        resolve(axios(originalRequest));
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const newToken = await refreshAuthToken();
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
                originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
                onTokenRefreshed(newToken);
                return axios(originalRequest);
            } catch (refreshError) {
                handleUnauthorized(error.response);
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
                refreshSubscribers = [];
            }
        }
        return Promise.reject(error);
    }
);

const handleUnauthorized = (response: any) => {
    if (response.data.message == 'Invalid Login Credentials..!!') {
        toast.error(response.data.message);
        return
    }
    toast.error('Session expired. Please login again.');
    store.dispatch(logdedOutAdmin());
    // store.dispatch(logdedOutUser());
    window.location.href = '/login';
};

const errorHandler = (error: any) => {
    if (import.meta.env.VITE_LOG_ERRORS_IN_CONSOLE === 'true') {
        console.error('API Error:', error);
    }

    if (error.response) {
        if (error.response.status === 401) {
            handleUnauthorized(error.response);
        } else {
            toast.error(error.response.data.message || 'An error occurred');
        }
    } else if (error.request) {
        toast.error('No response received from the server');
    } else {
        toast.error('Error setting up the request');
    }

    return Promise.reject(error);
};

const AxiosHelper = {
    getData: async (url: any, params = null) => {
        commonHeaders();
        return axios.get(url, { params }).catch(errorHandler);
    },
    postData: async (url: any, data: any, isMultipart = false) => {
        commonHeaders();
        const headers = isMultipart ? { "Content-Type": "multipart/form-data" } : { "Content-Type": "application/json" };
        return axios.post(url, data, { headers }).catch(errorHandler);
    },
    putData: async (url: any, data: any, isMultipart = false) => {
        commonHeaders();
        const headers = isMultipart ? { "Content-Type": "multipart/form-data" } : { "Content-Type": "application/json" };
        return axios.put(url, data, { headers }).catch(errorHandler);
    },
    deleteData: async (url: any) => {
        commonHeaders();
        return axios.delete(url).catch(errorHandler);
    }
};

export default AxiosHelper;

