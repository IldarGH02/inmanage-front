import { FC } from "react"
import { Link } from "react-router-dom"
import propertyImg from '../../../shared/assets/img/assets/home.png'
import { SecuritiesDto } from "../../../app/types/dto/DtoTypes"
import "./SecuritiesItem.scss";

interface ISecuritiesItem {
    item: SecuritiesDto
}

export const SecuritiesItem: FC<ISecuritiesItem> = ({item}) => {
    return (
        <li className="securities__item">
            <Link className="securities__item-link" to={`${item.id}`}>
                <div className="securities__item-container">
                    <div className="securities__item-img">
                        <img src={propertyImg} alt="homeImg" />
                    </div>
                    <div className="securities__item-content">
                        <h2 className="securities__item-name">{item.name}</h2>
                        <div className="securities__item-informarmation">
                            <div className="securities__information securities-price">
                                <h4 className="securities__information-title">Актуальная стоимость:</h4>
                                <div className="securities-price_green">
                                    <b className="securities_price-sum">{item.market_price ? item.market_price.toLocaleString() : 0}</b>
                                    <b className="securities_price-valuta">₽</b>
                                </div>
                            </div>
                        
                            <div className="securities__information securities-profit">
                                <h4 className='securities__information-title'>Прирост стоимости:</h4>
                                <div className="securities-price_red">
                                    <b className="securities_price-sum">{item.legal_close_price.toLocaleString()}</b>
                                    <b className="securities_price-valuta">₽</b>
                                </div>
                            </div>

                            <div className="securities__information securities-income">
                                <h4 className="securities__information-title">Прибыль / месяц:</h4>
                                <div className="securities-price_currency">
                                    <b 
                                        className="securities_price-sum"
                                        >
                                            {
                                                item.income ? item.income.toLocaleString() : 0
                                            }
                                        </b>
                                    <b className="securities_price-valuta">₽</b>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    )
}