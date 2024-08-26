import { FC } from "react"
import { Card } from "../../../app/types/dto/DtoTypes" 
import { CardItem } from "./CardItem/CardItem"

interface IItems {
    items: Card[]
}

export const CardItems: FC<IItems> = ({items}) => {
    return (
        <ul className="card__balance-items">
            {items && items.map((item: Card, i) => i < 3 && <CardItem item={item} key={item.id}/>)}
        </ul>
    )
}