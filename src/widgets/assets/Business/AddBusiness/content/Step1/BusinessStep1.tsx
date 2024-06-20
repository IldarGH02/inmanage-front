import React, { useEffect, useState } from "react"
import "./businessStep1.css"
import { InputText } from "../../../../../../shared/ui/input/InputText/InputTextTest"
import { IAssetsBusiness } from "../../../../../../app/types/assets/IAssets"

interface IBusinessStep1 {
    onChangeBtnVisible: (flag: boolean) => void,
    onChangeValues: (obj: IAssetsBusiness) => void,
    data: IAssetsBusiness
}

export function BusinessStep1({onChangeBtnVisible, onChangeValues, data}:IBusinessStep1) {
    const [valueName, setValueName] = useState('')
    const [alertName, setAlertName] = useState('')
    const [valueAddress, setValueAddress] = useState('')
    const [alertAddress, setAlertAddress] = useState('')
    // const [valueOwner, setValueOwner] = useState('')
    // const [alertOwner, setAlertOwner] = useState('')

    useEffect(()=>{
        setValueName(data.name)
        setValueAddress(data.address)
        // setValueOwner(data.owner)
    },[])

    useEffect(()=>{
        data.name = valueName
        data.address = valueAddress
        // data.owner = valueOwner
        onChangeValues(data)
        if(valueName!=='' && alertName==='' && valueAddress!=='' && alertAddress==='') {
            onChangeBtnVisible(true)
            // data.name = valueName
            // data.address = valueAddress
            // data.owner = valueOwner
            // onChangeValues(data)
        }
        else {
            onChangeBtnVisible(false)
        }
    },[valueName,valueAddress])
    
    return (
        <div className="property-add">
            <div className="property-add__item">
                <div className="property-add__name">Название бизнеса<b>*</b></div>
                <InputText length={30} value={valueName} attentionFlag={true} setValue={setValueName} setAlert={setAlertName}/>
            </div>
            <div className="property-add__item">
                <div className="property-add__name">Адрес<b>*</b></div>
                <InputText length={30} value={valueAddress} attentionFlag={true} setValue={setValueAddress} setAlert={setAlertAddress}/>
            </div>
            {/* <div className="property-add__item">
                <div className="property-add__name">Владелец</div>
                <InputText length={30} value={valueOwner} attentionFlag={false} setValue={setValueOwner} setAlert={setAlertOwner}/>
            </div> */}
        </div>
    )
}