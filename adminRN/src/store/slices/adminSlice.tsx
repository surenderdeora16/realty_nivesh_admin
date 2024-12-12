import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AxiosHelper from '../../helper/AxiosHelper';

interface AdminState {
    isLoggedIn: boolean;
    name: string;
    email: string;
    mobile: string;
    image: string;
    loading: boolean;
    error: string | null;
}

const initialState: AdminState = {
    isLoggedIn: false,
    name: '',
    email: '',
    mobile: '',
    image: '',
    loading: false,
    error: null,
};

export const loginAdmin = createAsyncThunk(
    'admin/login',
    async (credentials: { mobile: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await AxiosHelper.postData('/admin/login', credentials);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const logoutAdmin = createAsyncThunk(
    'admin/logout',
    async (_, { rejectWithValue }) => {
        try {
            await AxiosHelper.getData('/admin/logout');
            return null;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchAdminProfile = createAsyncThunk(
    'admin/fetchProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await AxiosHelper.getData('/admin/profile');
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAdmin.fulfilled, (state, action: PayloadAction<AdminState>) => {
                return { ...state, ...action.payload, isLoggedIn: true, loading: false, error: null };
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(logoutAdmin.fulfilled, () => initialState)
            .addCase(fetchAdminProfile.fulfilled, (state, action: PayloadAction<AdminState>) => {
                return { ...state, ...action.payload, isLoggedIn: true, loading: false, error: null };
            });
    },
});

export default adminSlice.reducer;

