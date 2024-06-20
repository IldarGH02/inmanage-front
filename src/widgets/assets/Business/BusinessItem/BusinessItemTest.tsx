import React, { useContext } from "react";
import { YMaps } from "@pbe/react-yandex-maps";  
import { Slider } from "../../../Slider/Slider.jsx";
import "../business.css"
import { LineChart } from "../../../Chart/LineChart/LineChart";
import { ModalContext } from "../../../../features/context/modalProperty/ModalContext.js";
import { ASSETS_BUSINESS_DELETE, ASSETS_BUSINESS_INCOME, ASSETS_BUSINESS_INVENTORY } from "../../../modalWindow/types";
import { IAssetsBusiness } from "../../../../app/types/assets/business/IBusiness";

import editPencil from "../../../../../shared/assets/img/edit-pencil.png"
import logoHyundai from "../../../../../shared/assets/img/hyundai-logo.png"

interface IBusinessItemDTO {
    id: number, 
    name: string,
    address: string,
    direction: string,
    type: boolean,
}

interface IBusinessItem {
    data: IAssetsBusiness,
    onShowModal: (id:number, type:string)=>void,
    onEditModal: (transport: IBusinessItemDTO)=>void, 
}

export function BusinessItem({data, onShowModal, onEditModal}:IBusinessItem) {
    const {show} = useContext(ModalContext)

    // const infoIncome = {
    //     title: 'Доходы за последние 4-е месяца',
    //     subtitle: 'Доход'
    // }
    
    // const infoCost = {
    //     title: 'Расходы за последние 4-е месяца',
    //     subtitle: 'Расход'
    // }
    const elementsArr = [<YMaps/>, <LineChart/>, <LineChart/>]
    
    const remItem = (id:number)=> {
        onShowModal(id, ASSETS_BUSINESS_DELETE)
    }

    return (
        <>
        <div className="business-item">
            <div className="business-item__conteiner">
                <div className="business-item__header">
                    <div className="business-item__title">
                        <img src={logoHyundai} alt="" />
                        <span>
                            <h2>{data.name}</h2>
                            <p>{data.address}</p>
                        </span>
                        {/* {address} */}
                    </div>
                    <button className="business-item__btn-edit" onClick={()=>onEditModal({
                        id: data.id!, 
                        name: data.name, 
                        address: data.address,
                        direction: data.direction,
                        type: data.type,
                    })}>
                        <img src={editPencil} alt="" />
                    </button>
                    <button className="business-item__btn-remove" onClick={()=>remItem(data.id!)}>x</button>
                </div>
                <div className="business-item__content">
                    <div className="business-item__info">
                        <div>
                            <h3>Тип коммерции:</h3>
                            <b>{data.type ? 'офлайн' : 'онлайн'}</b>
                        </div>
                        <div>
                            <h3>Направление:</h3>
                            <b>{data.direction}</b>
                        </div>
                        <div>
                            <span>
                                <h3>Доход:</h3>
                                <p>(за прошлый месяц)</p>
                            </span>
                            <b>{data.month_income} ₽</b>
                        </div>
                        <div>
                            <span>
                                <h3>Расход:</h3>
                                <p>(за прошлый месяц)</p>
                            </span>
                            <b>{data.month_expense} ₽</b>
                        </div>
                        <div>
                            <h3>Чистая прибыль/убыток:</h3>
                            <b>1230,23 ₽</b>
                        </div>
                        <div>
                            <h3>Средняя прибыль:</h3>
                            <b>{data.average_profit} ₽</b>
                        </div>
                        <div className="business-item__container-btn">
                            <button className="business-item__btn-inventory" onClick={()=>onShowModal(data.id!, ASSETS_BUSINESS_INVENTORY)}>Инвентаризация</button>
                            <button className="property-item__btn-inventory" onClick={()=>show(ASSETS_BUSINESS_INCOME)}>Внести доход</button>
                        </div>
                    </div>
                    
                    <div className="business-item__map">
                        <Slider elementsArr={elementsArr}/>
                        {/* <span><h2>Недвижимость на карте</h2></span>
                        <div className="business-item__map-container">
                            <YMaps>
                                <Map 
                                width={'100%'} height={'100%'} 
                                defaultState={{ center: [53.20715999525243, 50.20105176126366], zoom: 14 }}
                                onLoad={ymaps => {
                                    ymaps.geocode(geoplace[0]).then(res=>console.log(res))
                                    // geocode(ymaps)
                                    // console.log(address)
                                }} modules={['geocode']}
                                > 
                                    {<Placemark
                                        geometry= {[53.20715999525243,50.20105176126366]}
                                        
                                        options={{
                                            // iconLayout: "default#image",
                                            iconImageSize: [50, 50],
                                            iconImageHref: marker
                                        }}
                                    />}
                                </Map>
                            </YMaps>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>


        
    </>
    )
}