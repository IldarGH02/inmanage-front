import { FC } from "react"
import { DepositDto } from "../../../app/types/dto/DtoTypes"
import { observer } from "mobx-react-lite"

import { DepositsItem } from "./DepositsItem"
import "./DepositsItems.scss"

interface ILoanItems {
    items: DepositDto[]
}

export const DepositsItems: FC<ILoanItems> = observer(({items}) => {

    return (
        <ul className="deposits__items">
            { 
                items && items.map((item) => {
                    return <DepositsItem key={item.id} item={item}/>
                }) 
            }
        </ul>
    )
})