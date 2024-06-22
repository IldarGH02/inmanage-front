import { observer } from 'mobx-react-lite'
import { ExpenseList } from '../../../app/types/balance/IBalance'
import { FC } from 'react'
import { JobItem } from './JobItem/JobItem'

interface IItems {
    items: ExpenseList
    onChangeDaw: React.ChangeEventHandler<HTMLInputElement>
}

export const JobItems: FC<IItems> = observer(({items, onChangeDaw}) => {
    return (
        <ul className="job__items">
            {items && items.map((item) => {
                return <JobItem 
                            key={item.id} 
                            item={item} 
                            onChangeDaw={onChangeDaw}
                        />
                })
            }
        </ul>
    )
})