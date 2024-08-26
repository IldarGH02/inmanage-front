import { useState } from "react"
import { IToDo } from "../../../../../app/types/planner/IPlanner"
import { ToDoInnerItem } from "./ToDoInnerItem"

interface IToDoItem {
    data: IToDo,
    remTodo: (id:number) => void, 
    onEditListItem: (id:number, idInner?: number)=>void
} 

// const cart = require('../../../../../assets/img/trash.svg')

export function ToDoItem({data, remTodo, onEditListItem}: IToDoItem) {
    const [descVisible, setDescVisible] = useState(false)
    const [classTitle, setClassTitle] = useState('to-do__item-title')
    const [checkboxValue, setCheckboxValue] = useState(data.done)

    const onRemTodo = () => {
        remTodo(1)
    }

    const editListItem = (idInner: number) => {
        // console.log('asd')
        onEditListItem(1, idInner)
    }

    return ( 
        <div className="to-do__item">
            <span>
                <label className="to-do__item-label-btn">
                    <input type="checkbox" checked={checkboxValue} onChange={()=>{
                        onEditListItem(1)
                        setCheckboxValue(!checkboxValue)
                    }}/>
                    <span onClick={()=>{
                        if(checkboxValue) {
                            setClassTitle('to-do__item-title')
                        }
                        else {
                            setClassTitle('to-do__item-title--active')
                        }
                    }}></span>
                </label>
                <div className="to-do__item-container">
                    
                    <div className={classTitle} onClick={()=>{

                        setDescVisible(!descVisible)
                        
                    
                    }}>{data.title}</div>
                    <div className="to-do__item-time">
                    {`${new Date(data.date_start!).getHours()<10 ?('0'+new Date(data.date_start!).getHours()):(new Date(data.date_start!).getHours())}:${
                            new Date(data.date_start!).getMinutes()<10?'0'+new Date(data.date_start!).getMinutes():new Date(data.date_start!).getMinutes()} - 
                            ${new Date(data.date_end).getHours()<10 ?('0'+new Date(data.date_end).getHours()):(new Date(data.date_end).getHours())}:${
                                new Date(data.date_end).getMinutes()<10?'0'+new Date(data.date_end).getMinutes():new Date(data.date_end).getMinutes()}`}
                    </div>
                    
                    <img className="to-do__item-remove-btn" src={''} onClick={onRemTodo} alt="" />
                </div>
            </span>
            
            {descVisible && 
                <div className="to-do__item-description">
                    {data.description !== '' ? data.description : <div className="to-do__item-description-list">{data.desc_list!.map(el=>{
                        return (
                            <ToDoInnerItem onEditListItem={editListItem} data={el} key={el.id}/>
                        )
                    })}</div>}
                </div>
            }
        </div>
    )
}