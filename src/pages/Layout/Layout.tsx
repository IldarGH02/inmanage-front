import { Outlet } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { Header } from "../../widgets/Header/Header"

export const Layout = observer(() => {
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    )
})