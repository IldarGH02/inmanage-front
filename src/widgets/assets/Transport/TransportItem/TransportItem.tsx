import React from "react"
import "./transportItem.css"
import { IAssetsTransport } from "../../../../app/types/assets/IAssets"
import { ILiabilitiesTransport } from "../../../../app/types/liabilities/ILiabilities"

import transportImg from '../../../../shared/assets/img/assets/transportItem.png'

interface ITransportItem {
    data: IAssetsTransport | ILiabilitiesTransport
}

export function TransportItem({data}: ITransportItem) {
    return (
        <div className="transport-item">
            <div className="property-item__img">
                <img src={transportImg} alt="transportImg" />
            </div>
            <div className="property-item__content">
                {/* <div className="property-item__info"> */}
                    <div className="property-item__name">{data.mark + ' ' + data.model}</div>
                    {/* <div className="property-item__address">{data.address}</div> */}
                {/* </div> */}
                <div className="property-item__finance-wrapper">
                    <div className="property-item__finance">
                    {'actual_price' in data && 
                    <>
                        <span className="property-item__finance-title">Актуальная стоимость:</span>
                        <b className="property-item__finance-sum">{data.actual_price ? data.actual_price!.toLocaleString():'н/д'} ₽</b>
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
            <div className="transport-item__img">
                <img src={transportImg} alt="homeImg" />
            </div>
            <div className="transport-item__content">
                <div className="transport-item__info">
                    <div className="transport-item__name">{data.mark + ' ' + data.model}</div>
                    <div className="transport-item__address">{'data.owner'}</div>
                </div>
                <div className="transport-item__finance">
                    <div className="transport-item__income">
                    {'month_income' in data && 
                    <>
                        <span>Доходы:</span><b>{data.month_income.toLocaleString()} ₽</b>
                    </>
                    }
                    </div>
                    <div className="transport-item__expense">
                        <span>Расходы:</span><b>{data.month_expense.toLocaleString()} ₽</b>
                    </div>
                    <div className="transport-item__profit">
                    {'average_profit' in data && 
                    <>
                        <span>Прибыль:</span><b>{data.average_profit.toLocaleString()} ₽</b>
                    </>
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}