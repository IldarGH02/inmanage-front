import { FC } from "react"
import { JewerlyDto } from "../../../app/types/dto/DtoTypes"
import { JewerlyItem } from "./JewetlyItem"
import { Spinner } from "react-bootstrap"
import "./JewerlyItems.scss";
import { observer } from "mobx-react-lite";

interface JewerlyItems {
    items: JewerlyDto[]
    loading: boolean
}

export const JewerlyItems: FC<JewerlyItems> = observer(({items, loading}) => {

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
                return <JewerlyItem item={item} key={item.id}/>
            }) : <li> Список пуст </li> }
        </ul>
    )
})