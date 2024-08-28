import { Link } from "react-router-dom"
import { LoanDto } from "../../../app/types/dto/DtoTypes"
import { FC } from "react"
import { observer } from "mobx-react-lite"

import img from "../../../shared/assets/img/assets/home.png"

interface ILoanItem {
    item: LoanDto
}

export const LoanItem: FC<ILoanItem> = observer(({item}) => {
    return (
        <li className="loan__item">
            <Link to={`${item.id}`} className="loan__item-link">
                <div className="jewerly__item-image">
                    <img className="item__image" src={img}/>
                </div>
                <div className="jewerly__item-content">
                    <h2 className="jewerly__item-title">{item.name}</h2>
                    <div className="jewerly__item-info">
                        <div className="jewerly__price">
                            <p className="jewerly__item-subtitle jewerly_purchase-cost">
                                Актуальная стоимость:
                            </p>
                            <span>{item.maintenance_cost}</span>
                        </div>
                        <div className="jewerly__price">
                            <p className="jewerly__item-subtitle jewerly_esimated-cost">
                                Прирост стоимости:
                            </p>
                            <span>{item.insurance_sum}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    )
})