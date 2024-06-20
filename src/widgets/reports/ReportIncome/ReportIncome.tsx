import React from "react";
import "./reportIncome.css";
import { IReportDoughnut } from "../../../app/types/reports/IReports";
import { BarChart } from "../../Chart/BarChart/BarChart";

const incomesArr: IReportDoughnut[] = [
    {
        name: 'Недвижимость',
        percent: 25,
        color: 'rgb(63, 90, 106)'
    },
    {
        name: 'Бизнес',
        percent: 30,
        color: 'rgb(240, 111, 91)'
    },
    {
        name: 'Транспорт',
        percent: 20,
        color: 'rgb(251, 208, 91)'
    },
    {
        name: 'Драгоценности',
        percent: 15,
        color: 'rgb(127, 179, 120)'
    },
    {
        name: 'Другое',
        percent: 10,
        color: 'rgb(172, 180, 186)'
    }
]

export function ReportIncome() {
    return (
        <div className="report-income">
            <div className="report-income__title">Доходы</div>
            <div className="report-income__content">
                <div className="report-income__chart">
                    <BarChart data={incomesArr}/>
                </div>
                <div className="report-income__info">
                    <div className="report-income-info-item" style={{color: incomesArr[0].color}}>
                        <div className="report-income-info-item__title">Недвижимость:</div>
                        <b className="report-income-info-item__percent">{incomesArr[0].percent}%</b>
                    </div>
                    <div className="report-income-info-item" style={{color: incomesArr[1].color}}>
                        <div className="report-income-info-item__title">Бизнес:</div>
                        <b className="report-income-info-item__percent">{incomesArr[1].percent}%</b>
                    </div>
                    <div className="report-income-info-item" style={{color: incomesArr[2].color}}>
                        <div className="report-income-info-item__title">Транспорт:</div>
                        <b className="report-income-info-item__percent">{incomesArr[2].percent}%</b>
                    </div>
                    <div className="report-income-info-item" style={{color: incomesArr[3].color}}>
                        <div className="report-income-info-item__title">Драгоценности:</div>
                        <b className="report-income-info-item__percent">{incomesArr[3].percent}%</b>
                    </div>
                    <div className="report-income-info-item" style={{color: incomesArr[4].color}}>
                        <div className="report-income-info-item__title">Другое:</div>
                        <b className="report-income-info-item__percent">{incomesArr[4].percent}%</b>
                    </div>
                </div>
            </div>
        </div>
    )
}