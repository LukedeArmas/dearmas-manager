import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authAsync from './authAsync.js';

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authAsync.register(user)
    } catch(e) {
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()

        return thunkAPI.rejectWithValue(message)
    }
    
})

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    // try {
    //     return await authAsync.register(user)
    // } catch(e) {

    // }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.user = null
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
    }
})

// We have to export all actions in our reducer like this if we want to use the action in our application
export const {reset} = authSlice.actions

export default authSlice.reducer