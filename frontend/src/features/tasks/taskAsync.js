import axios from 'axios'

const taskURL = '/tasks'

const createTask = async (task, jwt) => {
    const config = {
        headers: {
            // We need it like this because this is how the api gets the token in the backend (with .split(' '))
            Authorization: `Bearer ${jwt}`
        }
    }
    const response = await axios.post(`${taskURL}`, task, config)

    return response.data
}

const taskAsync = {
    createTask
}

export default taskAsync