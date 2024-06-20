import React, { useState } from "react"
import "./incomeModal.css"
import Calendar from "../../../Calendar/Calendar"
import { InputSum } from "../../../../shared/ui/input/InputSum/InputSumTest"

interface IIncomeModal {
    onClose: ()=>void,
    liabilities?: boolean
}

export function IncomeModal({onClose, liabilities=false}: IIncomeModal) {
    const [date, setDate] = useState('')
    const [valueIncome, setValueIncome] = useState('')
    const [valueExpense, setValueExpense] = useState('')

    const [textAlertIncome, setTextAlertIncome] = useState('')
    const [textAlertExpense, setTextAlertExpense] = useState('')

    const clickCalendar = (date: string) => {
        setDate(date)
    }

    const clickAddBtn = () => {
        if(valueIncome!=='' && valueExpense!=='' && textAlertIncome==='' && textAlertExpense==='') {
            onClose()
        }
    }

    console.log(date)

    return (
        <div className="income-modal">
            <div className="income-modal__header">
                <h1 className="income-modal__title">{`Внесение ${liabilities?'':'дохода/'}расхода`}</h1>
                <button className="income-modal__close-btn" onClick={onClose}>x</button>
            </div>
            <div className="income-modal__content">
                {!liabilities && 
                <div className="income-modal__item">
                    <div className="income-modal__label">Доход актива</div>
                    <InputSum length={10} value={valueIncome} setValue={setValueIncome} setAlert={setTextAlertIncome} alertSignal={textAlertIncome}></InputSum>
                </div>
                }
                <div className="income-modal__item">
                    <div className="income-modal__label">Расход актива</div>
                    <InputSum length={10} value={valueExpense} setValue={setValueExpense} setAlert={setTextAlertExpense} alertSignal={textAlertExpense}></InputSum>
                </div>
                <div className="income-modal__item">
                    <div className="income-modal__label">Дата</div>
                    {/* <input type="number" value={valueExpense} onChange={changeExpense}/> */}
                    {/* {date && <p>Выбранная дата: {date}</p>} */}
                    <div className="income-modal__calendar-input"><Calendar onCickCalendar={clickCalendar}/></div>
                </div>
            </div>
            <div className="income-modal__footer">
                <button className="blue-btn income-modal__cancel-btn" onClick={onClose}>Отменить</button>
                <button className="blue-btn income-modal__add-btn" onClick={clickAddBtn}>Подтвердить</button>
            </div>
        </div>
    )
}