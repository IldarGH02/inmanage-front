import React, { useEffect, useState } from "react"
import "./transportStep2.css"
import { InputText } from "../../../../../../shared/ui/input/InputText/InputTextTest"
import { IAssetsTransport } from "../../../../../../app/types/assets/IAssets"

interface ITransportStep2 {
    onChangeBtnVisible: (flag: boolean) => void, 
    onChangeValues: (obj: IAssetsTransport)=>void, 
    data: IAssetsTransport
}

export function TransportStep2({onChangeBtnVisible, onChangeValues, data}: ITransportStep2) {
    const [ownerPTS, setOwnerPTS] = useState('')
    const [individualPerson, setIndividualPerson] = useState(false)//физическое лицо

    const [textAlertOwnerPTS, setTextAlertOwnerPTS] = useState('')

    useEffect(()=>{
        setIndividualPerson(data.owner_type)
        setOwnerPTS('data.owner') //data.owner
    },[])

    useEffect(()=>{
        data.owner_type = individualPerson
        // data.owner = ownerPTS
        onChangeValues(data)
        if(textAlertOwnerPTS==='') {
            onChangeBtnVisible(true)
        }
        else {
            onChangeBtnVisible(false)
        }
    },[individualPerson, ownerPTS])
    
    return (
        <div className="property-add">
            <div className="property-add__item">
                <div className="property-add__name">Владелец по ПТС</div>
                <InputText length={50} value={ownerPTS} attentionFlag={false} setValue={setOwnerPTS} setAlert={setTextAlertOwnerPTS}/>
            </div>
            <div className="property-add__item">
                <div className="property-add__name">Тип собственности</div>
                <div className="property-add__item-container">
                    <div className="property-add__rb">
                        <input type="radio" id="rb1" checked={!individualPerson} onChange={()=>{
                            setIndividualPerson(false)
                        }}/>
                        <label htmlFor="rb1">физическое лицо</label>
                    </div>
                    <div className="property-add__rb">
                        <input type="radio" id="rb2" checked={individualPerson} onChange={()=>{
                            setIndividualPerson(true)
                        }}/>
                        <label htmlFor="rb2">юредическое лицо</label>
                    </div>
                </div>
            </div>
        </div>
    )
}