import React, { useState } from "react"
import { Daw } from "../../../../elements/Daw/daw"
import { SubtodoItem } from "./SubtodoItem"

const cart = require('../../../../../assets/img/trash.svg')

export function ToDoTodayItem() {
    const [moreVisible, setMoreVisible] = useState(false)

    const changeDaw = ()=> {
        // setDawActive(!dawActive)
        // onChangeItem(data.id!)
    }

    return (
        <div className="todo-today-item__wrapper">
            <div className="todo-today-item">
                <div className="todo-today-item__time">8:20</div>
                <div className="todo-today-item__container">
                    <div className="todo-today-item__title" onClick={()=>setMoreVisible(!moreVisible)}>Сходить за молоком</div>
                    <div className="todo-today-item__actions">
                        <div className="todo-today-item__daw">
                            <Daw onChangeDaw={changeDaw} dawActive={false}/>
                        </div>
                        <img className="todo-today-item__remove-btn" src={cart} alt="cart" />
                    </div>
                </div>
            </div>
            {moreVisible &&
            <>
                <div className="todo-today-item__list">
                    <SubtodoItem/>
                </div>
                <div className="todo-today-item__desc">
                    <strong>Описание:</strong>
                </div>
            </>
            }
        </div>
    )
}