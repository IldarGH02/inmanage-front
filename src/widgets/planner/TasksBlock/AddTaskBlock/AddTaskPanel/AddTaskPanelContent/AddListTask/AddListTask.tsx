import React, { useEffect, useState } from "react";
import "./addListTask.css";
import { IListItem, IPlannerTaskAdd } from "../../../../../../../app/types/planner/IPlanner";

import trash from '../../../../../../../shared/assets/img/trash.svg'

interface IAddListTask {
    data: IPlannerTaskAdd,
    onChangeTaskAdd: (obj: IPlannerTaskAdd) => void 
}

export function AddListTask({data, onChangeTaskAdd}: IAddListTask) {
    const [valueInput, setValueInput] = useState('')
    const [textAlert, setTextAlert] = useState('')
    const [tasks, setTasks] = useState<IListItem[]>([])
    const [addBtnActive, setAddBtnActive] = useState(false)

    useEffect(()=>{
        const taskTmp = {...data}
        taskTmp.task!.desc_list = tasks
        onChangeTaskAdd(taskTmp)
    }, [tasks])

    const addItem = () => {
        if(textAlert==='' && valueInput.trim()!=='') {
            setAddBtnActive(false)
            setTasks(prev=>[...prev, {id: Number(new Date()), text:valueInput, done: false}])
            // onAddPosition(valueInput)
            setValueInput('')
        }
    }

    const removeItem = (id: number) => {
        const newTasks = tasks.filter(el=>id!==el.id)
        setTasks(newTasks)
    }

    const changeValue = (event: React.FormEvent<HTMLInputElement>) => {
        const maxLength = 30
        const lengthCurrent = event.currentTarget.value.replace(/ /g,'').length
        setValueInput(event.currentTarget.value)
        if(lengthCurrent<=maxLength) {
            if(event.currentTarget.value.trim()!=='') {
                setAddBtnActive(true)
            } else {
                setAddBtnActive(false)
            }
            setTextAlert('')
        }
        else {
            setAddBtnActive(false)
            setTextAlert(`кол-во символов превышено на ${lengthCurrent - maxLength}`)
        }
    }

    return (
        <div className="add-list-task">
            <div className="add-list-task__header">
                <div className="add-list-task__title">Список дел:</div>
                <div className="add-list-task__input">
                    <input type="text" placeholder="Добавить новое" value={valueInput} onChange={changeValue} />
                    <button className={`add-list-task__add-btn${addBtnActive?'--active':''}`} onClick={addItem}>+</button>
                </div>
            </div>
            <div className="add-list-task__list">
                {tasks.map(el=>{
                    return (
                        <div className="add-list-task-item" key={el.id}>
                            <div className="add-list-task-item__title">{el.text}</div>
                            <img className="add-list-task-item__remove-btn" src={trash} onClick={()=>removeItem(el.id)}></img>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}