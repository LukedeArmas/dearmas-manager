import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import commentAsync from './commentAsync.js'

const initialState = {
    comments: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}


// Get all task comments 
export const getComments = createAsyncThunk('comments/getComments', async (taskId, thunkAPI) => {
    try {
        // ThunkAPI getState() gives us access to all other redux global state, so we can get the user state (the token) from auth
        const jwt = thunkAPI.getState().auth.user.token
        return await commentAsync.getComments(taskId, jwt)
    } catch(e) {
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get all task comments 
export const createComment = createAsyncThunk('comments/createComment', async ({ commentText, taskId }, thunkAPI) => {
    try {
        // ThunkAPI getState() gives us access to all other redux global state, so we can get the user state (the token) from auth
        const jwt = thunkAPI.getState().auth.user.token
        return await commentAsync.createComment(commentText, taskId, jwt)
    } catch(e) {
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers:  {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(getComments.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getComments.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.comments = action.payload
        })
        .addCase(getComments.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(createComment.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createComment.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.comments.push(action.payload)
        })
        .addCase(createComment.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const { reset } = commentSlice.actions

export default commentSlice.reducer