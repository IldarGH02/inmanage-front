import { observer } from "mobx-react-lite"
import { FC } from "react"
import { SecuritiesDto } from "../../../app/types/dto/DtoTypes"
import { SecuritiesItem } from "./SecuritiesItem"
import "./SecuritiesItems.scss";
import { Spinner } from "react-bootstrap";

interface ISecuritiesItems {
    items: SecuritiesDto[] | undefined
    loading: boolean
}

export const SecuritiesItems: FC<ISecuritiesItems> = observer(({items, loading}) => {
    // const { activesStore } = useContext(Context)

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

    return(
        <ul className="securities__items">
            { 
                items ? items.map((item) => {
                    return <SecuritiesItem item={item} key={item.id}/>
                }) : <li>Список пуст</li>
            }
        </ul>
    )
})