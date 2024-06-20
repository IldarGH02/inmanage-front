import { FC } from 'react'
import { ICard } from '../../../../app/types/balance/IBalance'

import logoSber from "../../../../shared/assets/img/logo_sber.png"

interface IItem {
    item: ICard
}
export const CardItem: FC<IItem> = ({item}) => {
    return (
        <li className="card__item" key={item.id}>
            <div className="card__item-title">
                <img className="card__item-logo" src={logoSber} alt='logo_sber'/>
                <div className="card__item-name">{item.name}</div>
            </div>
            <div className="card__item-sum-container">
                <div className="card__item-sum">{item.remainder.toLocaleString(undefined, {minimumFractionDigits: 1})}</div>
                <div className="card__item-valuta">₽</div>
            </div>
        </li>
    )
}