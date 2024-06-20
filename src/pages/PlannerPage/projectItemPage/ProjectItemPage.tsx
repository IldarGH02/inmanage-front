import "./projectItemPage.css"
import { Diary } from "../../../widgets/planner/diary/Diary";

export function ProjectItemPage() {
    // const modal = useContext(ModalContext)
    
    // const addPropertyItem = (newItem:IProjectItemDTO) => {
    //     addProject(newItem)
    // }

    return (
        <div className="project-page" >
            <div className="project-page__container">
                <Diary/>
            </div>
        </div>
    )
}