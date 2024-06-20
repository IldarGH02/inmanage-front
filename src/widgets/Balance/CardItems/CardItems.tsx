import React, { FC } from "react"
import { ICard } from "../../../app/types/balance/IBalance"
import { CardItem } from "./CardItem/CardItem"

interface IItems {
    items: ICard[]
}

export const CardItems: FC<IItems> = ({items}) => {
    return (
        <ul className="card__balance-items">
            {items && items.map((item: ICard, i) => i < 3 && <CardItem item={item} key={item.id}/>)}
        </ul>
    )
}