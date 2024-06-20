import { Suspense } from "react";
// import { Outlet } from "react-router-dom";
import { AuthorizedRoutes } from "../app/routes/AuthorizedRoutes";
import { Layout } from "./Layout/Layout";
import { observer } from 'mobx-react-lite'
import { UnauthorizedRoutes } from "../app/routes/AuthRoutes/UnauthorizedRoutes";
import { Overlay } from "../shared/ui/Overlay/Overlay";
import { Route, Routes } from "react-router-dom";
// import { Header } from "../widgets/Header/Header";
import { useAuth } from "../features/hooks/auth/auth";

export const MainPage = observer(() => {
    const auth = useAuth()
    const authRoute = AuthorizedRoutes()
    const unAuthRoute = UnauthorizedRoutes() 
    
    return (
        <Suspense fallback={<Overlay active="overlay--active"/>}>
            <Routes>
                { 
                    auth.isAuth ? 
                        <Route path="/" element={<Layout/>}>
                            {authRoute}
                        </Route> : 
                        unAuthRoute
                }         
            </Routes>
            
        </Suspense>
    )
})
