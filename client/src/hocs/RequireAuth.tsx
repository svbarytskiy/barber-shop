import { FC, ReactNode, useEffect } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useStore } from "../hooks/useStore"
import { observer } from "mobx-react-lite"

interface RequireAuthProps {
    children: ReactNode
}

const RequireAuth: FC<RequireAuthProps> = ({ children }) => {

    const { store } = useStore()
    const location = useLocation()
    const isAuth = store.auth.isAuth
    const token = store.auth.token
    const isLoading = store.auth.isLoading

    if (!isAuth && !token && !isLoading) {
        return (<Navigate to={"/login"} state={{ from: location }}></Navigate >)
    }

    return <>{children}</>; 
}

export default observer(RequireAuth)
