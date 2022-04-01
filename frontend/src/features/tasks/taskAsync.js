import axios from 'axios'

const taskURL = '/api/tasks'

const createTask = async (task, jwt) => {
    const config = {
        headers: {
            // We need it like this because this is how the api gets the token in the backend (with .split(' '))
            Authorization: `Bearer ${jwt}`
        }
    }
    const response = await axios.post(taskURL, task, config)
    return response.data
}

const getTasks = async (query, jwt) => {
    const config = {
        headers: {
            // We need it like this because this is how the api gets the token in the backend (with .split(' '))
            Authorization: `Bearer ${jwt}`
        }
    }
    const response = await axios.get(taskURL + query, config)
    return response.data
}

const getTaskAmounts = async (jwt) => {
    const config = {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    }
    const response = await axios.get(`${taskURL}/amounts`, config)
    return response.data
}

const getTask = async (taskId, jwt) => {
    const config = {
        headers: {
            // We need it like this because this is how the api gets the token in the backend (with .split(' '))
            Authorization: `Bearer ${jwt}`
        }
    }
    const response = await axios.get(`${taskURL}/${taskId}`, config)
    return response.data
}

const closeTask = async (taskId, jwt) => {
    const config = {
        headers: {
            // We need it like this because this is how the api gets the token in the backend (with .split(' '))
            Authorization: `Bearer ${jwt}`
        }
    }
    const response = await axios.put(`${taskURL}/${taskId}`, { status: 'closed' }, config)
    return response.data
}

const taskAsync = {
    createTask,
    getTasks,
    getTaskAmounts,
    getTask,
    closeTask
}

export default taskAsync