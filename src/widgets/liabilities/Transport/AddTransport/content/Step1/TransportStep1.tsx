import React, { useEffect, useState } from "react"
import "./transportStep1.css"
import { InputText } from "../../../../../../shared/ui/input/InputText/InputTextTest" 
import { InputTextVIN } from "../../../../../assets/Transport/AddTransport/inputVIN/InputVIN" 
import { DropDownList } from "../../../../../DropDownList/DropDownList"
import { ILiabilitiesTransport } from "../../../../../../app/types/liabilities/ILiabilities"

const name = [
    {id: 1, content:'Skoda'},   
]

const model = [
    {id: 1, content:'Rapid'},
    {id: 2, content:'Octavia'},
    {id: 3, content:'Superb'},
]

interface ITransportStep1 {
    onChangeBtnVisible: (flag: boolean) => void,
    onChangeValues: (obj: ILiabilitiesTransport) => void,
    data: ILiabilitiesTransport
}

export function TransportStep1({onChangeBtnVisible, onChangeValues, data}:ITransportStep1) {
    const [valueUse, setValueUse] = useState('')
    const [alertUse, setAlertUse] = useState('')
    const [valueVIN, setValueVIN] = useState('')
    const [alertVIN, setAlertVIN] = useState('')


    const [brandSelector, setBrandSelector] = useState('')
    const [modelSelector, setModelSelector] = useState('')

    useEffect(()=>{
        setValueVIN(data.vin)
        setValueUse(data.use)
        setModelSelector(data.model)
        setBrandSelector(data.mark)
    },[])

    useEffect(()=>{
        data.use = valueUse
        data.vin = valueVIN
        data.model = modelSelector
        data.mark = brandSelector
        onChangeValues(data)
        if(alertUse==='' && valueVIN!=='' && alertVIN==='' && brandSelector!=='' && modelSelector!=='') {
            onChangeBtnVisible(true)
        }
        else {
            onChangeBtnVisible(false)
        }
    },[valueUse,valueVIN, brandSelector, modelSelector])
    
    return (
        <div className="property-add">
            <div className="property-add__accordion-container">
                <div className="property-add__item">
                    <div className="property-add__name">Марка транспорта<b>*</b></div>
                    <DropDownList data={name} value={brandSelector} setValue={setBrandSelector} id={'accord_1'} idSearching='list1' placeholder="Выберете марку транспорта"/>
                </div>
                <div className="property-add__item">
                    <div className="property-add__name">Модель транспорта<b>*</b></div>
                    <DropDownList data={model} value={modelSelector} setValue={setModelSelector} id={'accord_2'} idSearching='list2' placeholder="Выберете модель транспорта"/>
                </div>
            </div>
            <div className="property-add__item">
                <div className="property-add__name">VIN-номер<b>*</b></div>
                <InputTextVIN value={valueVIN} setValue={setValueVIN} setAlert={setAlertVIN}/>
            </div>
            <div className="property-add__item">
                <div className="property-add__name">Назначение</div>
                <InputText length={30} value={valueUse} attentionFlag={false} setValue={setValueUse} setAlert={setAlertUse}/>
            </div>
        </div>
    )
}