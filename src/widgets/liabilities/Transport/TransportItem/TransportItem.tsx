import React, { useContext } from "react";
import { ILiabilitiesTransport } from "../../../../app/types/liabilities/transport/ITransport";
import { ModalContext } from "../../../../features/context/modalProperty/ModalContext";
import { LineChart } from "../../../Chart/LineChart/LineChart";
import { LIABILITIES_TRANSPORT_DELETE, LIABILITIES_TRANSPORT_INCOME } from "../../../modalWindow/types";
import { Slider } from "../../../Slider/Slider.jsx";

import "../transport.css"

const transport = require("../../../../assets/img/solaris.jpg")
const editPencil = require("../../../../assets/img/edit-pencil.png")
const logoHyundai = require("../../../../assets/img/hyundai-logo.png")

// const infoIncome = {
//     title: 'Доходы за последние 4-е месяца',
//     subtitle: 'Доход'
// }

// const infoCost = {
//     title: 'Расходы за последние 4-е месяца',
//     subtitle: 'Расход'
// }

interface ITransportItemDTO {
    id: number, 
    name: string,
    brand: string,
    owner: string,
    vin: string,
    use: string,
    owner_type: boolean
}

interface ITransportItem {
    data: ILiabilitiesTransport,
    onShowModal: (id:number, type:string)=>void,
    onEditModal: (transport: ITransportItemDTO)=>void
}

export function TransportItem({data, onShowModal, onEditModal}:ITransportItem) {
    const {show} = useContext(ModalContext)
    const elementsArr = [<img src={transport} style={{width:'100%', height:'auto'}}></img>, <LineChart/>, <LineChart/>]

    return (
        <>
        <div className="transport-item">
            <div className="transport-item__conteiner">
                <div className="transport-item__header">
                    <div className="transport-item__title">
                        <img src={logoHyundai} alt="" />
                        <span><h2>{'data.brand'} {'data.name'}</h2></span>
                    </div>
                    <button className="transport-item__btn-edit" onClick={()=>onEditModal({
                        id: data.id!, 
                        name: 'data.name', 
                        brand: 'data.brand',
                        owner: data.owner,
                        vin: data.vin,
                        use: data.use,
                        owner_type: data.owner_type
                    })}>
                        <img src={editPencil} alt="" />
                    </button>
                    <button className="transport-item__btn-remove" onClick={()=>onShowModal(data.id!, LIABILITIES_TRANSPORT_DELETE)}>x</button>
                </div>
                <div className="transport-item__content">
                    <div className="transport-item__info">
                        <div>
                            <h3>Владелец по ПТС:</h3>
                            <b>{data.owner}</b>
                        </div>
                        <div>
                            <h3>VIN-номер:</h3>
                            <b>{data.vin}</b>
                        </div>
                        <div>
                            <span>
                                <h3>Назначение:</h3>
                            </span>
                            <b>{data.use}</b>
                        </div>
                        <div>
                            <span>
                                <h3>Расход:</h3>
                                <p>(за прошлый месяц)</p>
                            </span>
                            <b>{data.month_expense} ₽</b>
                        </div>
                        {/* <div>
                            <span>
                                <h3>Доходность:</h3>
                                <p>(за прошлый месяц)</p>
                            </span>
                            <b>20590,5 ₽</b>
                        </div>
                        <div>
                            <h3>Прибыль:</h3>
                            <b>1230,23 ₽</b>
                        </div> */}
                        <div>
                            <h3>Средний расход:</h3>
                            <b>{data.average_consumption} ₽</b>
                        </div>
                        <button className="transport-item__btn-inventory" onClick={()=>show(LIABILITIES_TRANSPORT_INCOME)}>Внести расход</button>
                    </div>
                    
                    <div className="transport-item__graph">
                        
                        {/* <span><h2>Недвижимость на карте</h2></span> */}
                        {/* <div className="transport-item__graph-container"> */}
                            {/* <LineChart/> */}
                            <Slider elementsArr={elementsArr}/>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </div>       
    </>
    )
}