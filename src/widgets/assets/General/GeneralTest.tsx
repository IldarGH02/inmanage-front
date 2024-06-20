import React from "react";
import { LineChart } from "../../Chart/LineChart/LineChart";
import "./generalTest.css"

export function General() {
    // const infoIncome = {
    //     title: '',
    //     subtitle: 'Доход'
    // }
    
    // const infoCost = {
    //     title: '',
    //     subtitle: 'Расход'
    // }

    // const infoBalance = {
    //     title: '',
    //     subtitle: 'Сальдо'
    // }

    // const infoJob = {
    //     title: '',
    //     subtitle: 'Работочас'
    // }

    return (
        <div className="general">
            <div className="general__header">
                <div className="general__title">
                    <h2>ОБЩАЯ СТАТИСТИКА</h2>
                </div>
            </div>
            <div className="general__items">
                <div className="general-item">
                    <div className="general-item__conteiner">
                        <h2>Общий доход</h2>
                        <LineChart/>
                    </div>
                    
                </div>
                <div className="general-item">
                    <div className="general-item__conteiner">
                        <h2>Общий расход</h2>
                        <LineChart/>
                    </div>
                    
                </div>
                <div className="general-item">
                    <div className="general-item__conteiner">
                        <h2>Общее сальдо</h2>
                        <LineChart/>
                    </div>
                    
                </div>
                <div className="general-item">
                    <div className="general-item__conteiner">
                        <h2>Стоимость вашего работочаса</h2>
                        <LineChart/>
                    </div>
                    
                </div>
            </div> 
            {/* <div className="bond__graph">
                <div className="bond__graph-container">
                    
                </div>
            </div> */}
        </div>
    )
}