import "./itemAssets.css"
import {observer} from "mobx-react-lite";

// const homeImg = require('../../../../actives/img/actives/home.png')

interface IItemAssets {
    title: string,
    img: string,
    actualPrice: number,
    income: number,
    profit: number
}

export const ItemAssets = observer(({title, img, actualPrice, income, profit}: IItemAssets) => {
    return (
        <div className="item-assets">
            <div className="item-assets__img">
                <img src={img} alt="homeImg" />
            </div>
            <div className="item-assets__content">
                {/* <div className="item-assets__info"> */}
                    <div className="item-assets__name">{title}</div>
                    {/* <div className="item-assets__address">{data.address}</div> */}
                {/* </div> */}
                <div className="item-assets__finance-wrapper">
                    <div className="item-assets__finance">
                        <span className="item-assets__finance-title">Актуальная стоимость:</span>
                        <div className="item-assets__sum-wrapper-green">
                            <b className="item-assets__finance-sum">{actualPrice.toLocaleString(undefined, {minimumFractionDigits: 1})}</b>
                            <b className="item-assets__valuta">₽</b>
                        </div>
                    </div>
                   
                    <div className="item-assets__finance">
                        <span className={`item-assets__finance-title`}>Прирост стоимости:</span>
                        <div className="item-assets__sum-wrapper-red">
                            <b className="item-assets__finance-sum">{profit.toLocaleString(undefined, {minimumFractionDigits: 1})}</b>
                            <b className="item-assets__valuta">₽</b>
                        </div>
                    </div>

                    <div className="item-assets__finance">
                        <span className={`item-assets__finance-title`}>Прибыль / месяц:</span>
                        <div className="item-assets__sum-wrapper">
                            <b className="item-assets__finance-sum">{income.toLocaleString(undefined, {minimumFractionDigits: 1})}</b>
                            <b className="item-assets__valuta">₽</b>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})
