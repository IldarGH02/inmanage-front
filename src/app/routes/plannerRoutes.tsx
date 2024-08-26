import { Route } from "react-router-dom";
import { PlannerPage } from '../../pages/PlannerPage/PlannerPage';
import { ProjectItemPage } from '../../pages/PlannerPage/projectItemPage/ProjectItemPage';
import { ProjectAddPage } from "../../pages/PlannerPage/ProjectAddPage/ProjectAddPage";
import { TaskAddPage } from "../../pages/PlannerPage/TaskAddPage/TaskAddPage";

const plannerRouter = 
        <Route path='/'>
            <Route path = "planner" element={<PlannerPage/>}/>
            <Route path = "planner"> 
                <Route path = "project-add" element={<ProjectAddPage/>}/>
                <Route path = "task-add" element={<TaskAddPage/>}/>
                <Route path=':id' element={<ProjectItemPage/>}/>
            </Route>
                
            <Route path='planner/:id' element={<ProjectItemPage/>}/>
        </Route>


export default plannerRouter
