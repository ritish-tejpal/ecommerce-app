// import {
//     createSlice,
//     configureStore,
// } from '@reduxjs/toolkit';


// const userSlice = createSlice({
//     name: 'user',
//     initialState: {
//         user: null,
//         isLoggedIn: false,
//         token: null,
//     },
//     reducers: {
//         setUser: (state, action) => {
//             state.user = action.payload;
//         },
//         setToken: (state, action) => {
//             state.token = action.payload;
//         },
//         setIsLoggedIn: (state, action) => {
//             state.isLoggedIn = action.payload;
//         }
//     }
// })

// export const { setUser, setToken, setIsLoggedIn } = userSlice.actions;

// export const store = configureStore({
//     reducer: {
//         user: userSlice.reducer
//     }
// })


import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
    reducer: {

    }
})