import React from "react"
import "./propertyItem.css"
import { IAssetsProperty } from "../../../../app/types/assets/IAssets"
import { ILiabilitiesProperty } from "../../../../app/types/liabilities/ILiabilities"

const homeImg = require('../../../../assets/img/assets/home.png')

interface IPropertyItem {
    data: IAssetsProperty | ILiabilitiesProperty
}

export function PropertyItem({data}: IPropertyItem) {
    return (
        <div className="property-item">
            <div className="property-item__img">
                <img src={homeImg} alt="homeImg" />
            </div>
            <div className="property-item__content">
                {/* <div className="property-item__info"> */}
                    <div className="property-item__name">{data.name}</div>
                    {/* <div className="property-item__address">{data.address}</div> */}
                {/* </div> */}
                <div className="property-item__finance-wrapper">
                    <div className="property-item__finance">
                    {'actual_price' in data && 
                    <>
                        <span className="property-item__finance-title">Актуальная стоимость:</span>
                        <b className="property-item__finance-sum">{data.actual_price.toLocaleString()} ₽</b>
                    </>
                    }
                    </div>
                    {'average_profit' in data && 
                    <>
                        <div className={`property-item__finance${data.total_expense<0?'-minus':''}`}>
                            <span className="property-item__finance-title">Прирост стоимости:</span>
                            <b className="property-item__finance-sum">{data.average_profit} %</b>
                        </div>
                    </> 
                    }
                    <div className="property-item__finance">
                    {'month_income' in data && 
                    <>
                        <span className={`property-item__finance-title${data.month_income<0?'-minus':''}`}>Прибыль / месяц:</span>
                        <b className="property-item__finance-sum">{data.month_income.toLocaleString()} ₽</b>
                    </>
                    }
                    {!('month_income' in data) && 
                    <>
                        <span className={`property-item__finance-title-minus`}>Расход / месяц:</span>
                        <b className="property-item__finance-sum">{data.month_expense.toLocaleString()} ₽</b>
                    </>
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}