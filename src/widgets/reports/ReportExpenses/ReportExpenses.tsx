import React from "react";
import "./reportExpenses.css";
import { DoughnutChart } from "../../Chart/DoughnutChart/DoughnutChart";
import { IReportDoughnut } from "../../../app/types/reports/IReports";

const expensesArr: IReportDoughnut[] = [
    {
        name: 'Недвижимость',
        percent: 25,
        color: 'rgb(63, 90, 106)'
    },
    {
        name: 'Бизнес',
        percent: 35,
        color: 'rgb(240, 111, 91)'
    },
    {
        name: 'Транспорт',
        percent: 20,
        color: 'rgb(251, 208, 91)'
    },
    {
        name: 'Другое',
        percent: 10,
        color: 'rgb(172, 180, 186)'
    }
]

export function ReportExpenses() {
    return (
        <div className="report-expenses">
            <div className="report-expenses__title">Расходы</div>
            <div className="report-expenses__content">
                <div className="report-expenses__chart">
                    <DoughnutChart data={expensesArr}/>
                </div>
                <div className="report-expenses__info">
                    <div className="report-expenses-info-item" style={{color: expensesArr[0].color}}>
                        <div className="report-expenses-info-item__title">Недвижимость:</div>
                        <b className="report-expenses-info-item__percent">{expensesArr[0].percent}%</b>
                    </div>
                    <div className="report-expenses-info-item" style={{color: expensesArr[1].color}}>
                        <div className="report-expenses-info-item__title">Бизнес:</div>
                        <b className="report-expenses-info-item__percent">{expensesArr[1].percent}%</b>
                    </div>
                    <div className="report-expenses-info-item" style={{color: expensesArr[2].color}}>
                        <div className="report-expenses-info-item__title">Транспорт:</div>
                        <b className="report-expenses-info-item__percent">{expensesArr[2].percent}%</b>
                    </div>
                    <div className="report-expenses-info-item" style={{color: expensesArr[3].color}}>
                        <div className="report-expenses-info-item__title">Другое:</div>
                        <b className="report-expenses-info-item__percent">{expensesArr[3].percent}%</b>
                    </div>
                </div>
            </div>
        </div>
    )
}