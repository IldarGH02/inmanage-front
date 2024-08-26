import { useState } from "react"
import "./paymentsBalance.css" 
import { PaymentsItems } from "../../../widgets/Balance/PaymentsItems/PaymentsItems"
import PaymentsStore from "../../../app/store/paymentsStore"
import { observer } from "mobx-react-lite"
// import { Stub } from "../../../widgets/Balance/PaymentsItems/PaymentsItem/Stub"
import { PaymentMock } from "../../../features/mocks"

// const logoSber = require("../../../actives/img/logo_sber.png")

export const PaymentsBalance = observer(() => {
    const [store] = useState(
        () => new PaymentsStore()
    )
    console.log(store)
    const sum = 132720
    return (
        <div className="payments">
            <div className="payments__top">
                <div className="payments__title">
                    Платежи
                </div>
                <div className="payments__balance">
                    <p className="payments-balance__sum">{sum.toLocaleString(undefined, {minimumFractionDigits: 1})}</p>
                    <p className="payments-balance__valuta">₽</p>
                </div>
            </div>
            {/* {store.payment === null ? <Stub/> : <PaymentsItems items={store.payment}/>} */}
            <PaymentsItems items={PaymentMock}/>
        </div>
    )
})
