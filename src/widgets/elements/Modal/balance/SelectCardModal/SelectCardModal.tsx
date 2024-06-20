import React, { useState } from "react";
import "./selectCardModal.css";
import { ICard } from "../../../../../app/types/balance/IBalance";

import cash from '../../../../../shared/assets/img/balance/addExpense/cashB.png'

interface ISelectCardModal {
    data: ICard[],
    onClose: (id?: number)=>void
}

export function SelectCardModal({data, onClose}: ISelectCardModal) {
    const [idCard, setIdCard] = useState<number|null>(null)
    
    return (
        <div className="select-card-modal">
            <div className="select-card-modal__header">
                <div className="select-card-modal__title">Добавить способ оплаты</div>
            </div>
            <div className="select-card-modal__content">
                {data.map(el=>{
                    return (
                        <div className={`select-card-modal__item${el.id===idCard?'--active':''}`} key={el.id!} onClick={()=>setIdCard(el.id!)}>
                            <img className="select-card-modal__item-img" src={cash} alt="cashImg" />
                            <div className="select-card-modal__item-name">{el.name}</div>
                        </div>
                    )
                })}
            </div>
            <div className="select-card-modal__footer">
                <button className="select-card-modal__cancel-btn" onClick={()=>onClose()}>Отменить</button>
                <button className={`select-card-modal__add-btn${idCard?'--active':''}`} onClick={(e)=>{
                    if(idCard) {
                        console.log(idCard)
                        onClose(idCard)
                    } else {
                        e.preventDefault()
                    }
                }}>Добавить</button>
            </div>
        </div>
    )
}