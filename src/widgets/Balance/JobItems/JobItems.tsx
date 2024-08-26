import { observer } from 'mobx-react-lite'
import { ExpenseList } from '../../../app/types/balance/IBalance'
import { FC } from 'react'
// import { JobItem } from './JobItem/JobItem'

interface IItems {
    items: ExpenseList
    handleChangeCheckbox: React.ChangeEventHandler<HTMLInputElement>
    handleChooseItem: React.MouseEventHandler<HTMLLIElement>
}

export const JobItems: FC<IItems> = observer((
    {
        // items,
        // handleChangeCheckbox,
        // handleChooseItem,
    }) => {
    return (
        <ul className="job__items">
            {/* {items && items.map((item) => {
                return <JobItem 
                            key={item.id} 
                            item={item} 
                            handleChangeCheckbox={handleChangeCheckbox}
                            handleChooseItem={handleChooseItem}
                        />
                })
            } */}
        </ul>
    )
})