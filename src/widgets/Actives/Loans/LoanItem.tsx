import { Link } from "react-router-dom"
import { LoansDto } from "../../../app/types/dto/DtoTypes"
import { FC, useContext } from "react"
import { observer } from "mobx-react-lite"

import img from "../../../shared/assets/img/assets/home.png"
import "./LoanItem.scss"
import { Context } from "../../../main"

interface ILoanItem {
    item: LoansDto
}

export const LoanItem: FC<ILoanItem> = observer(({item}) => {
    const { loansStore } = useContext(Context)

    return (
        <li className="loan__item" onClick={loansStore.handleClickCurrentLoan}>
            <Link to={`${item.id}`} className="loan__item-link">
                <div className="loan__item-image">
                    <img className="item__image" src={img}/>
                </div>
                <div className="loan__item-content">
                    <h2 className="loan__item-title">{`Займы: ${item.name}`}</h2>
                    <div className="loan__item-info">
                        <div className="loan__price">
                            <h3 className="loan__item-subtitle loan_purchase-cost">
                                Актуальная стоимость:
                            </h3>
                            <span>{item.sum}</span>
                        </div>
                        <div className="loan__price">
                            <h3 className="loan__item-subtitle loan_esimated-cost">
                                Прирост стоимости:
                            </h3>
                            <span>{`+ ${item.percentage}`}</span>
                        </div>
                        <div className="loan__price">
                            <h3 className="loan__item-subtitle loan_esimated-cost">
                                прибыль / месяц:
                            </h3>
                            <span>{item.month_payment}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    )
})