import axios from 'axios'

const URL = '/api/users'

// Register a user
const register = async (userData) => {
    const response = await axios.post(URL, userData)

    if (response.data) {
        // save data and JWT to localStorage
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const login = async (userData) => {
    const response = await axios.post(`${URL}/login`, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const logout = () => localStorage.removeItem('user')

const authAsync = {
    register,
    login,
    logout
}

export default authAsync