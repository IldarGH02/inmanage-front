import { FC } from "react"
import { ExpenseItem } from "../../../../app/types/balance/IBalance"
import { DawIncomeBalance } from "../../../elements/Daw/DawIncomeBalance/DawIncomeBalance"

interface IItem {
    item: ExpenseItem
    onChangeDaw: React.ChangeEventHandler<HTMLInputElement>
}

export const JobItem: FC<IItem> = ({item, onChangeDaw}) => {

    return (
        <li className="job__item">
            <div className="job__item-title">{item.name}</div>
            <div className="job__item-daw">
                <DawIncomeBalance color="rgb(200, 200, 200)" onChangeDaw={onChangeDaw} dawActive={item.active}/>
            </div>
        </li>
    )
}