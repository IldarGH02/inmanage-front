import React, { useContext, useState } from "react";
import { IProjectItemDTO } from "../../../../../app/types/dto/planner/projects/IProject";
import { Alert } from "../../../../Alert/Alert";
import Calendar from "../../../../Calendar/Calendar";
import { ModalContext } from "../../../../../features/context/modalProperty/ModalContext";
import { InputSum } from "../../../../../shared/ui/input/InputSum/InputSum"; 
import { InputText } from "../../../../../shared/ui/input/InputText/InputTextTest"; 
import "./addModal.css"

// const cart = require('../../../assets/img/trash.svg')

interface IAddModal {
    onAddPropertyItem: (newTodo: IProjectItemDTO)=>void
}

export function AddModal({onAddPropertyItem}: IAddModal) {
    const {hide} = useContext(ModalContext)
    const [valueName, setValueName] = useState('')
    const [textAlertName, setTextAlertName] = useState('')
    const [valueAreaDesc, setValueAreaDesc] = useState('')
    const [textAlertAreaDesc, setTextAlertAreaDesc] = useState('')
    const [textAlertMain, setTextAlertMain] = useState('')
    const [valueDateStart, setValueDateStart] = useState('')
    const [valueDateEnd, setValueDateEnd] = useState('')
    const [valuePlannedSum, setValuePlannedSum] = useState('')
    const [valueReservedSum, setValueReservedSum] = useState('')
    const [valueWriteoffAccount, setValueWriteoffAccount] = useState('')


    const changeAreaDesc = (event: React.FormEvent<HTMLTextAreaElement>) => {
        const maxLength = 500
        const length = event.currentTarget.value.length
        setValueAreaDesc(event.currentTarget.value)
        if(length<=maxLength) {
            setTextAlertAreaDesc('')
        }
        else {
            setTextAlertAreaDesc(`допустимое количество символов превышено на ${length - maxLength}`)
        }
    }

    const onAddTodo = () => {
        if(valueDateStart !== '' && valueDateEnd !== '' && textAlertAreaDesc === '' && valueAreaDesc !== '' && valueName !== '' && textAlertName === '' && valueWriteoffAccount!=='') {
            let dt1 = valueDateStart.split('.')
            let dt2 = valueDateEnd.split('.')
            if(Number(dt1[2])<Number(dt2[2]) || (Number(dt1[2])===Number(dt2[2]) && Number(dt1[1])<Number(dt2[1])) || (Number(dt1[2])===Number(dt2[2]) && Number(dt1[1])===Number(dt2[1]) && Number(dt1[0])<Number(dt2[0]))) {
                const newTodo: IProjectItemDTO = {
                    // id: Number(new Date()),
                    name: valueName,
                    description: valueAreaDesc,
                    date_start: new Date(Number(dt1[2]), Number(dt1[1]), Number(dt1[0])),
                    date_end: new Date(Number(dt2[2]), Number(dt2[1]), Number(dt2[0])),
                    planned_sum: Number(valuePlannedSum.replace(/ /g,'')),
                    reserved_sum: Number(valueReservedSum.replace(/ /g,'')),
                    writeoff_account: valueWriteoffAccount
                }
                onAddPropertyItem(newTodo)
                hide()
            }
            else {
                setTextAlertMain('Внимание! Дата начала проекта должна быть больше даты завершения.')
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
        <div className="add-modal-project">
            <div className="add-modal-project__title">
                <h1>Добавление новой задачи</h1>
                <button className="add-modal-project__close-btn" onClick={hide}>x</button>
            </div>
            <div className="add-modal-project__content">
                <div className="add-modal-project__item">
                    <div className="add-modal-project__label">Название</div>
                    <InputText length={30} value={valueName} setAlert={setTextAlertName} setValue={setValueName} attentionFlag/>
                    {/* <input type='text' value={valueName} onChange={changeName}></input> */}
                    {/* {textAlertName!=='' && <Alert text={textAlertName} type={'warning'}/>} */}
                </div>
                
                <div className="add-modal-project__item">
                    <div className="add-modal-project__label">Описание</div>
                    <textarea value={valueAreaDesc} onChange={changeAreaDesc}/>
                    {textAlertAreaDesc!=='' && <Alert text={textAlertAreaDesc} type={'warning'}/>}
                </div>
                <div className="add-modal-project__item-container">
                    <div className="add-modal-project__item">
                        <div className="add-modal-project__label">Планируемая сумма</div>
                        <InputSum length={10} value={valuePlannedSum} setValue={setValuePlannedSum}/>
                    </div>
                    <div className="add-modal-project__item">
                        <div className="add-modal-project__label">Зарезервированные средства</div>
                        <InputSum length={10} value={valueReservedSum} setValue={setValueReservedSum}/>
                    </div>
                </div>
                <div className="add-modal-project__item">
                    <div className="add-modal-project__label">Счет списания</div>
                    <InputText length={30} value={valueWriteoffAccount} setValue={setValueWriteoffAccount} attentionFlag/>
                </div>
                <div className="add-modal-project__item-container">
                    <div className="add-modal-project__item">
                        <div className="add-modal-project__label">Дата начала проекта</div>
                        <Calendar onCickCalendar={clickCalendarStart}/>
                    </div>
                    <div className="add-modal-project__item">
                        <div className="add-modal-project__label">Дата окончания проекта</div>
                        <Calendar onCickCalendar={clickCalendarEnd}/>
                    </div>
                </div>
                {textAlertMain !== '' && <Alert text={'Не все поля заполнены корректно! Пожалуйста, заполните их.'} type={'Error'}/>}   
            </div>
            <div className="add-modal-project__footer">
                <button className="add-modal-project__add-btn" onClick={onAddTodo}>Добавить</button>
                <button className="add-modal-project__cancel-btn" onClick={hide}>Отменить</button>
            </div>
        </div>
    )
}