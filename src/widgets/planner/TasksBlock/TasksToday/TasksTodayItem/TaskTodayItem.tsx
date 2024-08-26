import { useState } from "react"
import { Daw } from "../../../../elements/Daw/daw"
import { SubTaskItem } from "./SubTaskItem"
import { IPlannerTask } from "../../../../../app/types/planner/IPlanner"
import { useDispatch } from "react-redux"
import { editDawTask } from "../../../../../app/store/actions/diaryActions"
import { actionTypes } from "../../../../../app/store/types/types"

import trash from '../../../../../shared/assets/img/trash.svg'

interface ITaskTodayItem {
    data: IPlannerTask
}

export function TaskTodayItem({data}: ITaskTodayItem) {
    const [moreVisible, setMoreVisible] = useState(false)
    const dispatch = useDispatch()

    const changeDaw = ()=> {
        // console.log(data.date_start.getHours()+':'+(data.date_start.getMinutes()<10?'0'+data.date_start.getMinutes():data.date_start.getMinutes()))
        // dispatch(showLoader(actionTypes.SHOW_LOADER))
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
        <div className="task-today-item__wrapper">
            <div className={`task-today-item${data.done?'--active':''}`}>
                <div className="task-today-item__time">{data.date_start.getHours()+':'+(data.date_start.getMinutes()<10?'0'+data.date_start.getMinutes():data.date_start.getMinutes())}</div>
                <div className="task-today-item__container">
                    <div className="task-today-item__title" onClick={()=>setMoreVisible(!moreVisible)}>{data.title}</div>
                    <div className="task-today-item__actions">
                        <div className="task-today-item__daw">
                            <Daw onChangeDaw={changeDaw} dawActive={data.done}/>
                        </div>
                        <img className="task-today-item__remove-btn" src={trash} alt="trash" />
                    </div>
                </div>
            </div>
            {moreVisible &&
            <div className="task-today-subitem">
            <>
                <div className="task-today-item__list">
                    {data.desc_list?.map(el=>{
                        return (
                            <SubTaskItem data={el} id={data.id!} key={el.id}/>
                        )
                    })}
                    
                </div>
                {data.description!=='' && 
                    <div className="task-today-item__desc">
                        <div><strong className="task-today-item__label-desc">Описание: </strong>{data.description}</div>
                    </div>
                }
                
            </>
            </div>
            }
        </div>
    )
}