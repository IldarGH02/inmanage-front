import React, { useEffect, useState } from "react"
import { IToDo } from "../../../../../app/types/planner/IPlanner"
// import './toDoPlanner.css'

interface IToDoItem {
    data: IToDo,
    onRemove: (id:number) => void,
    onEdit: (id:number) => void
} 

const cart = require('../../../../../assets/img/trash.svg')

export function ImportantTodayItem({data, onRemove, onEdit}: IToDoItem) {
    const [descVisible, setDescVisible] = useState(false)
    const [classTitle, setClassTitle] = useState('important-today__item-title')
    const [checkboxValue, setCheckboxValue] = useState(data.done)

    useEffect(()=>{
        setCheckboxValue(data.done)
        if(data.done) {
            setClassTitle('important-today__item-title--active')
        }
        else {
            setClassTitle('important-today__item-title')
        }
    },[data.done])

    // const onRemTodo = () => {
    //     remTodo(data.id)
    // }

    return ( 
        <div className="important-today__item">
            <span>
                <label className="important-today__item-label-btn">
                    <input type="checkbox" checked={checkboxValue} onChange={()=>{
                        onEdit(1)
                        setCheckboxValue(!checkboxValue)
                    }}/>
                    <span onClick={()=>{
                        if(checkboxValue) {
                            setClassTitle('important-today__item-title')
                        }
                        else {
                            setClassTitle('important-today__item-title--active')
                        }
                    }}></span>
                </label>
                <div className="important-today__item-container">
                    
                    <div className={classTitle} onClick={()=>{

                        setDescVisible(!descVisible)
                        
                    
                    }}>{data.title}</div>
                    <div className="important-today__item-sum">
                        <h5>Сумма</h5>
                        {`${data.expense!.toLocaleString()} ₽`}
                    </div>
                    <div className="important-today__item-time">
                        <h5>Необходимо внести</h5>
                        {`до ${new Date(data.date_end).getHours()<10 ?('0'+new Date(data.date_end).getHours()):(new Date(data.date_end).getHours())}:${
                            new Date(data.date_end).getMinutes()<10?'0'+new Date(data.date_end).getMinutes():new Date(data.date_end).getMinutes()}`}
                    </div>
                    <img className="important-today__item-remove-btn" src={cart} alt="" onClick={()=>onRemove(1)}/>
                </div>
            </span>
            
            {descVisible && 
                <div className="important-today__item-description">
                    {data.description}
                </div>
            }
        </div>
    )
}