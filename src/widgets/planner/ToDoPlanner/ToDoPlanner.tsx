import React, { useContext } from "react"
// import { useTodo } from "../../../hooks/planner/plannerHooks"
import { IListItem, IToDo } from "../../../app/types/planner/IPlanner"
import { ModalContext } from "../../../features/context/modalProperty/ModalContext"
import { Modal } from "../../modalWindow/Modal"
import { SHOW_PLANNER_ADD } from "../../modalWindow/types"
import { AddModal } from "../AddModal/AddModal"
import { ImportantTodayItem } from "../ImportantToday/ImportantTodayItem"
import { ToDoItem } from "./ToDoItem"
import './toDoPlanner.css'

interface ITodoDTO {
    user_id?: number,
    date_start: Date,//здесь должен быть формат даты типа dd.mm.yyyy
    date_end: Date,//здесь должен быть формат даты типа dd.mm.yyyy
    title: string,
    // start_time: string,
    // end_time: string,
    description: string, 
    items?: IListItem[],
    expense: number, //расходы
    done: boolean
}

interface IToDoPlanner {
    data: IToDo[],
    addTodo: (newTodo: ITodoDTO) => void,
    remTodo: (id: number) => void,
    day: number,
    month: string, 
    year: number,
    onEditListItem: (id: number, idInner?: number)=>void
}

export function ToDoPlanner({day, month, year, data, addTodo, remTodo, onEditListItem}:IToDoPlanner) {
    const {show} = useContext(ModalContext)
    const modal = useContext(ModalContext)

    const onAddTodo = (newTodo: ITodoDTO) => {
        addTodo(newTodo)
    }

    const onRemTodo = (id: number) => {
        remTodo(id)
    }

    const editListItem = (id: number, idInner?: number) => {
        if(idInner) {
            onEditListItem(id, idInner)
        }
        else {
            onEditListItem(id)
        }
        
    }

    return (
        <>
        {modal.modal.visible && 
            <Modal>
                {modal.modal.kind === 
                   SHOW_PLANNER_ADD && <AddModal addTodo={onAddTodo} day={String(day)} month={month} year={String(year)}></AddModal>
                    // modal.modal.kind === ASSETS_BUSINESS_EDIT ? <EditModal businessDto={businessDto!} onEditBusinessItem={editBusinessItem}></EditModal>: 
                    // modal.modal.kind === ASSETS_BUSINESS_INCOME ?  <IncomeModal></IncomeModal> :
                    // modal.modal.kind === ASSETS_BUSINESS_DELETE ? <DeleteModalWindow onRemoveItem={removeItem}></DeleteModalWindow>:
                    // <InventoryModalWindow id={idDt}/>
                }
                
            </Modal>
        }
        <div className="to-do">
            <div className="to-do__header">
                <h2>{day} {month} {year}</h2>
                <button className="to-do__add-btn" onClick={()=>show(SHOW_PLANNER_ADD)}>Добавить</button>
            </div>
            <div className="to-do__list">
                {data.length === 0 &&
                    <div className="to-do__msg">Событий на эту дату не запланированно</div>
                }
                {data.map((el: IToDo) => {
                    if(el.expense===0) {
                        return (
                            <ToDoItem data = {el} remTodo={onRemTodo} onEditListItem={editListItem} key={el.id}></ToDoItem>
                         )
                    }
                    else {
                        return (
                            <ImportantTodayItem onRemove={onRemTodo} onEdit={editListItem} data={el} key={el.id}/>
                        )
                    }
                    
                })}
                
            </div>
        </div>
        </>
    )
}