import React from "react"
import "./expensesToday.css"
import { ExpensesTodayItem } from "./ExpensesTodayItem"
import { useTypedSelector } from "../../../../features/hooks/useTypedSelector"
import { monthName } from "../../dataForCalendar/data"

export function ExpensesToday() {
    const state = useTypedSelector(state => state.diaryReducer)

    const dateEqual = () => {
        if(state.date.getMonth()===new Date().getMonth() &&
        state.date.getFullYear()===(new Date().getFullYear())&& 
        state.date.getDate() === new Date().getDate()) {
            return true
        }
        return false
    }

    return (
        <div className="expenses-today">
            <div className="expenses-today__header">
                <div className="expenses-today__title">
                Расходы на {dateEqual() ? 'сегодня':state.date.getDate() +' '+ monthName[state.date.getMonth()]}
                </div>
                <button className="expenses-today__add-btn">Добавить</button>
            </div>
            <div className="expenses-today__list">
                <ExpensesTodayItem/>
            </div>
        </div>
    )
}