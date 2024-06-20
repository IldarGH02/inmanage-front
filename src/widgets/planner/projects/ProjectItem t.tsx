import React from "react"
import { Link } from "react-router-dom"
import { IProjectItemDTO } from "../../../app/types/dto/planner/projects/IProject"
import { IProject } from "../../../app/types/planner/IPlanner"
import { LIABILITIES_PROJECT_DELETE } from "../../modalWindow/types"
import "./projects.css"

const editPencil = require("../../../assets/img/edit-pencil.png")

interface IProjectItem {
    data: IProject,
    onShowModal: (id:number, type:string)=>void,
    onEditModal: (obj: IProjectItemDTO)=>void
}

export function ProjectItem({data, onShowModal, onEditModal}:IProjectItem) {
    // const {id} = useParams()

    const remItem = ()=> {
        // show(ASSETS_PROPERTY_DELETE)
        onShowModal(data.id!, LIABILITIES_PROJECT_DELETE)
    }

    return (
        <div className="project-item">
            <div className="project-item__wrapper">
                <div className="project-item__header">
                    <div className="project-item__title"><h1>{data.name}</h1></div>
                    <button className="project-item__btn-edit" onClick={()=>onEditModal(
                        {id:data.id!, 
                        date_start:data.date_start, 
                        date_end:data.date_end, 
                        description:data.description, 
                        name:data.name,
                        planned_sum: data.planned_sum,
                        reserved_sum: data.reserved_sum,
                        writeoff_account: data.writeoff_account
                        })}>
                        <img src={editPencil} alt="" />
                    </button>
                    <button className="project-item__btn-remove" onClick={()=>
                        remItem()}>x</button>
                    
                </div>
                <div className="project-item__content">
                    <div>
                        <h3>Дата начала проекта:</h3>
                        <b>{new Date(data.date_start).getDate()+'.'+ new Date(data.date_start).getMonth()+'.'+new Date(data.date_start).getFullYear()}</b>
                        {/* <b>0 ₽</b> */}
                    </div>
                    <div>
                        <h3>Дата окончания проекта:</h3>
                        <b>{new Date(data.date_end).getDate()+'.'+ new Date(data.date_end).getMonth()+'.'+new Date(data.date_end).getFullYear()}</b>
                        {/* <b>0 ₽</b> */}
                    </div>
                    <div>
                        <h3>Планируемая сумма:</h3>
                        <b>{data.planned_sum.toLocaleString()} ₽</b>
                        {/* <b>0 ₽</b> */}
                    </div>
                    <div>
                        <h3>Потраченные средства:</h3>
                        <b>{data.spent_sum.toLocaleString()} ₽</b>
                        {/* <b>0 ₽</b> */}
                    </div>
                    <div>
                        <h3>Зарезервированные средства:</h3>
                        <b>{data.reserved_sum.toLocaleString()} ₽</b>
                        {/* <b>0 ₽</b> */}
                    </div>
                    <div>
                        <h3>Счет списания:</h3>
                        <b>{data.writeoff_account}</b>
                        {/* <b>0 ₽</b> */}
                    </div>
                    <span className="project-item__info-container">
                        <div>
                            Описание:
                        </div>
                        <div>
                            {data.description}
                        </div>
                    </span>
                </div> 
            </div>
            <div className="project-item__footer">
                <Link className="project-item__btn-more" to={`/planner/${data.id}`}><b>Подробнее</b></Link>
            </div> 
        </div> 
    )
}