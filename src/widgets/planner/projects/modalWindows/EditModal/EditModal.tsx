import React, { useContext, useEffect, useState } from "react";
import { IProjectItemDTO } from "../../../../../app/types/dto/planner/projects/IProject";
import { Alert } from "../../../../Alert/Alert";
import Calendar from "../../../../Calendar/Calendar";
import { ModalContext } from "../../../../../features/context/modalProperty/ModalContext";
import "./editModal.css"

interface IEditModal {
    projectDto: IProjectItemDTO,
    onEditProjectItem: (obj: IProjectItemDTO)=>void
}

export function EditModal({projectDto, onEditProjectItem}: IEditModal) {
    const [valueDesc, setValueDesc] = useState(projectDto.description)
    const [valueDateStart, setValueDateStart] = useState(new Date(projectDto.date_start).getDate()+'.'+ new Date(projectDto.date_start).getMonth()+'.'+new Date(projectDto.date_start).getFullYear())
    const [valueDateEnd, setValueDateEnd] = useState(new Date(projectDto.date_end).getDate()+'.'+ new Date(projectDto.date_end).getMonth()+'.'+new Date(projectDto.date_end).getFullYear())
    const {hide} = useContext(ModalContext)
    const [valueName, setValueName] = useState(projectDto.name)
    
    const [textAlertName, setTextAlertName] = useState('')
    const [textAlertDesc, setTextAlertDesc] = useState('')
    const [textAlertMain, setTextAlertMain] = useState('')
    
    // const [textAlertDateStart, setTextDateStart] = useState('')
    // const [textAlertDateStart, setTextDateStart] = useState('')

    useEffect(()=>{
        console.log(projectDto)
    },[])

    const changeAreaDesc = (event: React.FormEvent<HTMLTextAreaElement>) => {
        const maxLength = 500
        const length = event.currentTarget.value.length
        setValueDesc(event.currentTarget.value)
        if(length<=maxLength) {
            setTextAlertDesc('')
        }
        else {
            setTextAlertDesc(`допустимое количество символов превышено на ${length - maxLength}`)
        }
    }

    const changeName = (event: React.FormEvent<HTMLInputElement>) => {
        const maxLength = 30
        const length = event.currentTarget.value.length
        setValueName(event.currentTarget.value)
        if(length<=maxLength) {
            setTextAlertName('')
        }
        else {
            setTextAlertName(`допустимое количество символов превышено на ${length - maxLength}`)
        }
    }

    const editProject = ()=> {
        // console.log(valueDesc)
        if(valueDateStart !== '' && valueDateEnd !== '' && textAlertDesc === '' && valueDesc !== '' && valueName !== '' && textAlertName === '') {
            let dt1 = valueDateStart.split('.')
            let dt2 = valueDateEnd.split('.')
            console.log(Number(dt1[2])<Number(dt2[2]))
            console.log(Number(dt1[2])===Number(dt2[2]) && Number(dt1[1])<Number(dt2[1]))
            console.log(Number(dt1[2])===Number(dt2[2]) && Number(dt1[1])===Number(dt2[1]) && Number(dt1[0])<Number(dt2[0]))
            if(Number(dt1[2])<Number(dt2[2]) || (Number(dt1[2])===Number(dt2[2]) && Number(dt1[1])<Number(dt2[1])) || (Number(dt1[2])===Number(dt2[2]) && Number(dt1[1])===Number(dt2[1]) && Number(dt1[0])<Number(dt2[0]))) {
                const newDto: IProjectItemDTO = {
                    id: projectDto.id,
                    name: valueName,
                    description: valueDesc,
                    date_start: new Date(Number(dt1[2]), Number(dt1[1]), Number(dt1[0])),
                    date_end: new Date(Number(dt2[2]), Number(dt2[1]), Number(dt2[0])),
                    planned_sum: projectDto.planned_sum,
                    reserved_sum: projectDto.reserved_sum,
                    writeoff_account: projectDto.writeoff_account
                }
                onEditProjectItem(newDto)
            }
            else {
                setTextAlertMain('Внимание! Дата окончания проекта должна быть больше даты его начала.')
            }
        }
        else {
            setTextAlertMain('Внимание! Не все поля заполнены. Пожалуйста, заполните их.')
        }
    }

    const clickCalendarStart = (date: string) => {
        setValueDateStart(date)
    }

    const clickCalendarEnd = (date: string) => {
        setValueDateEnd(date)
    }

    return (
        <div className="transport-edit-modal">
            <div className="transport-edit-modal__title">
                <h1>Редактирование</h1>
                <button className="transport-edit-modal__close-btn" onClick={()=>{
                    hide()
                }}>x</button>
            </div>
            <div className="add-modal-planner__content">
                <div className="add-modal-planner__item">
                    <div className="add-modal-planner__label">Название</div>
                    <input type='text' value={valueName} onChange={changeName}></input>
                    {textAlertName!=='' && <Alert text={textAlertName} type={'warning'}/>}
                </div>
                
                <div className="add-modal-planner__item">
                    <div className="add-modal-planner__label">Описание</div>
                    <textarea value={valueDesc} onChange={changeAreaDesc}/>
                    {textAlertDesc!=='' && <Alert text={textAlertDesc} type={'warning'}/>}
                </div>
                <div className="add-modal-planner__item-container">
                    <div className="add-modal-planner__item">
                        <div className="add-modal-planner__label">Дата начала проекта</div>
                        <Calendar onCickCalendar={clickCalendarStart} initialDate={valueDateStart}/>
                    </div>
                    <div className="add-modal-planner__item">
                        <div className="add-modal-planner__label">Дата окончания проекта</div>
                        <Calendar onCickCalendar={clickCalendarEnd} initialDate={valueDateEnd}/>
                    </div>
                </div>
                {textAlertMain !== '' && <Alert text={textAlertMain} type={'Error'}/>}   
            </div>
            <div className="edit-modal__footer">
                <button className="edit-modal__add-btn" onClick={editProject}>Редактировать</button>
                <button className="edit-modal__cancel-btn" onClick={()=>{
                    hide()
                }}>Отменить</button>
            </div>
        </div>
    )
}