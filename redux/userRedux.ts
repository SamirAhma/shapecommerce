import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ----------------------------------------------------
// 1. Define the types (as shown in the section above)
// ----------------------------------------------------
interface User {
    _id: string;
    username: string;
    email: string;
    accessToken?: string;
    isAdmin?: boolean;
}

interface UserState {
    currentUser: User | null;
    isFetching: boolean;
    error: boolean;
}

// 2. Define the initial state with the UserState type
const initialState: UserState = {
    currentUser: null,
    isFetching: false,
    error: false,
};

const userSlice = createSlice({
    name: "user",
    initialState, // Use the typed initial state
    reducers: {
        // Reducers that don't take a payload use the default State type
        loginStart: (state: UserState) => {
            state.isFetching = true;
            state.error = false; // Reset error on new attempt
        },

        // Reducers that take a payload use PayloadAction<T> where T is the payload type
        loginSuccess: (state: UserState, action: PayloadAction<User>) => {
            state.isFetching = false;
            // The payload is the authenticated User object
            state.currentUser = action.payload;
            state.error = false;
        },

        loginFailure: (state: UserState) => {
            console.log(state.error); // Note: This logs the *current* state.error, which may be false
            state.isFetching = false;
            state.error = true;
        },

        logout: (state: UserState) => {
            state.currentUser = null;
            state.isFetching = false; // Ensure fetching state is clean
            state.error = false; // Ensure error state is clean
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
    userSlice.actions;

// Type the exported reducer (optional but good practice)
export default userSlice.reducer;
