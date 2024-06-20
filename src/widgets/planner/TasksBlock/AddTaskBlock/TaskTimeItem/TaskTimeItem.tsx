import React, { useEffect, useState } from "react";
import "./taskTimeItem.css";
import { AddTaskPanel } from "../AddTaskPanel/AddTaskPanel";
import { IPlannerTask } from "../../../../../app/types/planner/IPlanner";
import { TaskInTimeItem } from "./TaskInTimeItem/TaskInTimeItem";

interface IPlannerTime {
    time: string,
    active: boolean,
    arrTasks: IPlannerTask[]
}

interface ITaskTimeItem {
    data: IPlannerTime,
    onChangeActive: (id: string)=>void
}

export function TaskTimeItem({data, onChangeActive}: ITaskTimeItem) {
    const [activeItem, setActiveItem] = useState(data.arrTasks.length!==0?true:false)

    useEffect(()=>{
        if(data.arrTasks.length===0) {
            setActiveItem(false)
        } else {
            setActiveItem(true)
        }
    }, [data.arrTasks.length])

    const onChange = (ev: any) => {
        if(ev.target.closest('.task-time-item__task-list')===null && ev.target.closest('.add-task-panel__close-btn')===null && ev.target.closest('.add-task-panel')===null) {
            onChangeActive(data.time)
        }
    }

    return (
        <div className={`task-time-item${activeItem?'--active':''}`} onClick={onChange}>
            <>
            <div className="task-time-item__header">
                {activeItem &&
                    <div className="task-time-item__indicator"></div>
                }
                <div className="task-time-item__title">{data.time}<b>:00</b></div>
            </div>
            {!data.active &&
                <div className="task-time-item__task-list">
                    {data.arrTasks.map(el=>{
                        return (
                            <TaskInTimeItem data={el} key={el.id}/>
                        )
                    })}
                </div>
            }
            </>
            {data.active && 
                <AddTaskPanel onClose={()=>onChangeActive(data.time)} data={data.arrTasks[data.arrTasks.length-1]} currentTime={data.time}/>
            }
            
        </div>
    )
}