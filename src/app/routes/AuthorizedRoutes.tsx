import { Route } from "react-router-dom";
import liabilitiesRouter from "./liabilitiesRoutes";
import reportsRouter from "./reportsRoutes"; 
import plannerRouter from "./plannerRoutes";
import profileRouter from "./profileRoutes";
import assetsRouter from "./assetsRoutes";
import { UnionRoutes } from "./UnionAuthRoutes.tsx";
import { balanceRouter } from "./balanceRoutes";

export const AuthorizedRoutes = () => {
    return (
        <Route element={<UnionRoutes/>}>
            {balanceRouter}
            {assetsRouter}
            {liabilitiesRouter}
            {reportsRouter}
            {plannerRouter}
            {profileRouter}
        </Route>
    )
}

