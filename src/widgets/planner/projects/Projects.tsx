import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./projects.css"
import { ProjectsExpenses } from "./ProjectsExpenses/ProjectsExpenses";
import { IProjectItemDTO } from "../../../app/types/dto/planner/projects/IProject";
import { useProject } from "../../../features/hooks/planner/project/projectHooks2";
import { ProjectItem } from "./ProjectItem/ProjectItem";

export function Projects() {
    const { projects } = useProject() //addProject, editProject, removeProject
    const [idDt, setIdDt] = useState(0)
    const [projectDto, setProjectDto] = useState<IProjectItemDTO>()
    const [removeModalVisible, setRemoveModalVisible] = useState(false)

    // const addPropertyItem = (newItem:IProjectItemDTO) => {
    //     addProject(newItem)
    // }

    const editModal = (obj: IProjectItemDTO) => {
        setProjectDto(obj)
        // show(LIABILITIES_PROJECT_EDIT)
    }
    
    // const editProjectItem = (obj: IProjectItemDTO) => {
    //     editProject(obj)

    // }

    console.log(projectDto)
    console.log(removeModalVisible)
    console.log(idDt)
    
    const removeModal = (id:number) => {
        setIdDt(id)
        setRemoveModalVisible(true)
    }
    
    // const removeItem = (reason:number, price?: number) => {
    //     if(reason!==0) {
    //         removeProject(idDt)
    //         if(reason===3) {
    //             console.log(price)
    //         }
    //         setRemoveModalVisible(false)
    //     }
    // }

    return (
        <>
        {/* {removeModalVisible && 
            <Modal onClose={()=>setRemoveModalVisible(false)}>
                <DeleteModal link="" onClose={()=>setRemoveModalVisible(false)} onRemove={removeItem}/>
            </Modal>
        } */}
        <ProjectsExpenses sum={10000}/>
        <div className="projects">
            <div className="projects__list">
                <div className="projects__list-header">
                    <div className="projects__list-name">
                        Проекты
                    </div>
                    <Link to='project-add' className="blue-btn projects__list-add-btn">Добавить</Link>
                </div>
                {projects.length === 0 && 
                    <div className="projects__list-empty">
                        Недвижимости нет
                    </div>
                }
                {projects.map((el)=>{
                    return (
                        <Link to={`${el.id}`} key={el.id}><ProjectItem onShowModal={removeModal} onEditModal={editModal} data={el}/></Link>
                    )
                })}
            </div>
        </div>
        </>
    )
}