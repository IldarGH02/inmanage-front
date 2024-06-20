import React, { useEffect, useState } from "react"
import "./propertyStep3.css"
import { ILiabilitiesProperty } from "../../../../../../app/types/liabilities/ILiabilities"

interface IPropertyStep3 {
    onChangeValues: (obj: ILiabilitiesProperty)=>void, 
    data: ILiabilitiesProperty
}

export function PropertyStep3({onChangeValues, data}: IPropertyStep3) {
    const [longRent, setLongRent] = useState(false)

    useEffect(()=>{
        setLongRent(false) // Илья брал данные в булевом значении из data
    },[])

    useEffect(()=>{
        // data.rent_type = longRent
        onChangeValues(data)
    },[longRent])
    
    return (
        <div className="property-add">
            <div className="property-add__item">
                <div className="property-add__name">Тип аренды</div>
                <div className="property-add__item-container">
                    <div className="property-add__rb">
                        <input type="radio" id="rb1" checked={!longRent} onChange={()=>{
                            setLongRent(false)
                        }}/>
                        <label htmlFor="rb1">посуточная</label>
                    </div>
                    <div className="property-add__rb">
                        <input type="radio" id="rb2" checked={longRent} onChange={()=>{
                            setLongRent(true)
                        }}/>
                        <label htmlFor="rb2">долгосрочная</label>
                    </div>
                </div>
            </div>
        </div>
    )
}