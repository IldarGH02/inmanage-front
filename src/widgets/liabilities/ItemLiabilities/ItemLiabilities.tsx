import "./itemLiabilities.css"

// const homeImg = require('../../../../actives/img/actives/home.png')

interface IItemLiabilities {
    title: string,
    img: string,
    actualPrice: number,
    expenses: number,
    remainder: number
}

export function ItemLiabilities({title, img, actualPrice, expenses, remainder}: IItemLiabilities) {
    return (
        <div className="item-liabilities">
            <div className="item-liabilities__img">
                <img src={img} alt="homeImg" />
            </div>
            <div className="item-liabilities__content">
                {/* <div className="item-liabilities__info"> */}
                    <div className="item-liabilities__name">{title}</div>
                    {/* <div className="item-liabilities__address">{data.address}</div> */}
                {/* </div> */}
                <div className="item-liabilities__finance-wrapper">
                    <div className="item-liabilities__finance">
                        <span className="item-liabilities__finance-title">Актуальная стоимость:</span>
                        <div className="item-liabilities__sum-wrapper-green">
                            <b className="item-liabilities__finance-sum">{actualPrice.toLocaleString(undefined, {minimumFractionDigits: 1})}</b>
                            <b className="item-liabilities__valuta">₽</b>
                        </div>
                    </div>
                   
                    <div className="item-liabilities__finance">
                        <span className={`item-liabilities__finance-title`}>Расход / месяц:</span>
                        <div className="item-liabilities__sum-wrapper-red">
                            <b className="item-liabilities__finance-sum">{expenses.toLocaleString(undefined, {minimumFractionDigits: 1})}</b>
                            <b className="item-liabilities__valuta">₽</b>
                        </div>
                    </div>

                    <div className="item-liabilities__finance">
                        <span className={`item-liabilities__finance-title`}>Остаток:</span>
                        <div className="item-liabilities__sum-wrapper">
                            <b className="item-liabilities__finance-sum">{remainder.toLocaleString(undefined, {minimumFractionDigits: 1})}</b>
                            <b className="item-liabilities__valuta">₽</b>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
