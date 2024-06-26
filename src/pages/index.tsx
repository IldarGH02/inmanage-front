import { Suspense, useEffect } from "react";
import { AuthorizedRoutes } from "../app/routes/AuthorizedRoutes";
import { Layout } from "./Layout/Layout";
import { observer } from 'mobx-react-lite'
import { UnauthorizedRoutes } from "../app/routes/AuthRoutes/UnauthorizedRoutes";
import { Overlay } from "../shared/ui/Overlay/Overlay";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "../features/hooks/auth/auth";
import { useGetLocalStorage } from "../features/hooks/storage";

export const MainPage = observer(() => {
    const auth = useAuth()
    const navigate = useNavigate()
    const authRoute = AuthorizedRoutes()
    const unAuthRoute = UnauthorizedRoutes() 

    useEffect(() => {
        const tokens = useGetLocalStorage('tokens')
        return tokens ? navigate('/balance') : navigate('/login')
    }, [])
    
    return (
        <Suspense fallback={<Overlay active="overlay--active"/>}>
            <Routes>
                { 
                    auth.isAuth ? 
                        <Route element={<Layout/>}>
                            {authRoute}
                        </Route> : 
                        unAuthRoute
                }         
            </Routes>
            
        </Suspense>
    )
})
