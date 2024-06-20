import React from "react";
import "../loans.css"
import { ILiabilitiesLoans } from "../../../../app/types/liabilities/loans/ILoans";
import { LIABILITIES_LOANS_DELETE } from "../../../modalWindow/types";

interface ILoansItem {
    data: ILiabilitiesLoans,
    onShowModal: (id:number, type:string)=>void,
}

export function LoansItem({data, onShowModal}:ILoansItem) {
    return (
        // <Card></Card>
        <div className="loan">
            <div className="loan__conteiner">
                <div className="loan__header">
                    <div className="loan__title">
                        <h2>{data.name}</h2>
                    </div>
                    <button className="loan__btn-remove" onClick={()=>onShowModal(data.id!, LIABILITIES_LOANS_DELETE)}>x</button>
                </div>
                <div className="loan__content">
                    <div className="loan__info">
                        <div>
                            <h3>Остаток:</h3>
                            <b>{data.remainder === null ? 0: data.remainder.toLocaleString()} ₽</b>
                        </div>
                        <div>
                            <h3>Сумма кредита:</h3>
                            <b>{data.sum.toLocaleString()} ₽</b>
                        </div>
                        <div>
                            <h3>Ставка:</h3>
                            <b>{data.percentage} %</b>
                        </div>
                        <div>
                            <h3>Срок кредитования:</h3>
                            <b>{data.loan_term} мес.</b>
                        </div>
                        <div>
                            <h3>Стоимость страховки:</h3>
                            <b>{data.insurance_sum=== null ? 0: data.insurance_sum.toLocaleString()} ₽</b>
                        </div>
                        <div>
                            <h3>Обслуживание счета:</h3>
                            <b>{data.maintenance_cost=== null ? 0:data.maintenance_cost.toLocaleString()} ₽</b>
                        </div>
                    </div>
                    <div className="loan__next-paying">
                        <span><h3>Следующий платеж</h3></span>
                        <div className="loan__next-paying-container">
                            <div className="loan__next-paying-data">дата следующего платежа
                            <span>25 февраля</span>
                            </div>
                            <div className="loan__next-paying-price">необходимо внести <span>50000 ₽</span></div>
                        </div>
                    {/* <Line options={options} data={data} /> */}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}