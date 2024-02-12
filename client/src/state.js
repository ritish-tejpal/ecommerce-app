import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload.token;
        },
        setUser: (state, action) => {
            state.user = action.payload.user;
        }
    },
});

export const { setToken, setUser } = userSlice.actions;
export default userSlice.reducer