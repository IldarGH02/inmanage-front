import React from "react"

interface ITotalBalance {
    sum: number,
    income: number,
    expense: number
}

export function TotalBalance({sum, income, expense}: ITotalBalance) {

    return (
        <div className="balance__total">
            <h3 className="balance__total-title">
                Общий баланс:
            </h3>
            <p className="balance__total-cash">
                {sum.toLocaleString(undefined, {minimumFractionDigits: 1})} ₽
            </p>
            <div className="balance__total-card">
                <h3 className="total__card-title">
                    За месяц:
                </h3>
                <div className="total__card-finance">
                    <div className="card__finance-income">
                        <span>+</span><b>{income.toLocaleString(undefined, {minimumFractionDigits: 1})} ₽</b> 
                    </div>
                    <div className="card__finance-consumption">
                        <span>–</span><b>{expense.toLocaleString(undefined, {minimumFractionDigits: 1})} ₽</b> 
                    </div>
                </div>
            </div>
        </div>
    )
}