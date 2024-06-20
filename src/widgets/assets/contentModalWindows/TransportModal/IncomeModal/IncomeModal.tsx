import React, { useContext, useState } from "react";
import Calendar from "../../../../Calendar/Calendar";
// import { Calendar } from "../../../../Calendar/Calendar";
import { ModalContext } from "../../../../../features/context/modalProperty/ModalContext"; 
import "./incomeModal.css"

const arr = [
    {id: 1, content:'HTML'},
    {id: 2, content:'CSS'},
    {id: 3, content:'JS'},
    {id: 4, content:'TS'},
    {id: 5, content:'SQL'},
    {id: 6, content:'HTML'},
    {id: 7, content:'CSS'},
    {id: 8, content:'JS'},
    {id: 9, content:'TS'},
    {id: 10, content:'SQL'},
    {id: 11, content:'HTML'},
    {id: 12, content:'CSS'},
    {id: 13, content:'JS'},
    {id: 14, content:'TS'},
    {id: 15, content:'SQL'},
    
]

export function IncomeModal() {
    const [valueIncome, setValueIncome] = useState(0)
    const [valueExpense, setValueExpense] = useState(0)
    const [valueTypeIncome, setValueTypeIncome] = useState('')
    const [visibleTypeIncome, setVisibleTypeIncome] = useState(false)
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

    const changeTypeIncome = (event: React.FormEvent<HTMLInputElement>) => {
        setValueTypeIncome(event.currentTarget.value)
    }

    function searchTypeIncome() {
        let input = document.getElementById("inputSearchTypeIncome");
        let filter = (input as HTMLInputElement).value.toUpperCase();
        let ul = document.getElementById("listTypeIncome");
        let li = (ul as HTMLElement).getElementsByTagName("li");
        // Перебирайте все элементы списка и скрывайте те, которые не соответствуют поисковому запросу
        for (let i = 0; i < li.length; i++) {
            let a = li[i].getElementsByTagName("p")[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                (li[i] as HTMLElement).style.display = "";
            } else {
                (li[i] as HTMLElement).style.display = "none";
            }
        }
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
                        <div className="income-modal__label">Тип расхода</div>
                        <input type="text" id="inputSearchTypeIncome" 
                            onKeyUp={searchTypeIncome} 
                            onClick={()=>setVisibleTypeIncome(!visibleTypeIncome)} 
                            value={valueTypeIncome} 
                            onChange={changeTypeIncome} 
                            onBlur={()=>setTimeout(()=>setVisibleTypeIncome(false),200)}/> 
                        {visibleTypeIncome && 
                            <div className="income-modal__search-list" >
                                <div className="search-list__title"><h3>Выберете тип расхода</h3></div>
                                <ul id = 'listTypeIncome'>
                                    {arr.map((el)=>{
                                        return (
                                            <li key={el.id} onClick={()=>setValueTypeIncome(el.content)}><p>{el.content}</p></li>
                                        )
                                    })}
                                </ul>
                            </div>
                        }
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