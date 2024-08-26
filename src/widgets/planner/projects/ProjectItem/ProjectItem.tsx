import "./projectItem.css"
import { IProject } from "../../../../app/types/planner/IPlanner"
import { IProjectItemDTO } from "../../../../app/types/dto/planner/projects/IProject"

interface IProjectItem {
    data: IProject,
    onShowModal: (id:number)=>void,
    onEditModal: (obj: IProjectItemDTO)=>void
}

export function ProjectItem({data, onShowModal}: IProjectItem) {
    // const { projects, error, loading, getProjects, addProject, editProject, removeProject } = useProject()
    // const [removeModalVisible, setRemoveModalVisible] = useState(false)

    const remItem = ()=> {
        // show(ASSETS_PROPERTY_DELETE)
        onShowModal(data.id)
    }

    return (
        <>
        {/* {removeModalVisible && 
            <Modal onClose={()=>setRemoveModalVisible(false)}>
                <DeleteModal link="/actives/realty" onClose={()=>setRemoveModalVisible(false)} onRemove={removeItem}/>
            </Modal>
        } */}
        <div className="project-item">
            <div className="project-item__header">
                <div className="project-item__title">{data.name}</div>
                {/* <div className="project-item__actions">...</div> */}
                <div className="project-item__actions-drop-down">
                    <b>...</b>
                    <div className="project-item__actions-list">
                        {/* <div className="realty-item__action-item" onClick={()=>setEditModalVisible(true)}>Редактировать</div> */}
                        <div className="project-item__action-item" onClick={e=>{
                        e.preventDefault()
                        remItem()
                        }
                        }>Удалить</div>
                    </div>
                </div>
            </div>
            <div className="project-item__color" style={{backgroundColor:`${'#818080'}`}}></div>
            
            <div className="project-item__info">
                <div className="project-item__info-label">Дата начала:</div>
                <strong className="project-item__info-text">{new Date(data.date_start).getDate()+'.'+ new Date(data.date_start).getMonth()+'.'+new Date(data.date_start).getFullYear()}</strong>
            </div>
            <div className="project-item__info">
                <div className="project-item__info-label">Дата окончания:</div>
                <strong className="project-item__info-text">{new Date(data.date_end).getDate()+'.'+ new Date(data.date_end).getMonth()+'.'+new Date(data.date_end).getFullYear()}</strong>
            </div>
            <div className="project-item__info">
                <div className="project-item__info-label">Планируемая сумма:</div>
                <strong className="project-item__info-text">{data.planned_sum.toLocaleString()} ₽</strong>
            </div>
            <div className="project-item__info">
                <div className="project-item__info-label">Зарезервированная сумма:</div>
                <strong className="project-item__info-text">{data.reserved_sum.toLocaleString()} ₽</strong>
            </div>
            <div className="project-item__info">
                <div className="project-item__info-label">Потраченная сумма:</div>
                <strong className="project-item__info-text">{data.spent_sum.toLocaleString()} ₽</strong>
            </div>
            <div className="project-item__info">
                <div className="project-item__info-label">Описание:</div>
                <strong className="project-item__info-text">{data.description}</strong>
            </div>
        </div>
        </>
    )
}