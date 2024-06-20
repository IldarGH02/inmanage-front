import { Route } from "react-router-dom"
import { UnionUnAuthRoutes } from './UnionUnAuthRoutes'
import { loginRoutes } from './loginRoutes'
import { registrationRoutes } from './registrationRoutes'

export const UnauthorizedRoutes = () => {
    return (
        <Route path="/" element={<UnionUnAuthRoutes/>}>
            {loginRoutes}
            {registrationRoutes}
        </Route>
    )
}