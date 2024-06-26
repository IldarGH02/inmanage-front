import { FC } from "react"
import { ExpenseItem } from "../../../../app/types/balance/IBalance"
import { DawIncomeBalance } from "../../../elements/Daw/DawIncomeBalance/DawIncomeBalance"
import {observer} from "mobx-react-lite";

interface IItem {
    item: ExpenseItem
    handleChangeCheckbox: React.ChangeEventHandler<HTMLInputElement>
    handleChooseItem: React.MouseEventHandler<HTMLLIElement>
}

export const JobItem: FC<IItem> = observer((
    {
        item,
        handleChangeCheckbox,
        handleChooseItem
    }) => {

    return (
        <li className="job__item" onClick={handleChooseItem}>
            <div className="job__item-title">{item.name}</div>
            <DawIncomeBalance
                color="rgb(200, 200, 200)"
                handleChangeCheckbox={handleChangeCheckbox}
                activeChecked={item.active}
                id={`${item.id}`}
            />
        </li>
    )
})