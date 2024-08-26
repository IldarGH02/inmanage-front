import {observer} from "mobx-react-lite";
import {FC} from "react";
import { TransportDto } from "../../app/types/dto/DtoTypes.ts"; 
import {MultiAxisLineChart} from "../../widgets/Chart/MultiAxisLineChart/MultiAxisLineChart.tsx";
import {IExpenseBalance, IIncomeBalance} from "../../app/types/balance/IBalance.ts";

interface ITransport {
    transport: TransportDto
    incomes: IIncomeBalance[]
    expenses: IExpenseBalance[]
}

export const TransportInfo: FC<ITransport> = observer((
    {
        transport,
        incomes,
        expenses
    }) => {
    return (
        <ul className="transport__card">
            <li className="transport__card-info">
                <h4 className="transport__info-title">Цена покупки:</h4>
                <b className="transport__info-value">{transport && transport.bought_price.toLocaleString(undefined, {minimumFractionDigits: 1})} ₽</b>
            </li>
            <li className="transport__card-info">
                <h4 className="transport__info-title">Доход:</h4>
                <b className="transport__info-value">{transport && transport.total_income.toLocaleString(undefined, {minimumFractionDigits: 1})} ₽</b>
            </li>
            <li className="transport__card-info">
                <h4 className="transport__info-title">Расход:</h4>
                <b className="transport__info-value">{transport && transport.total_expense.toLocaleString(undefined, {minimumFractionDigits: 1})} ₽</b>
            </li>
            <li className="transport__card-info">
                <h4 className="transport__info-title">Прибыль:</h4>
                <b className="transport__info-value">{transport && (transport.total_income - transport.total_expense).toLocaleString(undefined, {minimumFractionDigits: 1})} ₽</b>
            </li>
            <li className="transport__card-info">
                <h4 className="transport__info-title">Год выпуска:</h4>
                <b className="transport__info-value">{transport && transport.year}</b>
            </li>
            <li className="transport__card-info">
                <h4 className="transport__info-title">Количество владельцев:</h4>
                <b className="transport__info-value">{transport && transport.owner_count}</b>
            </li>
            <li className="transport__card-info">
                <h4 className="transport__info-title">Тип выплаты:</h4>
                <b className="transport__info-value">{transport && transport.loan ? 'кредит' : 'наличные средства'}</b>
            </li>

            <li className="transport__card-info">
                <h4 className="transport__info-title">Доход / месяц:</h4>
                <b className="transport__info-value">{transport && transport.month_income.toLocaleString(undefined, {minimumFractionDigits: 1})} ₽</b>
            </li>
            <li className="transport__card-info">
                <h4 className="transport__info-title">Расход / месяц:</h4>
                <b className="transport__info-value">{transport && transport.month_expense.toLocaleString(undefined, {minimumFractionDigits: 1})} ₽</b>
            </li>
            <li className="transport__card-info">
                <h4 className="transport__info-title">Прибыль / месяц:</h4>
                <b className="transport__info-value">{(transport ? (transport?.month_income - transport?.month_expense) : 0).toLocaleString(undefined, {minimumFractionDigits: 1})} ₽</b>
            </li>
            <div className="transport__info-graph">
                <MultiAxisLineChart incomes={incomes} expenses={expenses}/>
            </div>
        </ul>
    )
})