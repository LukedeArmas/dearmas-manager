import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import commentAsync from './commentAsync.js'

const initialState = {
    comments: [],
    comment: {},
    isError: false,
    isSuccess: false,
    updateCommentIsSuccess: false,
    createCommentIsSuccess: false,
    deleteCommentIsSuccess: false,
    isLoading: false,
    getCommentIsLoading: false,
    message: ''
}


// Get all ticket comments 
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

// Get comment 
export const getComment = createAsyncThunk('comments/getComment', async ({taskId, commentId}, thunkAPI) => {
    try {
        const jwt = thunkAPI.getState().auth.user.token
        return await commentAsync.getComment(taskId, commentId, jwt)
    } catch(e) {
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Create comment for ticket 
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

// update comment 
export const updateComment = createAsyncThunk('comments/updateComment', async ({commentText, taskId, commentId}, thunkAPI) => {
    try {
        const jwt = thunkAPI.getState().auth.user.token
        return await commentAsync.updateComment(commentText, taskId, commentId, jwt)
    } catch(e) {
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// update comment 
export const deleteComment = createAsyncThunk('comments/deleteComment', async ({taskId, commentId}, thunkAPI) => {
    try {
        const jwt = thunkAPI.getState().auth.user.token
        return await commentAsync.deleteComment(taskId, commentId, jwt)
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
        .addCase(getComment.pending, (state) => {
            state.getCommentIsLoading = true
        })
        .addCase(getComment.fulfilled, (state, action) => {
            state.getCommentIsLoading = false
            state.isSuccess = true
            state.comments = action.payload
        })
        .addCase(getComment.rejected, (state, action) => {
            state.getCommentIsLoading = true
            state.isError = true
            state.message = action.payload
        })
        .addCase(updateComment.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateComment.fulfilled, (state, action) => {
            state.isLoading = false
            state.updateCommentIsSuccess = true
            state.comments.map((comment) => comment._id === action.payload._id 
                ? (comment.text = action.payload.text) 
                : comment
            )
        })
        .addCase(updateComment.rejected, (state, action) => {
            state.isLoading = true
            state.isError = true
            state.message = action.payload
        })
        .addCase(createComment.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createComment.fulfilled, (state, action) => {
            state.isLoading = false
            state.createCommentIsSuccess = true
            state.comments.push(action.payload)
        })
        .addCase(createComment.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteComment.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteComment.fulfilled, (state, action) => {
            state.isLoading = false
            state.deleteCommentIsSuccess = true
            state.comments.filter((comment) => comment._id === action.payload._id)
        })
        .addCase(deleteComment.rejected, (state, action) => {
            state.isLoading = true
            state.isError = true
            state.message = action.payload
        })
    }
})

export const { reset } = commentSlice.actions

export default commentSlice.reducer