import { FC } from "react"
import { LoanDto } from "../../../app/types/dto/DtoTypes"
import { observer } from "mobx-react-lite"
import { LoanItem } from "./LoanItem"
import { Spinner } from "react-bootstrap"

interface ILoanItems {
    items: LoanDto[]
    loading: boolean
}

export const LoanItems: FC<ILoanItems> = observer(({items, loading}) => {

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
        <ul className="loan__items">
            { 
                items && items.map((item) => {
                    return <LoanItem key={item.id} item={item}/>
                }) 
            }
        </ul>
    )
})