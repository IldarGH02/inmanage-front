import { FC } from "react"
import { ExpenseItem } from "../../../../app/types/balance/IBalance"
import { DawIncomeBalance } from "../../../elements/Daw/DawIncomeBalance/DawIncomeBalance"

interface IItem {
    item: ExpenseItem
    onClickPosition: (id: number) => void
}

export const JobItem: FC<IItem> = ({item, onClickPosition}) => {
    const changeDaw = (id: number)=> {
        onClickPosition(id)
    }

    return (
        <li className="job__item">
            <div className="job__item-title">{item.name}</div>
            <div className="job__item-daw">
                <DawIncomeBalance color="rgb(200, 200, 200)" onChangeDaw={()=>changeDaw(item.id)} dawActive={item.active}/>
            </div>
        </li>
    )
}