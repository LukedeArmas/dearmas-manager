import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import taskAsync from './taskAsync.js'



const initialState = {
    tasks: [],
    taskAmounts: {},
    task: {},
    isError: false,
    isSuccess: false,
    isCreateTicketSuccess: false,
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


// Get all user tasks
export const getTasks = createAsyncThunk('tasks/getUserTasks', async (_, thunkAPI) => {
    try {
        // ThunkAPI getState() gives us access to all other redux global state, so we can get the user state (the token) from auth
        const jwt = thunkAPI.getState().auth.user.token
        return await taskAsync.getTasks(jwt)
    } catch(e) {
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get amount of total tickets, new tickets, open tickets, and closed tickets
export const getTaskAmounts = createAsyncThunk('tasks/getTaskAmounts', async (_, thunkAPI) => {
    try {
        // ThunkAPI getState() gives us access to all other redux global state, so we can get the user state (the token) from auth
        const jwt = thunkAPI.getState().auth.user.token
        return await taskAsync.getTaskAmounts(jwt)
    } catch(e) {
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get all user tasks
export const getTask = createAsyncThunk('tasks/getUserTask', async (taskId, thunkAPI) => {
    try {
        // ThunkAPI getState() gives us access to all other redux global state, so we can get the user state (the token) from auth
        const jwt = thunkAPI.getState().auth.user.token
        return await taskAsync.getTask(taskId, jwt)
    } catch(e) {
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get all user tasks
export const closeTask = createAsyncThunk('tasks/closeUserTask', async (taskId, thunkAPI) => {
    try {
        // ThunkAPI getState() gives us access to all other redux global state, so we can get the user state (the token) from auth
        const jwt = thunkAPI.getState().auth.user.token
        return await taskAsync.closeTask(taskId, jwt)
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
            state.isCreateTicketSuccess = true
        })
        .addCase(createTask.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getTasks.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getTasks.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.tasks = action.payload
        })
        .addCase(getTasks.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getTaskAmounts.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getTaskAmounts.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.taskAmounts = action.payload
        })
        .addCase(getTaskAmounts.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getTask.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getTask.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.task = action.payload
        })
        .addCase(getTask.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(closeTask.fulfilled, (state, action) => {
            state.isLoading = false
            state.tasks.map((task) => task._id === action.payload._id 
                ? (task.status = 'closed') 
                : task
            )
            // Apparently you don't need do change the individual task state, not sure why
            // We actually don't need this because when we close a task we go to the tasks page. And although the old task will be set as the task in the redux state on this page, when we click on that task again the redux state will use the updated task from the backend api.
            // state.task = action.payload
        })
    }
})

export const { reset } = taskSlice.actions

export default taskSlice.reducer
