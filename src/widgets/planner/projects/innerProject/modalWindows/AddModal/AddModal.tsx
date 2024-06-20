import React, { useContext, useState } from "react";
import { IListItem } from "../../../../../../app/types/planner/IPlanner";
import { Alert } from "../../../../../Alert/Alert";
import Calendar from "../../../../../Calendar/Calendar";
import { ModalContext } from "../../../../../../features/context/modalProperty/ModalContext";
import "./addModal.css"

const cart = require('../../../../../../assets/img/trash.svg')

interface ITodoDTO {
    date_start: Date,//здесь должен быть формат даты типа dd.mm.yyyy
    date_end: Date,//здесь должен быть формат даты типа dd.mm.yyyy
    title: string,
    // start_time: Date,
    // end_time: Date,
    description: string, 
    items?: IListItem[],
    expense: number, //расходы
    done: boolean
}

interface IAddModal {
    addTodo: (newTodo: ITodoDTO)=>void
}

export function AddModal({addTodo}: IAddModal) {
    const {hide} = useContext(ModalContext)
    const [valueName, setValueName] = useState('')
    const [textAlertName, setTextAlertName] = useState('')
    const [valueAreaDesc, setValueAreaDesc] = useState('')
    const [valueInputDesc, setValueInputDesc] = useState('')
    const [textAlertAreaDesc, setTextAlertAreaDesc] = useState('')
    const [textAlertInputDesc, setTextAlertInputDesc] = useState('')
    const [textAlertExpenses, setTextAlertExpenses] = useState('')
    const [textAlertAreaDescExpense, setTextAlertAreaDescExpense] = useState('')
    const [mainAlertVisible, setMainAlertVisible] = useState(false)
    const [valueExpenses, setValueExpenses] = useState('')
    const [valueTimeStart, setValueTimeStart] = useState('')
    const [valueTimeEnd, setValueTimeEnd] = useState('')
    const [descVisible, setDescVisible] = useState(0)
    const [valueAreaDescExpense, setValueAreaDescExpense] = useState('')
    const [valueDateStart, setValueDateStart] = useState('')
    const [valueDateEnd, setValueDateEnd] = useState('')
    const [listItem, setListItem]  = useState<IListItem[]>([])

    ////////////
    function discharge(str:string): string {
        return str.replace(/[^0-9.]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }
    ////////////

    const changeName = (event: React.FormEvent<HTMLInputElement>) => {
        const maxLength = 30
        const length = event.currentTarget.value.length
        setValueName(event.currentTarget.value)
        if(length<=maxLength) {
            setTextAlertName('')
            // dataArr.name = event.currentTarget.value
        }
        else {
            // dataArr.name = ''
            setTextAlertName(`допустимое количество символов превышено на ${length - maxLength}`)
        }
    }

    const changeAreaDesc = (event: React.FormEvent<HTMLTextAreaElement>) => {
        const maxLength = 500
        const length = event.currentTarget.value.length
        setValueAreaDesc(event.currentTarget.value)
        if(length<=maxLength) {
            setTextAlertAreaDesc('')
            // dataArr.name = event.currentTarget.value
        }
        else {
            // dataArr.name = ''
            setTextAlertAreaDesc(`допустимое количество символов превышено на ${length - maxLength}`)
        }
    }

    const changeAreaDescExpense = (event: React.FormEvent<HTMLTextAreaElement>) => {
        const maxLength = 500
        const length = event.currentTarget.value.length
        setValueAreaDescExpense(event.currentTarget.value)
        if(length<=maxLength) {
            setTextAlertAreaDescExpense('')
            // dataArr.name = event.currentTarget.value
        }
        else {
            // dataArr.name = ''
            setTextAlertAreaDescExpense(`допустимое количество символов превышено на ${length - maxLength}`)
        }
    }

    const changeInputDesc = (event: React.FormEvent<HTMLInputElement>) => {
        const maxLength = 50
        const length = event.currentTarget.value.length
        setValueInputDesc(event.currentTarget.value)
        if(length<=maxLength) {
            setTextAlertInputDesc('')
            // dataArr.name = event.currentTarget.value
        }
        else {
            // dataArr.name = ''
            setTextAlertInputDesc(`допустимое количество символов превышено на ${length - maxLength}`)
        }
    }

    const changeExpenses = (event: React.FormEvent<HTMLInputElement>) => {
        const maxLength = 10
        const length = event.currentTarget.value.replace(/ /g,'').length
        setValueExpenses(event.currentTarget.value)
        if(length<=maxLength) {
            setTextAlertExpenses('')
        }
        else {
            setTextAlertExpenses(`допустимое количество символов превышено на ${length - maxLength}`)
        }
    }

    const onAddTodo = () => {
        if(valueTimeStart !== '' && valueTimeEnd !== '' && (textAlertExpenses === '' && valueExpenses!=='' && valueExpenses!=='0' && textAlertAreaDescExpense === '' && valueAreaDescExpense !== '' && descVisible === 2) || (textAlertAreaDesc === '' && valueAreaDesc !== '' && descVisible === 0) || (descVisible ===1 && listItem.length!==0) && valueName !== '' && textAlertName === '') {
            let dt1 = valueDateStart.split('.')
            let dt2 = valueDateEnd.split('.')
            let time1 = valueTimeStart.split(':')
            let time2 = valueTimeEnd.split(':')
            // let m = String(monthName.indexOf(month)+1)//?
            if(Number(dt1[2])<Number(dt2[2]) || (Number(dt1[2])===Number(dt2[2]) && Number(dt1[1])<Number(dt2[1])) || (Number(dt1[2])===Number(dt2[2]) && Number(dt1[1])===Number(dt2[1]) && Number(dt1[0])<Number(dt2[0]))) {
                const newTodo: ITodoDTO = {
                    date_start: new Date(Number(dt1[2]), Number(dt1[1])-1, Number(dt1[0]), Number(time1[0]), Number(time1[1])),
                    date_end: new Date(Number(dt2[2]), Number(dt2[1])-1, Number(dt2[0]), Number(time2[0]), Number(time2[1])),
                    title: valueName,
                    // start_time: valueTimeStart,
                    // end_time: valueTimeEnd,
                    description: descVisible === 0 ? valueAreaDesc : descVisible === 2 ? valueAreaDescExpense : '',
                    done: false,
                    items: descVisible === 1 ? listItem : [],
                    expense: descVisible === 2 ? Number(valueExpenses.replace(/ /g,'')) : 0
                }
                addTodo(newTodo)
                hide()
            }
        }
        else {
            setMainAlertVisible(true)
        }
    }

    const removeListItem = (id: number) => {
        let newList = listItem.filter(el => el.id !== id)
        setListItem(newList)
    }

    const addItem = () => {
        if(valueInputDesc!=='' && textAlertInputDesc==='') {
            let id = 1
            for(let i=0; i<listItem.length;i++) {
                if(listItem[i].id>id) {
                    id = listItem[i].id
                }
            }
            console.log(listItem)
            let newItem: IListItem = {
                id:id+1,
                text:valueInputDesc,
                done: false
            } 
            setListItem(prev=>[...prev, newItem])
            setValueInputDesc('')
        }
    }

    const clickCalendarStart = (date: string) => {
        setValueDateStart(date)
    }

    const clickCalendarEnd = (date: string) => {
        setValueDateEnd(date)
    }

    return (
        <div className="add-modal-project-item">
            <div className="add-modal-project-item__title">
                <h1>Добавление новой задачи</h1>
                <button className="add-modal-project-item__close-btn" onClick={hide}>x</button>
            </div>
            <div className="add-modal-project-item__content">
                <div className="add-modal-project-item__item">
                    <div className="add-modal-project-item__label">Название</div>
                    <input type='text' value={valueName} onChange={changeName}></input>
                    {textAlertName!=='' && <Alert text={textAlertName} type={'warning'}/>}
                </div>
                <div className="add-modal-project-item__item">
                    <div className="add-modal-project-item__item-label-container">
                        <div className={`add-modal-project-item__label${descVisible===0 ? '-active' : '-unactive'}`} onClick={()=>setDescVisible(0)}>Описание</div>
                        <div className={`add-modal-project-item__label${descVisible===1 ? '-active' : '-unactive'}`} onClick={()=>setDescVisible(1)}>Список</div>
                        <div className={`add-modal-project-item__label${descVisible===2 ? '-active' : '-unactive'}`} onClick={()=>setDescVisible(2)}>Расходы</div>
                    </div>
                    {descVisible === 0 && 
                        <div className="add-modal-project-item__item-desc">
                            <textarea value={valueAreaDesc} onChange={changeAreaDesc}/>
                            {textAlertAreaDesc!=='' && <Alert text={textAlertAreaDesc} type={'warning'}/>}
                        </div>
                    }
                    {descVisible === 1 && 
                        <div className="add-modal-project-item__item-desc">
                            <div className="add-modal-project-item__item-desc-container">
                                <input type="text" placeholder="Введите название" value={valueInputDesc} onChange={changeInputDesc}/>
                                <button onClick={addItem}>Добавить</button>
                            </div>
                            {textAlertInputDesc!=='' && <Alert text={textAlertInputDesc} type={'warning'}/>}
                            <div className="add-modal-project-item__item-list">
                            {listItem.map(el=>{
                                return (
                                    <div className="add-modal-project-item__item-list-elem" key={el.id}>
                                        <div>{el.text}</div>
                                        <img className="add-modal-project-item__item-remove-btn" src={cart} alt="" onClick={()=>removeListItem(el.id)}/>
                                    </div>
                                )
                            })}
                            </div>  
                        </div>
                    }
                    {descVisible === 2 && 
                        <div className="add-modal-project-item__item-desc">
                            <input  type="text" placeholder="Введите сумму расхода" value={valueExpenses} onChange={changeExpenses} onKeyDown={()=>setValueExpenses(discharge(valueExpenses))} onKeyUp={()=>setValueExpenses(discharge(valueExpenses))}/>
                            <b> руб.</b>
                            {textAlertExpenses!=='' && <Alert text={textAlertExpenses} type={'warning'}/>}
                            <textarea placeholder="Введите описание" value={valueAreaDescExpense} onChange={changeAreaDescExpense}/>
                            {textAlertAreaDescExpense!=='' && <Alert text={textAlertAreaDescExpense} type={'warning'}/>}
                        </div>
                    }
                    
                </div>
                {/* <div className="add-modal-project-item__item">
                    <div className="add-modal-project-item__label">Описание</div>
                    <textarea value={valueDesc} onChange={changeDesc}/>
                    {textAlertDesc!=='' && <Alert text={textAlertDesc} type={'warning'}/>}
                </div> */}
                <div className="add-modal-project-item__item-container">
                    <div className="add-modal-project-item__item">
                        <div className="add-modal-project-item__label">Дата начала</div>
                        <Calendar onCickCalendar={clickCalendarStart}/>
                    </div>
                    <div className="add-modal-project-item__item">
                        <div className="add-modal-project-item__label">Дата окончания</div>
                        <Calendar onCickCalendar={clickCalendarEnd}/>
                    </div>
                </div>
                <div className="add-modal-project-item__item-container">
                    <div className="add-modal-project-item__item">
                        <div className="add-modal-project-item__label">Время начала</div>
                        <span><input type="time" value={valueTimeStart} onChange={e=>setValueTimeStart(e.currentTarget.value)}></input></span>
                    </div>
                    <div className="add-modal-project-item__item">
                        <div className="add-modal-project-item__label">Время окончания</div>
                        <span><input type="time" value={valueTimeEnd} onChange={e=>setValueTimeEnd(e.currentTarget.value)}></input></span>
                    </div>
                </div>
                {mainAlertVisible && <Alert text={'Не все поля заполнены корректно! Пожалуйста, заполните их.'} type={'Error'}/>}   
            </div>
            <div className="add-modal-project-item__footer">
                <button className="add-modal-project-item__add-btn" onClick={onAddTodo}>Добавить</button>
                <button className="add-modal-project-item__cancel-btn" onClick={hide}>Отменить</button>
            </div>
        </div>
    )
}