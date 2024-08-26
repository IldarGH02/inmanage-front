import "../bonds.css"
import { BondsItem } from "../BondsItem/BondsItem";

export function Bonds() {
    // let stocksArr = [] //данные, которые достаются из БД 

    return (
        <div className="bonds">
            <div className="bonds__header">
                <div className="bonds__title"><h1>Облигации</h1></div>
                <div>
                    <button className="bonds__btn-add">История</button>
                    <button className="bonds__btn-add">Добавить</button>
                </div>
            </div>
            <div className="bonds__items">
                <BondsItem/>
            </div>
        </div>
    )
}