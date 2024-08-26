import { Outlet } from "react-router-dom";
import { Header } from "../../../widgets/Header/Header.tsx";

export const PrivateRoute = () => {
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    )
}