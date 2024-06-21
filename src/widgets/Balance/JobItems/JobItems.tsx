import { observer } from 'mobx-react-lite'
import { ExpenseList } from '../../../app/types/balance/IBalance'
import { FC } from 'react'
import { JobItem } from './JobItem/JobItem'

interface IItems {
    items: ExpenseList
    onClickPosition: (id: number) => void
}

export const JobItems: FC<IItems> = observer(({items, onClickPosition}) => {
    return (
        <ul className="job__items">
            {items && items.map((item) => {return <JobItem key={item.id} item={item} onClickPosition={onClickPosition}/>}) }
        </ul>
    )
})