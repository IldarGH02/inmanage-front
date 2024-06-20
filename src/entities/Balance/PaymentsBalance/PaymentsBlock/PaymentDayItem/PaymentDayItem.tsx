import { useEffect, useRef, useState } from "react";
import "./paymentDayItem.css";
import { PaymentInDayItem } from "./PaymentsInDayItem/PaymentInDayItem";
import { IPaymentsDays } from "../../../../../app/types/balance/IBalance";
import { AddPaymentPanel } from "./AddPaymentPanel/AddPaymentPanel";
import { observer } from "mobx-react-lite";


interface IPaymentDayItem {
    data: IPaymentsDays,
    onChangeActive: (number: number)=>void
}

export const PaymentDayItem = observer(({data, onChangeActive}: IPaymentDayItem) => {
    const [activeItem, setActiveItem] = useState(data.arrPayments.length!==0?true:false)
    const itemRef = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        if(data.arrPayments.length===0) {
            setActiveItem(false)
        } else {
            setActiveItem(true)
        }
    }, [data.arrPayments.length])

    const onChange = (ev: any) => {
        if(ev.target.closest('.payment-day-item__task-list')===null && ev.target.closest('.add-task-panel__close-btn')===null && ev.target.closest('.add-payment-panel')===null) {
            onChangeActive(data.number)
            console.log(ev)
        }
    }

    return (
        <div ref={itemRef} className={`payment-day-item${activeItem?'--active':''}`} onClick={onChange}>
            <div className="payment-day-item__header">
                {activeItem &&
                    <div className="payment-day-item__indicator"></div>
                }
                <div className="payment-day-item__title">{data.number} <b className="payment-day-item__day"> {data.day}</b></div>
            </div>
            {!data.active &&
                <div className="payment-day-item__task-list">
                    {data.arrPayments.map(el=>{
                        return (
                            <PaymentInDayItem data={el} key={el.id}/>
                        )
                    })}
                </div>
            }
            {data.active && 
                <AddPaymentPanel onClose={()=>onChangeActive(data.number)}/>
            }
        </div>
    )
})