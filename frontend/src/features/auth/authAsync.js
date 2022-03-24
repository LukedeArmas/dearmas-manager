import axios from 'axios'

const URL = '/users'

// Register a user
const register = async (userData) => {
    const response = await axios.post(URL, userData)

    if (response.data) {
        // save data and JWT to localStorage
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const authAsync = {
    register
}

export default authAsync