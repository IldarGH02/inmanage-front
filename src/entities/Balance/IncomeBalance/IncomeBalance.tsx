import React from "react"
import "./incomeBalance.css"

interface IIncomeBalance {
    sum: number 
}

export function IncomeBalance({sum}: IIncomeBalance) {
    return (
        <div className="income-balance">
            <div className="income-balance__title">Доходы</div>
            <div className="income-balance__sum-container">
                <div className="income-balance__sum">{sum.toLocaleString(undefined, {minimumFractionDigits: 1})}</div>
                <div className="income-balance__valuta">₽</div>
            </div>
        </div>
    )
}