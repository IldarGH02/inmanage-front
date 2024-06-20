import React from "react";

import { IBalance } from "../../../app/types/balance/IBalance"; 
import { BALANCE_ITEM_DELETE } from "../../../widgets/modalWindow/types"; 

import "../generalBalance.css"

const sberLogo = require("../../../assets/img/logo_sber.png")

interface IBalanceItem {
    data: IBalance,
    onShowModal: (id:number, type:string)=>void
}

export function BalanceItem({data, onShowModal}: IBalanceItem) {
    // const sum = 30250
    // const income = 34489.50
    // const consumption = 5489

    return (
        <>
        <div className="balance-item">
            <div className="balance-card">
                <div className="balance-card__header">
                    <div className="balance-card__title">{}</div>
                    <div className="balance-card__remove-btn" onClick={()=>onShowModal(data.id!, BALANCE_ITEM_DELETE)}>x</div>
                </div>
                <div className="balance-card__container">
                    <div className="balance-card__sum">
                        {} ₽
                    </div>
                    <div className="balance-card__info">
                        <div className="balance-card__number">{}</div>
                        <img src={sberLogo} className="balance-card__logo"></img>
                    </div>
                    
                </div>
            </div>
            <div className="balance-finance">
                <div className="balance-finance__title">
                    За месяц
                </div>
                <div className="balance-finance__content">
                    <div className="balance-finance__income">
                        <span>+</span><b>{} ₽</b> 
                    </div>
                    <div className="balance-finance__consumption">
                        <span>–</span><b>{} ₽</b> 
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}