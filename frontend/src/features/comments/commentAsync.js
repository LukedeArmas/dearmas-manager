import axios from 'axios'

const URL = '/tasks'


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

const commentAsync = {
    getComments,
}

export default commentAsync