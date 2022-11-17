import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ getToken }) => {
    const token = getToken()
    
    if(!token.isValidToken) {
        return <Navigate to='/signin' />
    }

    return <Outlet />
}

export default ProtectedRoutes;