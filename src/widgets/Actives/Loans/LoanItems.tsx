import { FC } from "react"
import { LoansDto } from "../../../app/types/dto/DtoTypes"
import { observer } from "mobx-react-lite"
import { LoanItem } from "./LoanItem"
import "./LoansItems.scss"

interface ILoanItems {
    items: LoansDto[]
}

export const LoanItems: FC<ILoanItems> = observer(({items}) => {
    return (
        <ul className="loans__items">
            { 
                items && items.map((item) => {
                    return <LoanItem key={item.id} item={item}/>
                }) 
            }
        </ul>
    )
})