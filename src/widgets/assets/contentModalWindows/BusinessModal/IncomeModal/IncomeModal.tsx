import React, { useContext, useState } from "react";
import Calendar from "../../../../Calendar/Calendar";
// import { Calendar } from "../../../../Calendar/Calendar";
import { ModalContext } from "../../../../../features/context/modalProperty/ModalContext";
import "./incomeModal.css"

export function IncomeModal() {
    const [valueIncome, setValueIncome] = useState(0)
    const [valueExpense, setValueExpense] = useState(0)
    const {hide} = useContext(ModalContext)
    document.getElementById('rent1')?.addEventListener('click', ()=>{
        // document.getElementById('rent2')?.prop('checked', false)
    })

    const changeIncome = (event: React.FormEvent<HTMLInputElement>) => {
        setValueIncome(Number(event.currentTarget.value))
    }

    const changeExpense = (event: React.FormEvent<HTMLInputElement>) => {
        setValueExpense(Number(event.currentTarget.value))
    }

    return (
        <div className="income-modal">
            <div className="income-modal__title">
                <h1>Внесение дохода</h1>
                <button className="income-modal__close-btn" onClick={()=>hide()}>x</button>
            </div>
            <div className="income-modal__content">
                <div className="income-modal__item">
                    <div className="income-modal__label">Доход актива</div>
                    <input type="number" value={valueIncome} onChange={changeIncome}/>
                </div>
                <div className="income-modal__item">
                    <div className="income-modal__label">Расход актива</div>
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
                <button className="income-modal__add-btn">Внести доход</button>
                <button className="income-modal__cancel-btn" onClick={()=>hide()}>Отменить</button>
            </div>
        </div>
    )
}