import React from "react"
import "./financeTable.css"
import { Link } from "react-router-dom"

interface IFinanceTable {
    link: string,
    income?: number,
    price?: number, 
    expenses: number, 
    profit?: number,
    remainder?: number,
}

export function FinanceTable({link, income, price, expenses, profit, remainder}: IFinanceTable) {
    
    return (
        <div className="finance-table">
            <div className="finance-table__block finance-table__income">
                <div className="finance-table__finance-wrapper">
                    <div className="finance-table__title">{`${income!==undefined?'Доходы':'Стоимость'}:`}</div>
                    <div className="finance-table__sum-wrapper">
                        <b className="finance-table__sum">{`${income!==undefined?income.toLocaleString(undefined, {minimumFractionDigits: 1}):price?.toLocaleString(undefined, {minimumFractionDigits: 1})}`}</b>
                        <b className="finance-table__valuta">₽</b>
                    </div>
                </div>
                <div className="finance-table__pointer">|</div>
            </div>
            <div className="finance-table__block finance-table__expense">
                <div className="finance-table__finance-wrapper">
                    <div className="finance-table__title">Расходы:</div>
                    <div className="finance-table__sum-wrapper">
                        <div className="finance-table__sum">{expenses.toLocaleString(undefined, {minimumFractionDigits: 1})}</div>
                        <div className="finance-table__valuta">₽</div>
                    </div>
                </div>
                <div className="finance-table__pointer">|</div>
            </div>

            <div className="finance-table__block finance-table__profit">
                <div className="finance-table__finance-wrapper">
                    <div className="finance-table__title">{`${profit!==undefined?'Прибыль':'Остаток'}:`}</div>
                    <div className="finance-table__sum-wrapper">
                        <b className="finance-table__sum">{`${profit!==undefined?profit.toLocaleString(undefined, {minimumFractionDigits: 1}):remainder?.toLocaleString(undefined, {minimumFractionDigits: 1})}`}</b>
                        <b className="finance-table__valuta">₽</b>
                    </div>
                    
                </div>
            </div>
            <Link to={link} className="finance-table__add-btn">Добавить</Link>
        </div>
    )
}