import { useState } from "react";
import "./paymentInDayItem.css";
import { Daw } from "../../../../../../widgets/elements/Daw/daw"; 
import { useDispatch } from "react-redux";
// import { editDawTask } from "../../../../../../app/store/actions/diaryActions";
import { actionTypes } from "../../../../../../app/store/types/types";
import { IPayment } from "../../../../../../app/types/balance/IBalance";

import trash from '../../../../../../shared/assets/img/balance/payment/trashPayment.png'

interface ITaskInTimeItem {
    data: IPayment
}

export function PaymentInDayItem({data}: ITaskInTimeItem) {
    const [moreVisible, setMoreVisible] = useState(false)
    const dispatch = useDispatch()

    const changeDaw = ()=> {
        // const res = editDawTask(actionTypes.EDIT_DAW_TASK, data.id!)
        // res.then(e => {
        //     // console.log(e)
        //     dispatch(e!);
        // })
        // .catch((e) => {
        //     console.log(e)
        // })
    }

    return (
        <div className="payment-in-day-item">
            <div className="payment-in-day-item__info">
                <div className={`payment-in-day-item__title${data.done?'--active':''}`} onClick={()=>setMoreVisible(!moreVisible)}>{data.name}</div>
                <div className={`payment-in-day-item__sum${data.done?'--active':''}`}>{data.sum.toLocaleString()} ₽</div>
            </div> 
            <div className="payment-in-day-item__actions">
                <div className="payment-in-day-item__daw">
                    <Daw onChangeDaw={changeDaw} dawActive={data.done} color={"rgb(103, 157, 244)"}/>
                </div>
                <button className="payment-in-day-item__remove-btn">
                    <img className="payment-in-day-item__remove-img" src={trash} alt="trash" />
                </button>
            </div>
        </div>
    )
}