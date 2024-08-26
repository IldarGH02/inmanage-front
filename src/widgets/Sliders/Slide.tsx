import {ExpenseItem} from "../../app/types/balance/IBalance.ts";
import {FC} from "react";

interface ISlide {
    item: ExpenseItem
}

export const Slide: FC<ISlide> = ({item}) => {
    return (
        <div className="slick-slide">
            <h3>{item.name}</h3>
            <p>{item.id}</p>
        </div>
    )
}