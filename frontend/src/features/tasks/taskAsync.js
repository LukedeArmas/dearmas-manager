import axios from 'axios'

const taskURL = '/tasks'

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

const getTasks = async (jwt) => {
    const config = {
        headers: {
            // We need it like this because this is how the api gets the token in the backend (with .split(' '))
            Authorization: `Bearer ${jwt}`
        }
    }
    const response = await axios.get(taskURL, config)
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
    getTask,
    closeTask
}

export default taskAsync