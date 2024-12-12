import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminState {
    isLoggedIn: boolean;
    name: string;
    email: string;
    mobile: string;
    image: string;
}

const initialState: AdminState = {
    isLoggedIn: false,
    name: '',
    email: '',
    mobile: '',
    image: '',
};

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        updateAdmin: (state, action: PayloadAction<Partial<AdminState>>) => {
            return { ...state, ...action.payload };
        },
        logdedInAdmin: (state, action: PayloadAction<Omit<AdminState, 'isLoggedIn'>>) => {
            return { ...state, ...action.payload, isLoggedIn: true };
        },
        logdedOutAdmin: (state) => {
            return { ...initialState };
        },
    },
});

export const { updateAdmin, logdedInAdmin, logdedOutAdmin } = adminSlice.actions;

export default adminSlice.reducer;

