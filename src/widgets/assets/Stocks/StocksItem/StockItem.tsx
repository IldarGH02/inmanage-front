
import { LineChart } from "../../../Chart/LineChart/LineChart";
import "../stocks.css"

import logoSber from "../../../../shared/assets/img/logo_sber.png"

export function StockItem() {
    // const infoPrice = {
    //     title: 'Средняя цена за последние 4-е месяца',
    //     subtitle: 'Средняя цена'
    // }
    
    // const infoCost = {
    //     title: 'Стоимость актива на рынке',
    //     subtitle: 'Стоимость актива'
    // }
    return (
        <>
        <div className="stock">
            <div className="stock__conteiner">
                <div className="stock__header">
                    <div className="stock__title">
                        <img src={logoSber} alt="logo-sber" />
                        <span><h2>СБЕР</h2></span>
                    </div>
                    <button className="stock__btn-remove">x</button>
                </div>
                <div className="stock__content">
                    <div className="stock__info">
                        <div>
                            <h3>Цена покупки:</h3>
                            <b>1230,23 ₽</b>
                        </div>
                        <div>
                            <h3>Количество:</h3>
                            <b>150 шт.</b>
                        </div>
                        <div>
                            <h3>Цена одной акции:</h3>
                            <b>137,27 ₽</b>
                        </div>
                        <div>
                            <h3>Цена актива:</h3>
                            <b>20590,5 ₽</b>
                        </div>
                        <div>
                            <h3>Чистая прибыль/убыток:</h3>
                            <b>1230,23 ₽</b>
                        </div>
                    </div>
                    <div className="stock__graph">
                        <div className="stock__graph-container">
                            <LineChart/>
                        </div>
                    {/* <Line options={options} data={data} /> */}
                        
                    </div>
                </div>
            </div>
        </div>



        <div className="stock">
            <div className="stock__conteiner">
                <div className="stock__header">
                    <div className="stock__title">
                        <img src={logoSber} alt="logo-sber" />
                        <span><h2>СБЕР</h2></span>
                    </div>
                    <button className="stock__btn-remove">x</button>
                </div>
                <div className="stock__content">
                    <div className="stock__info">
                        <div>
                            <h3>Цена покупки:</h3>
                            <b>1230,23 ₽</b>
                        </div>
                        <div>
                            <h3>Количество:</h3>
                            <b>150 шт.</b>
                        </div>
                        <div>
                            <h3>Цена одной акции:</h3>
                            <b>137,27 ₽</b>
                        </div>
                        <div>
                            <h3>Цена актива:</h3>
                            <b>20590,5 ₽</b>
                        </div>
                        <div>
                            <h3>Чистая прибыль/убыток:</h3>
                            <b>1230,23 ₽</b>
                        </div>
                    </div>
                    <div className="stock__graph">
                        <div className="stock__graph-container">
                            <LineChart/>
                        </div>
                    {/* <Line options={options} data={data} /> */}
                        
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}