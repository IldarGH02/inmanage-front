import React, { useEffect, useState } from "react"
import "./businessStep2.css"
import { InputText } from "../../../../../../shared/ui/input/InputText/InputTextTest"
import { IAssetsBusiness } from "../../../../../../app/types/assets/IAssets"

interface IBusinessStep2 {
    onChangeBtnVisible: (flag: boolean) => void,
    onChangeValues: (obj: IAssetsBusiness) => void,
    data: IAssetsBusiness
}

export function BusinessStep2({onChangeBtnVisible, onChangeValues, data}:IBusinessStep2) {
    const [valueDirection, setValueDirection] = useState(data.direction)
    const [alertDirection, setAlertDirection] = useState('')
    const [onlineCommerce, setOnlineCommerce] = useState(data.type)


    useEffect(()=>{
        if(valueDirection!=='' && alertDirection==='') {
            onChangeBtnVisible(true)
        }
        else {
            onChangeBtnVisible(false)
        }
        data.direction = valueDirection
        data.type = onlineCommerce
        onChangeValues(data)
    },[onlineCommerce, valueDirection])

    // useEffect(()=>{
    //     setValueDirection(data.direction)
    //     setOnlineCommerce(data.type)
    // },[])
    
    return (
        <div className="property-add">
            <div className="property-add__item">
                <div className="property-add__name">Направление бизнеса<b>*</b></div>
                <InputText length={30} value={valueDirection} attentionFlag={true} setValue={setValueDirection} setAlert={setAlertDirection}/>
            </div>
            <div className="property-add__item">
                <div className="property-add__name">Тип коммерции<b>*</b></div>
                <div className="property-add__item-container">
                    <div className="property-add__rb">
                        <input type="radio" id="rb1" checked={!onlineCommerce} onChange={()=>{
                            setOnlineCommerce('')
                        }}/>
                        <label htmlFor="rb1">оффлайн</label>
                    </div>
                    <div className="property-add__rb">
                        <input type="radio" id="rb2" checked={false} onChange={()=>{
                            setOnlineCommerce('')
                        }}/>
                        <label htmlFor="rb2">онлайн</label>
                    </div>
                </div>
            </div>
        </div>
    )
}