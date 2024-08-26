
import "../stocks.css"
import { StockItem } from "../StocksItem/StockItem";

export function Stocks() {
    // let stocksArr = [] //данные, которые достаются из БД 

    return (
        <div className="stocks">
            <div className="stocks__header">
                <div className="stocks__title"><h1>АКЦИИ</h1></div>
                <div>
                    <button className="stocks__btn-add">История</button>
                    <button className="stocks__btn-add">Добавить</button>
                </div>
                
            </div>
            <div className="stocks__items">
                <StockItem/>
            </div>
        </div>
    )
}