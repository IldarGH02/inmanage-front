import { FC } from "react"
import "./financeTable.css"

interface IFinanceTable {
    setShow: (bool: boolean) => void,
    income?: number,
    price?: number, 
    expenses: number, 
    profit?: number,
    remainder?: number,
    common_title?: string
    income_title: string
    expenses_title?: string
}

export const FinanceTable: FC<IFinanceTable> = (
    {
        setShow, 
        profit, 
        remainder,
        common_title,
        income_title,
        expenses_title
    }) => {

    const handleShow = () => {
        setShow(true)
    }

    return (
        <div className="finance-table">
            {
                income_title &&
                <>
                    <div className="finance-table__block finance-table__income">
                        <div className="finance-table__finance-wrapper">
                            <h4 className="finance-table__title">{income_title}</h4>
                            <div className="finance-table__sum-wrapper">
                                {/* <b className="finance-table__sum">{`${income!==undefined?income.toLocaleString(undefined, {minimumFractionDigits: 1}):price?.toLocaleString(undefined, {minimumFractionDigits: 1})}`}</b> */}
                                <b className="finance-table__valuta">₽</b>
                            </div>
                        </div>
                    </div>
                    <div className="finance-table__pointer">|</div>
                </>
            }


            {
                expenses_title &&
                <>
                    <div className="finance-table__block finance-table__expense">
                        <div className="finance-table__finance-wrapper">
                            <h4 className="finance-table__title">{expenses_title}</h4>
                            <div className="finance-table__sum-wrapper">
                                {/* <div className="finance-table__sum">{expenses.toLocaleString(undefined, {minimumFractionDigits: 1})}</div> */}
                                <div className="finance-table__valuta">₽</div>
                            </div>
                        </div>
                    </div>
                    <div className="finance-table__pointer">|</div>
                </>
            }

            
            { 
                common_title && 
                <>
                    <div className="finance-table__block finance-table__profit">
                        <div className="finance-table__finance-wrapper">
                            <h4 className="finance-table__title">{common_title}</h4>
                            <div className="finance-table__sum-wrapper">
                                <b className="finance-table__sum">{`${profit!==undefined?profit.toLocaleString(undefined, {minimumFractionDigits: 1}):remainder?.toLocaleString(undefined, {minimumFractionDigits: 1})}`}</b>
                                <b className="finance-table__valuta">₽</b>
                            </div>       
                        </div>
                    </div>  
                </>  
            }
            <button onClick={handleShow} className="finance-table__add-btn">Добавить</button>
        </div>
    )
}