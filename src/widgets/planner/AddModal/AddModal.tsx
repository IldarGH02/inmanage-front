import React, { useContext, useState } from "react";
import { IListItem } from "../../../app/types/planner/IPlanner";
import { Alert } from "../../Alert/Alert";
import { ModalContext } from "../../../features/context/modalProperty/ModalContext";
import "./addModal.css"

// const cart = require('../../../assets/img/trash.svg')

const monthName: string[] = [
    'Января', 'Февраля', 'Марта', 'Апреля',
    'Мая', 'Июня', 'Июля', 'Августа',
    'Сентября', 'Октября', 'Ноября', 'Декабря'
]

interface ITodoDTO {
    user_id?: number,
    date_start: Date,//здесь должен быть формат даты типа dd.mm.yyyy
    date_end: Date,//здесь должен быть формат даты типа dd.mm.yyyy
    title: string,
    description: string, 
    items?: IListItem[],
    expense: number, //расходы
    done: boolean
}

interface IAddModal {
    addTodo: (newTodo: ITodoDTO)=>void,
    day: string,
    month:string,
    year: string
}

export function AddModal({addTodo, day, month, year}: IAddModal) {
    const {hide} = useContext(ModalContext)
    const [valueName, setValueName] = useState('')
    const [textAlertName, setTextAlertName] = useState('')
    const [valueAreaDesc, setValueAreaDesc] = useState('')
    const [valueAreaDescExpense, setValueAreaDescExpense] = useState('')
    const [valueInputDesc, setValueInputDesc] = useState('')
    const [textAlertAreaDescExpense, setTextAlertAreaDescExpense] = useState('')
    const [textAlertAreaDesc, setTextAlertAreaDesc] = useState('')
    const [textAlertInputDesc, setTextAlertInputDesc] = useState('')
    const [textAlertExpenses, setTextAlertExpenses] = useState('')
    const [mainAlertVisible, setMainAlertVisible] = useState(false)
    const [valueExpenses, setValueExpenses] = useState('')
    const [valueTimeStart, setValueTimeStart] = useState('')
    const [valueTimeEnd, setValueTimeEnd] = useState('')
    const [descVisible, setDescVisible] = useState(0)
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
        // console.log((textAlertAreaDesc === '' && valueAreaDesc !== '' && descVisible === 0))
        if(valueTimeStart !== '' && valueTimeEnd !== '' && ((textAlertExpenses === '' && valueExpenses!=='' && valueExpenses!=='0' && textAlertAreaDescExpense === '' && valueAreaDescExpense !== '' && descVisible === 2) || (textAlertAreaDesc === '' && valueAreaDesc !== '' && descVisible === 0) || (descVisible ===1 && listItem.length!==0)) && valueName !== '' && textAlertName === '') {
            let m = Number(monthName.indexOf(month))//?
            
            let time1 = valueTimeStart.split(':')
            let time2 = valueTimeEnd.split(':')
            if(time1[0]>time2[0] || (time1[0]==time2[0] && time1[1]>time2[1])) {
                setMainAlertVisible(true)
                return
            }
            // let desc = ''
            // if(descVisible==)
            const newTodo: ITodoDTO = {
                user_id: 1,
                date_start: new Date(Number(year), m, Number(day), Number(time1[0]), Number(time1[1])),
                date_end: new Date(Number(year), m, Number(day), Number(time2[0]), Number(time2[1])),
                title: valueName,
                // start_time: valueTimeStart,
                // end_time: valueTimeEnd,
                description: descVisible === 0 ? valueAreaDesc : descVisible === 2 ? valueAreaDescExpense : '',
                done: false,
                items: descVisible === 1 ? listItem : [],
                expense: descVisible === 2 ? Number(valueExpenses.replace(/ /g,'')) : 0
            }
            // console.log(newTodo)
            addTodo(newTodo)
            hide()
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

    return (
        <div className="add-modal-planner">
            <div className="add-modal-planner__title">
                <h1>Добавление новой задачи</h1>
                <button className="add-modal-planner__close-btn" onClick={hide}>x</button>
            </div>
            <div className="add-modal-planner__content">
                <div className="add-modal-planner__item">
                    <div className="add-modal-planner__label">Название</div>
                    <input type='text' value={valueName} onChange={changeName}></input>
                    {textAlertName!=='' && <Alert text={textAlertName} type={'warning'}/>}
                </div>
                <div className="add-modal-planner__item">
                    <div className="add-modal-planner__item-label-container">
                        <div className={`add-modal-planner__label${descVisible===0 ? '-active' : '-unactive'}`} onClick={()=>setDescVisible(0)}>Описание</div>
                        <div className={`add-modal-planner__label${descVisible===1 ? '-active' : '-unactive'}`} onClick={()=>setDescVisible(1)}>Список</div>
                        <div className={`add-modal-planner__label${descVisible===2 ? '-active' : '-unactive'}`} onClick={()=>setDescVisible(2)}>Расходы</div>
                    </div>
                    {descVisible === 0 && 
                        <div className="add-modal-planner__item-desc">
                            <textarea placeholder="Введите описание" value={valueAreaDesc} onChange={changeAreaDesc}/>
                            {textAlertAreaDesc!=='' && <Alert text={textAlertAreaDesc} type={'warning'}/>}
                        </div>
                    }
                    {descVisible === 1 && 
                        <div className="add-modal-planner__item-desc">
                            <div className="add-modal-planner__item-desc-container">
                                <input type="text" placeholder="Введите название" value={valueInputDesc} onChange={changeInputDesc}/>
                                <button onClick={addItem}>Добавить</button>
                            </div>
                            {textAlertInputDesc!=='' && <Alert text={textAlertInputDesc} type={'warning'}/>}
                            <div className="add-modal-planner__item-list">
                            {listItem.map(el=>{
                                return (
                                    <div key={el.id} className="add-modal-planner__item-list-elem">
                                        <div>{el.text}</div>
                                        <img className="add-modal-planner__item-remove-btn" src={''} alt="" onClick={()=>removeListItem(el.id)}/>
                                    </div>
                                )
                            })}
                            </div>  
                        </div>
                    }
                    {descVisible === 2 && 
                    <>
                        <div className="add-modal-planner__item-desc">
                            <input  type="text" placeholder="Введите сумму расхода" value={valueExpenses} onChange={changeExpenses} onKeyDown={()=>setValueExpenses(discharge(valueExpenses))} onKeyUp={()=>setValueExpenses(discharge(valueExpenses))}/>
                            <b> руб.</b>
                            {textAlertExpenses!=='' && <Alert text={textAlertExpenses} type={'warning'}/>}
                            <textarea placeholder="Введите описание" value={valueAreaDescExpense} onChange={changeAreaDescExpense}/>
                            {textAlertAreaDescExpense!=='' && <Alert text={textAlertAreaDescExpense} type={'warning'}/>}
                        </div>
                        {/* <div className="add-modal-planner__item-desc">
                            <textarea value={valueAreaDesc} onChange={changeAreaDesc}/>
                            {textAlertAreaDesc!=='' && <Alert text={textAlertAreaDesc} type={'warning'}/>}
                        </div> */}
                    </>
                    }
                    
                </div>
                {/* <div className="add-modal-planner__item">
                    <div className="add-modal-planner__label">Описание</div>
                    <textarea value={valueDesc} onChange={changeDesc}/>
                    {textAlertDesc!=='' && <Alert text={textAlertDesc} type={'warning'}/>}
                </div> */}
                <div className="add-modal-planner__item-container">
                    <div className="add-modal-planner__item">
                        <div className="add-modal-planner__label">Время начала</div>
                        <input type="time" value={valueTimeStart} min={0} max={23} onChange={e=>setValueTimeStart(e.currentTarget.value)}></input>
                    </div>
                    <div className="add-modal-planner__item">
                        <div className="add-modal-planner__label">Время окончания</div>
                        <input type="time" value={valueTimeEnd} min={0} max={23} onChange={e=>setValueTimeEnd(e.currentTarget.value)}></input>
                    </div>
                </div>
                {mainAlertVisible && <Alert text={'Не все поля заполнены корректно! Пожалуйста, заполните их.'} type={'Error'}/>}   
            </div>
            <div className="add-modal-planner__footer">
                <button className="add-modal-planner__add-btn" onClick={onAddTodo}>Добавить</button>
                <button className="add-modal-planner__cancel-btn" onClick={hide}>Отменить</button>
            </div>
        </div>
    )
}