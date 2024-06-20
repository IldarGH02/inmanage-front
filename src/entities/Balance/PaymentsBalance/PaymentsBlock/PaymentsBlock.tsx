import { useEffect, useState } from "react";
import "./paymentsBlock.css";
import { IPaymentsDays } from "../../../../app/types/balance/IBalance";
import { PaymentDayItem } from "./PaymentDayItem/PaymentDayItem";
import PaymentsStore from "../../../../app/store/paymentsStore"; 
import { observer } from "mobx-react-lite";

const dayName:string[] = [
    'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'
]

export const PaymentsBlock = observer(() => {
    const [store] = useState(
        () => new PaymentsStore()
    )
    const [arrDays, setArrDays] = useState<IPaymentsDays[]>([])

    useEffect(()=>{
        if(store.daysOfMonth.length!==0) {
            let counter = 0
            let newArrDays: IPaymentsDays[] = []
            store.daysOfMonth.forEach((el: any, i: number)=>{
                if(el!==0) {
                    const newObj:IPaymentsDays = {
                        number: el,
                        day: dayName[(i)-(7*counter)],
                        arrPayments: [
                            {
                                id:1,
                                sum: 15235,
                                name: 'Какое-то',
                                done: false
                            }
                        ],
                        active: false
                    }
                    newArrDays.push(newObj)
                }
                if((i+1)%7===0) {
                    counter+=1
                }
            })
            setArrDays(newArrDays)
        }
    }, [store.daysOfMonth])

    const changeActive = (number: number) => {
        const arr = arrDays.map(el=>{
            if(el.number===number) {
                el.active = !el.active
            } else {
                el.active=false
            }
            return el
        })
        setArrDays(arr)
    }


    return (
        <div className="payments-block">
            <h2 className="payments__title">Платежи</h2>
            <div className="payments__content">
                <div className="payments__list">
                    {arrDays && arrDays.map(el=>{
                        return (
                            <PaymentDayItem data={el} onChangeActive={changeActive} key={el.number}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
})
