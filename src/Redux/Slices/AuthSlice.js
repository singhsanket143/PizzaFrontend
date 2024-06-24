import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || 'false',
    role: localStorage.getItem('role') || '',
    data: JSON.parse(localStorage.getItem('data')) || {},
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
});

export default AuthSlice.reducer;