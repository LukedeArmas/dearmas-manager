import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [pending, setPending] = useState(true)

    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        if (user) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
        setPending(false)
    }, [user])

    return {loggedIn, pending }
}
export default useAuthStatus