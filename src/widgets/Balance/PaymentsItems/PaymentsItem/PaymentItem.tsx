import { FC } from "react"
// import { IPayment } from "../../../../app/types/balance/IPayment"
import { IPaymentMock } from "../../../../features/mocks"

interface IPaymentItem {
    // item: IPayment
    item: IPaymentMock
}

export const PaymentItem: FC<IPaymentItem> = ({item}) => {
    return (
            <li className="payments__item">
                <h3 className="payments__item-name">{item.name}</h3>
                <p className="payments__item-sum">{item.amount}₽</p>
            </li>
    )
}