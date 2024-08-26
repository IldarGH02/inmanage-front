import { useContext, useEffect, useState } from "react"
import { IAssetsProperty } from "../../../../../../app/types/actives/realty/RealtyTypes.ts"
import { IStep } from "../../../../../../app/types/steps"
import { AddModalContext } from "../../../../../../features/context/assets/property/addModal/AddModalContext"
import './assetsTypeInfo.css'

interface IContext {
    stepsArr: IStep[],
    dataArr: IAssetsProperty,
    nextStep: () => void,
    earlierStep: () => void, 
}

export function AssetsTypeInfo() {
    const { dataArr } = useContext(AddModalContext) as IContext
    const [longRent, setLongRent] = useState(false)
    useEffect(()=>{
        setLongRent(dataArr.rent_type)
    },[])

    return (
        <div className="assets-type-info__container">
            <div className="assets-type-info__item">
                <div className="assets-type-info__label">Тип аренды</div>
                    <div className="assets-type-info__item-container">
                        <input type="radio" id="rent1" checked={!longRent} onChange={()=>{
                            setLongRent(false)
                            dataArr.rent_type = false}}/>
                        <label htmlFor="rent1">посуточная</label>
                        {/* <span></span> */}
                        {/* <div>посуточно</div> */}
                    </div>
                    <div className="assets-type-info__item-container">
                        <input type="radio" id="rent2" checked={longRent} onChange={()=>{
                            setLongRent(true)
                            dataArr.rent_type = true
                            }}/>
                        <label htmlFor="rent2">долгосрочная</label>
                        {/* <span></span> */}
                        {/* <div>посуточно</div> */}
                    </div>
                
            </div>
        </div>
    )
}