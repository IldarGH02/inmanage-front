import { FC } from "react"
import { JewelryDto } from "../../../app/types/dto/DtoTypes"
import { JewelryItem } from "./JewelryItem"
import { Spinner } from "react-bootstrap"
import "./JewerlyItems.scss";
import { observer } from "mobx-react-lite";

interface JewelryItems {
    items: JewelryDto[]
    loading: boolean
}

export const JewelryItems: FC<JewelryItems> = observer(({items, loading}) => {

    if(loading) {
        return <div style={{
            width: '100%',
            height: '350px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Spinner 
                style={{
                    width: '10rem',
                    height: '10rem',
                }}
                variant="primary"
            />
        </div>
    }

    return (
        <ul className="jewerly__items">
            { items ? items.map((item) => {
                return <JewelryItem item={item} key={item.id}/>
            }) : <li> Список пуст </li> }
        </ul>
    )
})