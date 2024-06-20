import React, { useEffect, useState } from "react"
import "./taskStep2.css"
import { ITodoDTO } from "../../../../app/types/dto/planner/projects/IProject"
import { IListItem } from "../../../../app/types/planner/IPlanner"
import { InputText } from "../../../../shared/ui/input/InputText/InputTextTest" 

import cart from '../../../../shared/assets/img/trash.svg'

interface ITaskStep2 {
    onChangeBtnVisible: (flag: boolean) => void,
    onChangeValues: (obj: ITodoDTO) => void,
    data: ITodoDTO
}

export function TaskStep2({onChangeBtnVisible, onChangeValues, data}:ITaskStep2) {
    const [listItem, setListItem]  = useState<IListItem[]>([])
    const [valueName, setValueName] = useState('')
    const [alertName, setAlertName] = useState('')

    useEffect(()=>{
        onChangeBtnVisible(true)
    },[])

    const removeListItem = (id: number) => {
        let newList = listItem.filter(el => el.id !== id)
        setListItem(newList)
        data.items = newList
        onChangeValues(data)
    }

    const addItem = () => {
        if(valueName!=='' && alertName==='') {
            let id = 1
            for(let i=0; i<listItem.length;i++) {
                if(listItem[i].id>id) {
                    id = listItem[i].id
                }
            }
            let newItem: IListItem = {
                id:id+1,
                text:valueName,
                done: false
            }
            data.items!.push(newItem) 
            setListItem(prev=>[...prev, newItem])
            onChangeValues(data)
            setValueName('')
        }
    }

    
    return (
        <div className="task-add">
            <div className="task-add__input-container">
                <div className="task-add__input">
                    <InputText length={30} value={valueName} placeHolder={'Введите название'} attentionFlag={true} setValue={setValueName} setAlert={setAlertName}/>
                </div>
                <button className="blue-btn task-add__add-btn" onClick={addItem}>Добавить</button>
            </div>
            <div className="task-add__list">
            {listItem.map(el=>{
                return (
                    <div key={el.id} className="task-add__item">
                        <div className="task-add__item-text">{el.text}</div>
                        <img className="task-add__item-remove-btn" src={cart} alt="" onClick={()=>removeListItem(el.id)}/>
                    </div>
                )
            })}
            </div>  
        </div>
    )
}
