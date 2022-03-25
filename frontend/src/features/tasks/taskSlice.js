import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import taskAsync from './taskAsync.js'



const initialState = {
    tasks: [],
    task: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Creates a new task
export const createTask = createAsyncThunk('tasks/createTask', async (task, thunkAPI) => {
    try {
        // ThunkAPI getState() gives us access to all other redux global state, so we can get the user state (the token) from auth
        const jwt = thunkAPI.getState().auth.user.token
        return await taskAsync.createTask(task, jwt)
    } catch(e) {
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(createTask.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createTask.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
        })
        .addCase(createTask.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const { reset } = taskSlice.actions

export default taskSlice.reducer
