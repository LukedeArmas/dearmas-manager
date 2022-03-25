import { Navigate, Outlet } from 'react-router-dom'
import useAuthStatus from '../hooks/useAuthStatus.js'
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 10rem;
`;

const PrivateRoute = () => {
    const { loggedIn, pending } = useAuthStatus()

    if (pending) {
        return <ClipLoader css={override} size={150} />
    }

    return loggedIn ? <Outlet /> : <Navigate to='/login' />
}
export default PrivateRoute