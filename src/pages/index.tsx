import { Suspense } from "react";
import { AuthorizedRoutes } from "../app/routes/AuthorizedRoutes";
import { Layout } from "./Layout/Layout";
import { observer } from 'mobx-react-lite'
import { Overlay } from "../shared/ui/Overlay/Overlay";
import { Route, Routes } from "react-router-dom";
import {LoginPage} from "./LoginPage/LoginPage.tsx";
import {RegistrationPage} from "./RegistrationPage/RegistrationPage.tsx";
import {PrivateRoute} from "../app/routes/PrivateRoute/PrivateRoute.tsx";

export const MainPage = observer(() => {
    const authRoute = AuthorizedRoutes()
    
    return (
        <Suspense fallback={<Overlay active="overlay--active"/>}>
            <Routes>
                <Route path='login' element={<LoginPage/>}/>
                <Route path='registration' element={<RegistrationPage/>}/>
                <Route path='/' element={<Layout/>}>     
                    <Route element={<PrivateRoute/>}>
                        {authRoute}
                    </Route>
                </Route>
            </Routes>
        </Suspense>
    )
})
