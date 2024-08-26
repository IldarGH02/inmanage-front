import "./expenseBalance.css"

interface IExpenseBalance {
    sum: number
}

export function ExpenseBalance({sum}: IExpenseBalance) {

    return (
        <div className="expense-balance">
            <div className="expense-balance__title">Расходы</div>
            <div className="expense-balance__sum-container">                
                <div className="expense-balance__sum">{sum.toLocaleString(undefined, {minimumFractionDigits: 1})} </div>
                <div className="expense-balance__valuta">₽</div>
            </div>
        </div>
    )
}