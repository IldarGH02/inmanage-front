import { useRef, useState } from "react";
import "./taskInTimeItem.css";
import { Daw } from "../../../../../elements/Daw/daw";
import { IPlannerTask } from "../../../../../../app/types/planner/IPlanner";
import { SubTaskItem } from "./SubTaskItem/SubTaskItem";
import { useDispatch } from "react-redux";
import { editDawTask } from "../../../../../../app/store/actions/diaryActions";
import { actionTypes } from "../../../../../../app/store/types/types";

import trash from '../../../../../../shared/assets/img/trash.svg'

interface ITaskInTimeItem {
    data: IPlannerTask
}

export function TaskInTimeItem({data}: ITaskInTimeItem) {
    const [moreVisible, setMoreVisible] = useState(false)
    const timeRef = useRef(getTime())
    const dispatch = useDispatch()

    function getTime() {
        const time = (Number(data.date_end.getHours())>9?data.date_end.getHours():`0${data.date_end.getHours()}`)+':'
        +(data.date_end.getMinutes()>9?data.date_end.getMinutes():`0${data.date_end.getMinutes()}`)
        return time
    }

    const changeDaw = ()=> {
        const res = editDawTask(actionTypes.EDIT_DAW_TASK, data.id!)
        res.then(e => {
            // console.log(e)
            dispatch(e!);
        })
        .catch((e) => {
            console.log(e)
        })
    }

    return (
        <div>
        <div style={{color: data.done?'rgb(203, 203, 205)':data.color}} className="task-today-item">
            <div className="task-today-item__time">{timeRef.current}</div>
            <div className="task-today-item__container">
                <div className="task-today-item__title" onClick={()=>setMoreVisible(!moreVisible)}>{data.title}</div>
                <div className="task-today-item__actions">
                    <div className="task-today-item__daw">
                        <Daw onChangeDaw={changeDaw} dawActive={data.done} color={data.color}/>
                    </div>
                    <img className="task-today-item__remove-btn" src={trash} alt="trash" />
                </div>
            </div>
        </div>
            {moreVisible &&
                <div style={{color: data.color}} className="task-today-subitem">
                     <>
                        <div className="task-today-subitem__tasks">
                            {data.desc_list?.map(el=>{
                                return (
                                    <SubTaskItem id={data.id!} data={el} color={data.color} key={el.id}/>
                                )
                            })}
                        </div>
                        {data.description!=='' && 
                            <div className="task-today-item__desc">
                                <div style={{color:'black'}}><strong className="task-today-item__label-desc" style={{color: "black"}}>Описание: </strong>{data.description}</div>
                            </div>
                        }
                    </>
                </div>
                
            }
        </div>
    )
}