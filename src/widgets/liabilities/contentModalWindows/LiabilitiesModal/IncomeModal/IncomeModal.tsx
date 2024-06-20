import React, { useContext, useState } from "react";
import Calendar from "../../../../Calendar/Calendar";
import { ModalContext } from "../../../../../features/context/modalProperty/ModalContext";

// import { Calendar } from "../../../../Calendar/Calendar";
import "./incomeModal.css"

export function IncomeModal() {
    // const [date, setDate] = useState(null)
    const [valueExpense, setValueExpense] = useState(0)
    const {hide} = useContext(ModalContext)
    document.getElementById('rent1')?.addEventListener('click', ()=>{
        // document.getElementById('rent2')?.prop('checked', false)
    })

    const changeExpense = (event: React.FormEvent<HTMLInputElement>) => {
        setValueExpense(Number(event.currentTarget.value))
    }

    return (
        <div className="income-modal">
            <div className="income-modal__title">
                <h1>Внесение расхода</h1>
                <button className="income-modal__close-btn" onClick={()=>hide()}>x</button>
            </div>
            <div className="income-modal__content">
                <div className="income-modal__item">
                    <div className="income-modal__label">Расход пассива</div>
                    <input type="number" value={valueExpense} onChange={changeExpense}/>
                </div>
                <div className="income-modal__item">
                    <div className="income-modal__label">Дата</div>
                    {/* <input type="number" value={valueExpense} onChange={changeExpense}/> */}
                    {/* {date && <p>Выбранная дата: {date}</p>} */}
                    <Calendar onCickCalendar={undefined}/>
                </div>
            </div>
            <div className="income-modal__footer">
                <button className="income-modal__add-btn">Внести расход</button>
                <button className="income-modal__cancel-btn" onClick={()=>hide()}>Отменить</button>
            </div>
        </div>
    )
}