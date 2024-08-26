import { useState } from "react"
import { IListItem } from "../../../app/types/planner/IPlanner"
import './toDoPlanner.css'

interface IToDoItem {
    data: IListItem,
    onEditListItem: (id:number)=>void
} 

// const cart = require('../../../actives/img/trash.svg')

export function ToDoInnerItem({data, onEditListItem}: IToDoItem) {
    const [classTitle, setClassTitle] = useState(!data.done?'to-do__item-title':'to-do__item-title--active')
    const [checkboxValue, setCheckboxValue] = useState(data.done)

    const editListItem = ()=> {
        onEditListItem(data.id)
    }

    return ( 
        <div className="to-do__item-description-list-item">
            <h5 className={classTitle}>{data.text}</h5>
            <span>
                <label className="to-do__item-label-btn">
                    <input type="checkbox" checked={checkboxValue} onChange={()=>{
                        setCheckboxValue(!checkboxValue)
                    }}/>
                    <span onClick={()=>{
                        editListItem()
                        if(checkboxValue) {
                            setClassTitle('to-do__item-title')
                        }
                        else {
                            setClassTitle('to-do__item-title--active')
                        }
                    }}></span>
                </label>
            </span>
            
        </div>
    )
}