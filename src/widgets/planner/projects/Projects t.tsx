import React, { useContext, useState } from "react"
// import { useProject } from "../../../hooks/planner/project/projectHooks"
import { useProject } from "../../../features/hooks/planner/project/projectHooks2"
import { IProjectItemDTO } from "../../../app/types/dto/planner/projects/IProject"
import { ModalContext } from "../../../features/context/modalProperty/ModalContext"
import { DeleteModalWindow } from "../../modalWindow/DeleteModalWindow/DeleteModalWindow"
import { Modal } from "../../modalWindow/Modal"
import { LIABILITIES_PROJECT_ADD, LIABILITIES_PROJECT_DELETE, LIABILITIES_PROJECT_EDIT } from "../../modalWindow/types"

import { AddModal } from "./modalWindows/AddModal/AddModal"
import { EditModal } from "./modalWindows/EditModal/EditModal"
import { ProjectItem } from "./ProjectItem t"
import "./projects.css"
import { ProjectsExpenses } from "./ProjectsExpenses/ProjectsExpenses"

// let data: IProject[] = [
//     {
//         id: 1, 
//         user_id: 1,
//         name: 'какое-то',
//         date_start: '21.04.2023',
//         date_end: '21.06.2023',
//         description: 'sadasdsad',
//     }
// ] 

export function Projects() {
    const { projects,  addProject, editProject, removeProject } = useProject()
    const [idDt, setIdDt] = useState(0)
    const {show, hide} = useContext(ModalContext)
    const modal = useContext(ModalContext)
    const [projectDto, setProjectDto] = useState<IProjectItemDTO>()

    const addPropertyItem = (newItem:IProjectItemDTO) => {
        addProject(newItem)
    }

    const editModal = (obj: IProjectItemDTO) => {
        setProjectDto(obj)
        show(LIABILITIES_PROJECT_EDIT)
    }
    
    const editProjectItem = (obj: IProjectItemDTO) => {
        editProject(obj)
        hide()
    }
    
    const removeModal = (id:number, type:string) => {
        setIdDt(id)
        show(type)
    }
    
    const removeItem = (reason:number, price?: number) => {
        if(reason!==0) {
            removeProject(idDt)
            if(reason===3) {
                console.log(price)
            }
        }
    }

    return (
        <>
        {modal.modal.visible && 
            <Modal>
                {modal.modal.kind === 
                   LIABILITIES_PROJECT_ADD ? <AddModal onAddPropertyItem={addPropertyItem}></AddModal>:
                   modal.modal.kind === LIABILITIES_PROJECT_DELETE ? <DeleteModalWindow onRemoveItem={removeItem}></DeleteModalWindow>:
                   <EditModal projectDto = {projectDto!} onEditProjectItem={editProjectItem}></EditModal>
                //    <IncomeModal></IncomeModal>
                   //     modal.modal.kind === PROPERTY_EDIT ? <EditModal name="Аппартаменты" price={1230.23}></EditModal>: 
                //    <IncomeModal></IncomeModal>
                }
                
            </Modal>
        }
        <ProjectsExpenses sum={10000}/>
        <div className="project">
            <div className="project__header">
                <div className="project__title"><h1>Проекты</h1></div>
                <div>
                    <button className="project__btn-history">История</button>
                    <button className="project__btn-add" onClick={()=>show(LIABILITIES_PROJECT_ADD)}>Добавить</button>
                </div>
                
            </div>
            <div className="project__container">
                <div className="project__list">
                    {projects.map(el=>{
                        return (
                            <ProjectItem data={el} onShowModal={removeModal} onEditModal={editModal} key={el.id} />
                        )
                    })}
                </div>
            </div>  
        </div> 
        </>
    )
}