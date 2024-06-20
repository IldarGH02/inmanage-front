import { Outlet } from "react-router-dom"
import { Header } from "../../../widgets/Header/Header"
import { observer } from 'mobx-react-lite'

export const UnionRoutes = observer(() => {
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    )
})