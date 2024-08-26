import React, { useContext, useEffect, useState } from "react"
// import { IAlert } from "../../../../../app/types/alert/IAlert"
import { IAssetsProperty } from "../../../../../app/types/actives/realty/RealtyTypes.ts"
import { IStep } from "../../../../../app/types/steps"
import { Alert } from "../../../../Alert/Alert"
import { AlertContext } from "../../../../../features/context/alert/AlertContext"
import { AddModalContext } from "../../../../../features/context/assets/property/addModal/AddModalContext"
import './assetsMainInfoModalProperty.css'

interface IContext {
    stepsArr: IStep[],
    dataArr: IAssetsProperty,
    nextStep: () => void,
    earlierStep: () => void, 
}

// interface IAlertContext {
//     showAlert: (text:string, type: string)=>void, 
//     hideAlert: ()=>void,
//     alert: IAlert
// }

export function AssetsMainInfoModalProperty() {
    const { dataArr } = useContext(AddModalContext) as IContext
    // const { alert } = useContext(AlertContext)
    const {alert} = useContext(AlertContext)
    const [valueName, setValueName] = useState('')
    const [valueAddress, setValueAddress] = useState('')
    const [valueOwner, setValueOwner] = useState('')
    const [textAlertName, setTextAlertName] = useState('')
    const [textAlertOwner, setTextAlertOwner] = useState('')
    useEffect(()=>{
        setValueName(dataArr.name)
        setValueAddress(dataArr.address)
        setValueOwner(dataArr.owner)
    },[])

    const changeName = (event: React.FormEvent<HTMLInputElement>) => {
        const maxLength = 30
        const length = event.currentTarget.value.length
        setValueName(event.currentTarget.value)
        if(length<=maxLength) {
            setTextAlertName('')
            dataArr.name = event.currentTarget.value
        }
        else {
            dataArr.name = ''
            setTextAlertName(`допустимое количество символов превышено на ${length - maxLength}`)
        }
    }

    const changeOwner = (event: React.FormEvent<HTMLInputElement>) => {
        const maxLength = 30
        const length = event.currentTarget.value.length
        if(length<=maxLength) {
            setTextAlertOwner('')
            setValueOwner(event.currentTarget.value)
            dataArr.owner = event.currentTarget.value
        }
        else {
            dataArr.name = ''
            setValueOwner(event.currentTarget.value)
            setTextAlertOwner(`допустимое количество символов превышено на ${length - maxLength}`)
        }
    }

    const changeAddress = (event: React.FormEvent<HTMLInputElement>) => {
        setValueAddress(event.currentTarget.value)
        dataArr.address = event.currentTarget.value
    }

    return (
        <>
        <div className="assets-main-info__container">
            <div className="assets-main-info__item">
                <div className="assets-main-info__label">Название недвижимости</div>
                <input type='text' value={valueName} onChange={changeName}></input>
                {textAlertName!=='' && <Alert text={textAlertName} type={'warning'}/>}
            </div>
            <div className="assets-main-info__item">
                <div className="assets-main-info__label">Адрес недвижимости</div>
                <input type="text" value={valueAddress} onChange={changeAddress}/>
            </div>
            <div className="assets-main-info__item">
                <div className="assets-main-info__label">Владелец</div>
                <input type='text' value={valueOwner} onChange={changeOwner}></input>
                {textAlertOwner!=='' && <Alert text={textAlertOwner} type={'warning'}/>}
            </div>
            
        </div>
        {alert.visible && alert.type==='Error' && <Alert text={alert.text} type={alert.type}/>}
        </>
    )
}