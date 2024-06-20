import { Route } from "react-router-dom";
import { ReportsPage } from '../../pages/ReportsPage/ReportsPage';

const reportsRouter =
    <Route path='/'>
        <Route path = "reports" element={<ReportsPage/>}/>
    </Route>
export default reportsRouter
