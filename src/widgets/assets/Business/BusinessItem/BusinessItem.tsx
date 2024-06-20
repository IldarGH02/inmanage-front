import React from "react"
import "./businessItem.css"
import { IAssetsBusiness } from "../../../../app/types/assets/IAssets"

const businessImg = require('../../../../assets/img/assets/business.jpg')

interface IBusinessItem {
    data: IAssetsBusiness
    // profit?: number,
    // expense: number,
    // income?: number
}

export function BusinessItem({data}: IBusinessItem) {
    return (
        <div className="business-item">
            <div className="business-item__img">
                <img src={businessImg} alt="homeImg" />
            </div>
            <div className="business-item__content">
                <div className="business-item__info">
                    <div className="business-item__name">{data.name}</div>
                    <div className="business-item__address">{data.address}</div>
                </div>
                <div className="business-item__finance">
                    <div className="business-item__income">
                        <span>Доходы:</span><b>{data.month_income.toLocaleString()} ₽</b>
                    </div>
                    <div className="business-item__expense">
                        <span>Расходы:</span><b>{data.month_expense.toLocaleString()} ₽</b>
                    </div>
                    <div className="business-item__profit">
                        <span>Прибыль:</span><b>{data.average_profit.toLocaleString()} ₽</b>
                    </div>
                </div>
            </div>
        </div>
    )
}