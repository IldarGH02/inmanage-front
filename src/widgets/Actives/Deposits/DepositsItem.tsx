import { Link } from "react-router-dom"
import { DepositDto } from "../../../app/types/dto/DtoTypes"
import { FC, useContext } from "react"
import { observer } from "mobx-react-lite"

import img from "../../../shared/assets/img/assets/home.png"
import "./DepositItem.scss"
import { Context } from "../../../main"

interface ILoanItem {
    item: DepositDto
}

export const DepositsItem: FC<ILoanItem> = observer(({item}) => {
    const { loansStore } = useContext(Context)

    return (
        <li className="deposits__item" onClick={loansStore.handleClickCurrentDeposit}>
            <Link to={`${item.id}`} className="deposits__item-link">
                <div className="deposits__item-image">
                    <img className="item__image" src={img}/>
                </div>
                <div className="deposits__item-content">
                    <h2 className="deposits__item-title">{`Вклад: ${item.name}`}</h2>
                    <div className="deposits__item-info">
                        <div className="deposits__price">
                            <h3 className="deposits__item-subtitle">
                                Актуальная стоимость:
                            </h3>
                            <span>{item.sum}</span>
                        </div>
                        <div className="deposits__price">
                            <h3 className="deposits__item-subtitle">
                                Прирост стоимости:
                            </h3>
                            <span>{`+ ${item.percentage}`}</span>
                        </div>
                        <div className="deposits__price">
                            <h3 className="deposits__item-subtitle">
                                Итоговая прибыль:
                            </h3>
                            <span>{Math.floor(item.final_income)}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    )
})