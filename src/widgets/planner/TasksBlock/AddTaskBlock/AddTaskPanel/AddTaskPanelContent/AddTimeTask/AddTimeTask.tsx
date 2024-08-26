import { useEffect, useRef, useState } from "react";
import "./addTimeTask.css";
import { IPlannerTask, IPlannerTaskAdd } from "../../../../../../../app/types/planner/IPlanner";

interface IAddTimeTask {
    maxTimeEnd: Date,
    data: IPlannerTask,
    taskAdd: IPlannerTaskAdd,
    onChangeTaskAdd: (obj: IPlannerTaskAdd) => void
}

export function AddTimeTask({maxTimeEnd, data, taskAdd, onChangeTaskAdd}: IAddTimeTask) {
    const contentTime = [
        {
            id: 1,
            name: '5 минут',
            minutes: 5,
            count: 0
        },
        {
            id: 2,
            name: '15 минут',
            minutes: 15,
            count: 0
        },
        {
            id: 3,
            name: '1 час',
            minutes: 60,
            count: 0
        },
        {
            id: 4,
            name: '6 часов',
            minutes: 360,
            count: 0
        }
    ]
    
    const [timeValue, setTimeValue] = useState((setTime(data.date_end)))
    const [arrTime, setArrTime] = useState(contentTime)
    const timeRef = useRef(setTime(maxTimeEnd))

    useEffect(()=>{
        const taskTmp = {...taskAdd}
        if(setTime(data.date_start)!==timeValue) {
            let hours = Math.trunc((timeValue/60))
            let minutes = (timeValue-hours*60)
            let dateTmp = new Date (data.date_start)
            dateTmp.setHours(hours)
            dateTmp.setMinutes(minutes)
            taskTmp.task!.date_end = dateTmp
            taskTmp.steps.step4 = true
        } else {
            taskTmp.steps.step4 = false
        }
        onChangeTaskAdd(taskTmp)
    }, [timeValue])

    function setTime(time: Date) {
        return time.getHours()*60 + time.getMinutes()
    }

    const changeCountElem = (id: number, number: number) => {
        let count = setTime(data.date_start)
        arrTime.forEach(el=>{
            if(el.id===id) {
                count += (el.count+number)*el.minutes
            } else {
                count += el.count*el.minutes
            }
        })
        if(count<=timeRef.current) {
            setTimeValue(count)
            const arrTmp = arrTime.map(el=>{
                if(el.id===id) {
                    el.count += number
                }
                return el
            })
            setArrTime(arrTmp)
        }
        console.log(arrTime)
        
    }

    const getTime = () => {
        let hours = Math.trunc((timeValue/60))
        let minutes = (timeValue-hours*60)
        return (Number(hours)>9?hours:'0'+hours) + ':' + (minutes>9?minutes:'0'+minutes)
    }

    return (
        <div className="add-time-task">
            <div className="add-time-task__header">
                <div className="add-time-task__title">Таймер:</div>
                <div className="add-time-task__time">{timeValue===setTime(data.date_start)?'--:--':getTime()}</div>
                {/* <input className="add-time-task__time" type="time" value={timeValue} onChange={()=>setTimeValue} min="08:00" max="09:00" required></input> */}
            </div>
            <div className="add-time-task__buttons">
                {arrTime.map(el=>{
                    return (
                        <div className={`add-time-task__item${el.count>0?'--active':''}`} key={el.id}>
                            <div className="add-time-task__item-title" onClick={()=>changeCountElem(el.id, 1)}>{el.name}</div>
                            <div className="add-time-task__item-remove-btn" onClick={()=>changeCountElem(el.id, -1)}>
                                &#8212;
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
