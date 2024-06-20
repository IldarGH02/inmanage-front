import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTodo } from "../../../../../features/hooks/planner/project/plannerHooks";
import { IListItem } from "../../../../../app/types/planner/IPlanner";
import { ModalContext } from "../../../../../features/context/modalProperty/ModalContext";
import { Modal } from "../../../../modalWindow/Modal";
import { LIABILITIES_PROJECT_ADD } from "../../../../modalWindow/types";
import { Calendar } from "../../../Calendar/Calendar";
import { ImportantToday } from "../ImportantToday/ImportantToday";
import { AddModal } from "../modalWindows/AddModal/AddModal";
import { ToDoPlanner } from "../ToDo/ToDoPlanner";
import "./innerProject.css"

const monthName: string[] = [
    'Января', 'Февраля', 'Марта', 'Апреля',
    'Мая', 'Июня', 'Июля', 'Августа',
    'Сентября', 'Октября', 'Ноября', 'Декабря'
]

interface ITodoDTO {
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

interface IDate {
    month: number,
    day: number,
    year: number
}

export function InnerProject() {
    const {id} = useParams()
    const { getImportantToday, todo, getTodo, addTodo, editTodo, removeTodo, editTodoInner, importantToday, editImportantToday, removeImportantToday } = useTodo()
    const {show} = useContext(ModalContext)
    const modal = useContext(ModalContext)

    const [month, setMonth] = useState(0)
    const [day, setDay] = useState(0)
    const [year, setYear] = useState(0)

    useEffect(()=>{
        // console.log(id)
        setDay(new Date().getDate())
        setMonth(new Date().getMonth())
        setYear(new Date().getFullYear())
        getTodo(new Date().getDate()+'.'+(new Date().getMonth())+'.'+new Date().getFullYear(), Number(id))
        getImportantToday(new Date().getDate()+'.'+(new Date().getMonth())+'.'+new Date().getFullYear(), Number(id))
    },[])

    // const onGetTodo = (date: string) => {
    //     getTodo(date, Number(id))
    // }

    const onAddTodo = (newTodo: ITodoDTO) => {
        addTodo(newTodo, Number(id), day+'.'+month+'.'+year)
    }

    const onRemTodo = (id: number) => {
        removeTodo(id)
    }

    const onChangeDate = (date: IDate) => {
        setMonth(date.month-1)
        setDay(date.day)
        setYear(date.year)
        getTodo((date.day+'.'+(date.month-1)+'.'+date.year), Number(id))
    }

    const onEditTodoInner = (id: number, idInner?: number) => {
        if(idInner) {
            editTodoInner(id,idInner)
        }
        else {
            editTodo(id)
        }
    }

    return (
        <>
        {modal.modal.visible && 
            <Modal>
                {modal.modal.kind === LIABILITIES_PROJECT_ADD && <AddModal addTodo={onAddTodo}></AddModal>
                }
                
                
            </Modal>
        }
        {/* <div className="wrapper" style={{minWidth: '1860px', backgroundColor: 'black', width:'100vh', height: '100vh'}}> */}
        {/* <div className="content" style={{marginTop:'50px'}}> */}
        <div className="inner-project">
            <div className="inner-project__header">
                <div className="inner-project__title"><h1>Название</h1></div>
                <div>
                    <button className="inner-project__btn-history">История</button>
                    <button className="inner-project__btn-add" onClick={()=>show(LIABILITIES_PROJECT_ADD)}>Добавить</button>
                </div>
                
            </div>
            <div className="inner-project__container">
                <div className="inner-project__calendar">
                    <div className="inner-project__back-btn"><Link to={'/planner'}><b>Назад</b></Link></div>
                    <Calendar changeDate={onChangeDate} addTaskFlag={false}/>
                    <ImportantToday data={importantToday} onEditImportantToday={editImportantToday} onRemoveImportantToday={removeImportantToday}/>
                </div>
                <div className="inner-project__to-do">
                    <ToDoPlanner onEditListItem={onEditTodoInner} day={day} month={monthName[month]} year={year} data={todo} remTodo={onRemTodo}/>
                </div>
            </div>
 
        </div>
        {/* </div> */}
        {/* </div> */}
        </>
    )
}

