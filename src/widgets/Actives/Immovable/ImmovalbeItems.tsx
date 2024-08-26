import { FC } from "react"
import { ImmovableDto } from "../../../app/types/dto/DtoTypes"
import { ImmovableItem } from "./ImmovableItem"
import { observer } from "mobx-react-lite"

interface ImmovableItems {
    items: ImmovableDto[] | undefined
}

export const ImmovableItems: FC<ImmovableItems> = observer(({items}) => {
    return (
        <ul className="immovables__items">
            { items && items.map((item) => {
                return <ImmovableItem key={item.id} item={item}/>
            }) }
        </ul>
    )
})