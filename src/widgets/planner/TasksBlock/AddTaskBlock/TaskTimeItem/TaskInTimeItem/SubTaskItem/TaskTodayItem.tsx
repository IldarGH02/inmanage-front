import React, { useState } from "react"
import { Daw } from "../../../../../../elements/Daw/daw" 
import { SubTaskItem } from "./SubTaskItem"

const trash = require('../../../../../assets/img/trash.svg')

export function TaskTodayItem() {
    const [moreVisible, setMoreVisible] = useState(false)

    const changeDaw = ()=> {
        // setDawActive(!dawActive)
        // onChangeItem(data.id!)
    }

    return (
        <div className="task-today-item__wrapper">
            <div className="task-today-item">
                <div className="task-today-item__time">8:20</div>
                <div className="task-today-item__container">
                    <div className="task-today-item__title" onClick={()=>setMoreVisible(!moreVisible)}>Сходить за молоком</div>
                    <div className="task-today-item__actions">
                        <div className="task-today-item__daw">
                            <Daw onChangeDaw={changeDaw} dawActive={false}/>
                        </div>
                        <img className="task-today-item__remove-btn" src={trash} alt="trash" />
                    </div>
                </div>
            </div>
            {moreVisible &&
            <>
                <div className="task-today-item__list">
                    <SubTaskItem color={""} id={0} data={undefined}/>
                </div>
                <div className="task-today-item__desc">
                    <strong>Описание:</strong>
                </div>
            </>
            }
        </div>
    )
}