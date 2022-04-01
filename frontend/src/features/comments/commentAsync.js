import axios from 'axios'

const URL = '/api/tasks'


const getComments = async (taskId, jwt) => {
    const config = {
        headers: {
            // We need it like this because this is how the api gets the token in the backend (with .split(' '))
            Authorization: `Bearer ${jwt}`
        }
    }
    const response = await axios.get(`${URL}/${taskId}/comments`, config)
    return response.data
}

const getComment = async (taskId, commentId, jwt) => {
    const config = {
        headers: {
            // We need it like this because this is how the api gets the token in the backend (with .split(' '))
            Authorization: `Bearer ${jwt}`
        }
    }
    const response = await axios.get(`${URL}/${taskId}/comments/${commentId}`, config)
    return response.data
}

const createComment = async (commentText, taskId, jwt) => {
    const config = {
        headers: {
            // We need it like this because this is how the api gets the token in the backend (with .split(' '))
            Authorization: `Bearer ${jwt}`
        }
    }
    const response = await axios.post(`${URL}/${taskId}/comments`, { text: commentText }, config)
    return response.data
}

const updateComment = async (commentText, taskId, commentId, jwt) => {
    const config = {
        headers: {
            // We need it like this because this is how the api gets the token in the backend (with .split(' '))
            Authorization: `Bearer ${jwt}`
        }
    }
    const response = await axios.put(`${URL}/${taskId}/comments/${commentId}`, { text: commentText }, config)
    return response.data
}

const deleteComment = async (taskId, commentId, jwt) => {
    const config = {
        headers: {
            // We need it like this because this is how the api gets the token in the backend (with .split(' '))
            Authorization: `Bearer ${jwt}`
        }
    }
    const response = await axios.delete(`${URL}/${taskId}/comments/${commentId}`, config)
    return response.data
}

const commentAsync = {
    getComments,
    getComment,
    createComment,
    updateComment,
    deleteComment
}

export default commentAsync