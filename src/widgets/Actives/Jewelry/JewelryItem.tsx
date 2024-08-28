import { FC } from "react"
import { JewelryDto } from "../../../app/types/dto/DtoTypes"
import { Link } from "react-router-dom"
import { observer } from "mobx-react-lite"
import "./JewerlyItem.scss";
import img from "../../../shared/assets/img/assets/home.png"

interface IJewelryItem {
    item: JewelryDto
}

export const JewelryItem: FC<IJewelryItem> = observer(({item}) => {
    return (
        <li className="jewerly__item">
            <Link className="jewerly__item-link" to={`${item.id}`}>
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
                            <span>{item.purchase_cost}</span>
                        </div>
                        <div className="jewerly__price">
                            <p className="jewerly__item-subtitle jewerly_esimated-cost">
                                Прирост стоимости:
                            </p>
                            <span>{item.grow}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    )
})