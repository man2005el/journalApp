import { Routes, Route, Navigate } from "react-router"
import { LoginPage } from "../pages/LoginPage"
import { SignUpPage } from "../pages/SignUpPage"


export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path ="/login" element={<LoginPage/>}/>
            <Route path ="/register" element={<SignUpPage/>}/>
            <Route path="/*" element={<Navigate to="/auth/login"/>}/>
        </Routes>
    )
}
