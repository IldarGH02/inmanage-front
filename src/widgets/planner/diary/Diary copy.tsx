import React, { useEffect, useState } from "react"
import { useTodo } from "../../../features/hooks/planner/plannerHooks"
import { Calendar } from "../Calendar/Calendar"
import { ImportantToday } from "../ImportantToday/ImportantToday"
import { ToDoPlanner } from "../ToDoPlanner/ToDoPlanner"
import "./diary.css"

const monthName: string[] = [
    'Января', 'Февраля', 'Марта', 'Апреля',
    'Мая', 'Июня', 'Июля', 'Августа',
    'Сентября', 'Октября', 'Ноября', 'Декабря'
]

// interface ITodoDTO {
//     user_id?: number,
//     date_start: Date,//здесь должен быть формат даты типа dd.mm.yyyy
//     date_end: Date,//здесь должен быть формат даты типа dd.mm.yyyy
//     title: string,
//     // start_time: string,
//     // end_time: string,
//     description: string, 
//     desc_list?: IListItem[],
//     expense: number, //расходы
//     done: boolean
// }

interface IDate {
    month: number,
    day: number,
    year: number
}

export function Diary() {
    const { todo, getTodo, editTodo, removeTodo, editTodoInner, importantToday, editImportantToday, removeImportantToday } = useTodo()
    // const { importantToday, editImportantToday, removeImportantToday } = useImportantToday()
    const [month, setMonth] = useState(0)
    const [day, setDay] = useState(0)
    const [year, setYear] = useState(0)

    useEffect(()=>{
        setDay(new Date().getDate())
        setMonth(new Date().getMonth())
        setYear(new Date().getFullYear())
        // console.log(new Date().getDate()+'.'+monthName[Number(new Date().getMonth())]+'.'+new Date().getFullYear())
        // getTodo(date.day+'.'+date.month+'.'+date.year)
        // getTodo(new Date().getDate()+'.'+new Date().getMonth()+'.'+new Date().getFullYear())
    },[])

    // const onGetTodo = (date: string) => {
    //     getTodo(date)
    // }

    // const onAddTodo = (newTodo: ITodoDTO) => {
    //     addTodo(newTodo, day +'.' + month + '.' + year)
    // }

    const onRemTodo = (id: number) => {
        removeTodo(id)
        // removeImportantToday(id)
    }

    const onChangeDate = (date: IDate) => {
        setMonth(date.month-1)
        setDay(date.day)
        setYear(date.year)
        getTodo(date.day+'.'+(date.month-1)+'.'+date.year)
    }

    const onEditTodo = (id: number, idInner?: number) => {
        if(idInner) {
            editTodoInner(id,idInner)
        }
        else {
            editTodo(id)
        }
        
    }

    // const onEditTodoInner = (id: number, idInner: number) => {
    //     // console.log(id)
    //     editTodoInner(id,idInner)
    // }
    return (
        <div className="diary">
            <div className="diary__header">
                <div className="diary__title"><h1>Ежедневник</h1></div>
                {/* <div>
                    <button className="reports-page__btn-history">История</button>
                    <button className="reports-page__btn-add">Добавить</button>
                </div> */}
                
            </div>
            <div className="diary__container">
                <div className="diary__calendar">
                    <Calendar changeDate={onChangeDate} addTaskFlag={false}/>
                    <ImportantToday data={importantToday} onEditImportantToday={editImportantToday} onRemoveImportantToday={removeImportantToday}/>
                </div>
                <div className="diary__to-do">
                    <ToDoPlanner onEditListItem={onEditTodo} day={day} month={monthName[month]} year={year} data={todo} addTodo={() => {}} remTodo={onRemTodo}/>
                </div>
            </div>  
        </div> 
    )
}