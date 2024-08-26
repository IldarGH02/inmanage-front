import { FC } from "react"
import { ImmovableDto } from "../../../app/types/dto/DtoTypes"
import propertyImg from '../../../shared/assets/img/assets/home.png'
import { Link } from "react-router-dom"
import { observer } from "mobx-react-lite"

interface ImovableItem {
    item: ImmovableDto
}

export const ImmovableItem: FC<ImovableItem> = observer(({item}) => {
    return (
        <Link className="immovables__link" to={`${item.id}`} key={item.id}>
            <li className="immovables__item">
                <div className="immovables__item-img">
                    <img src={propertyImg} alt="homeImg" />
                </div>
                <div className="immovables__item-content">
                    <h2 className="immovables__item-name">{item.name}</h2>
                    <div className="immovables__item-informarmation">
                        <div className="immovables__information immovables-price">
                            <h4 className="immovables__information-title">Актуальная стоимость:</h4>
                            <div className="immovables-price_green">
                                <b className="immovables_price-sum">{item.actual_price.toLocaleString()}</b>
                                <b className="immovables_price-valuta">₽</b>
                            </div>
                        </div>
                    
                        <div className="immovables__information immovables-profit">
                            <h4 className='immovables__information-title'>Прирост стоимости:</h4>
                            <div className="immovables-price_red">
                                <b className="immovables_price-sum">{item.average_profit.toLocaleString()}</b>
                                <b className="immovables_price-valuta">₽</b>
                            </div>
                        </div>

                        <div className="immovables__information immovables-income">
                            <h4 className={`immovables_information-title`}>Прибыль / месяц:</h4>
                            <div className="immovables-price_currency">
                                <b className="immovables_price-sum">{item.income.toLocaleString()}</b>
                                <b className="immovables_price-valuta">₽</b>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </Link>
    )
})