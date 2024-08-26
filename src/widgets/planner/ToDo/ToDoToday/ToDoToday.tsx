import { useState } from "react"
import "./toDoToday.css"
import { ToDoTodayItem } from "./ToDoTodayItem/ToDoTodayItem"
import { Categories } from "../../../elements/Categories/Categories"
import { Link } from "react-router-dom"

export function ToDoToday() {
    const categories = ['Общее', 'Календарь', 'Проекты']
    const [category, setCategory] = useState(0)

    return (
        <div className="todo-today">
            <div className="todo-today__header">
                <div className="todo-today__title">
                    Напоминания
                </div>
                <Link to='/planner/task-add' className="todo-today__add-btn">Добавить</Link>
            </div>
            <div className="todo-today__categories">
                <Categories categories={categories} onChangeCategory={setCategory} categoryActive={category}/>
            </div>
            <div className="todo-today__list"> 
                <ToDoTodayItem/>
            </div>
        </div>
    )
}