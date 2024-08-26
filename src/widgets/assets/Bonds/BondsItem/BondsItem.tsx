import { LineChart } from "../../../Chart/LineChart/LineChart";
import "../bonds.css"

import logoSber from "../../../../shared/assets/img/logo_sber.png"

export function BondsItem() {
    // const infoIncome = {
    //     title: 'Доходы за последние 4-е месяца',
    //     subtitle: 'Доход'
    // }
    return (
        <>
        <div className="bond">
            <div className="bond__conteiner">
                <div className="bond__header">
                    <div className="bond__title">
                        <img src={logoSber} alt="logo-sber" />
                        <span><h2>СБЕР</h2></span>
                    </div>
                    <button className="bond__btn-remove">x</button>
                </div>
                <div className="bond__content">
                    <div className="bond__info">
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
                    </div>
                    <div className="bond__graph">
                        <div className="bond__graph-container">
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