import {FC} from "react";
import {ICarList} from "../../../features/func/parsData.ts";
import {observer} from "mobx-react-lite";

interface DropDownItem {
    item: ICarList
    classNameItem: string
}

export const DropDownItem: FC<DropDownItem> = observer((
    {
        item,
        classNameItem
    }) => {

    return (
        <option value={item.content} className={classNameItem}>
            {item.content}
        </option>
    )
})