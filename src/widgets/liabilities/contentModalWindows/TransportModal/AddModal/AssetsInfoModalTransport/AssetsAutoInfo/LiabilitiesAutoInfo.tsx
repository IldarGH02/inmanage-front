import React, { useContext, useEffect, useState } from "react"
import { IAssetsTransport } from "../../../../../../../app/types/assets/transport/ITransport"
import { IStep } from "../../../../../../../app/types/steps"
import { Alert } from "../../../../../../Alert/Alert"
import { AlertContext } from "../../../../../../../features/context/alert/AlertContext"
import { AddModalContext } from "../../../../../../../features/context/assets/property/addModal/AddModalContext"
import "../../../../../../DropDownList/dropDownList.css"

import './liabilitiesAutoInfo.css'

const data = [
    {id: 1, content:'Skoda'},   
]

const data2 = [
    {id: 1, content:'Rapid'},
    {id: 2, content:'Octavia'},
    {id: 3, content:'Superb'},
]

interface IContext {
    stepsArr: IStep[],
    dataArr: IAssetsTransport,
    nextStep: () => void,
    earlierStep: () => void, 
}

export function LiabilitiesAutoInfo() {
    const { dataArr } = useContext(AddModalContext) as IContext
    const [searchBrandSelector, setSearchBrandSelector] = useState('')
    const [searchModelSelector, setSearchModelSelector] = useState('')
    const [valueVIN, setValueVIN] = useState('')
    const [brandSelector, setBrandSelector] = useState('')
    const [modelSelector, setModelSelector] = useState('')
    const [valuePurpose, setValuePurpose] = useState('')
    const [textAlertVIN, setTextAlertVIN] = useState('')
    const {alert} = useContext(AlertContext)
    const [textAlertPurpose, setTextAlertPurpose] = useState('')
    useEffect(()=>{
        setValueVIN(dataArr.vin)
        setValuePurpose(dataArr.use)
        setModelSelector('dataArr.name')
        setBrandSelector('dataArr.brand')
    },[])

    function searchBrand() {
        let filter = searchBrandSelector.toUpperCase()
        let ul = document.getElementById("listBrand");
        let li = (ul as HTMLElement).getElementsByTagName("li");
        console.log(filter)
        // Перебирайте все элементы списка и скрывайте те, которые не соответствуют поисковому запросу
        for (let i = 0; i < li.length; i++) {
            let a = li[i].getElementsByTagName("p")[0];
            // console.log(a)
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                (li[i] as HTMLElement).style.display = "";
                
            } else {
                (li[i] as HTMLElement).style.display = "none";
            }
        }
    }

    function searchModel() {
        let filter = searchModelSelector.toUpperCase()
        let ul = document.getElementById("listModel");
        let li = (ul as HTMLElement).getElementsByTagName("li");
        console.log(filter)
        // Перебирайте все элементы списка и скрывайте те, которые не соответствуют поисковому запросу
        for (let i = 0; i < li.length; i++) {
            let a = li[i].getElementsByTagName("p")[0];
            // console.log(a)
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                (li[i] as HTMLElement).style.display = "";
                
            } else {
                (li[i] as HTMLElement).style.display = "none";
            }
        }
    }

    const changeBrandSelector = (event: React.FormEvent<HTMLInputElement>) => {
        setSearchBrandSelector(event.currentTarget.value)
        // dataArr.brand =event.currentTarget.value
    }

    const changeModelSelector = (event: React.FormEvent<HTMLInputElement>) => {
        setSearchModelSelector(event.currentTarget.value)

        // dataArr.name =event.currentTarget.value
    }

    const changeVIN = (event: React.FormEvent<HTMLInputElement>) => {
        const maxLength = 17
        let length = event.currentTarget.value.replace(/ /g,'').length
        setValueVIN(event.currentTarget.value.replace(/ /g,''))
        if(length===maxLength) {
            setTextAlertVIN('')
            dataArr.vin = event.currentTarget.value
        }
        else {
            dataArr.vin = ''
            if(length>=1 && length<17) {
                setTextAlertVIN(`осталось ввести симовов для заполнения ${maxLength - length}`)
            }
            if(length>maxLength) {
                setTextAlertVIN(`допустимое количество символов превышено на ${length - maxLength}`)
            }
            if(length===0) {
                setTextAlertVIN('')
            }
        } 
        
    }

    const changePurpose = (event: React.FormEvent<HTMLInputElement>) => {
        const maxLength = 35
        let length = event.currentTarget.value.length
        setValuePurpose(event.currentTarget.value)
        if(length<maxLength) {
            setTextAlertPurpose('')
            dataArr.use = event.currentTarget.value
        }
        else {
            dataArr.use = ''
            setTextAlertPurpose(`допустимое количество символов превышено на ${length - maxLength}`)
        } 
        // setValuePurpose(event.currentTarget.value)
        // dataArr.purpose = event.currentTarget.value
    }

    const setBrand = ()=> {
        (document.getElementById('accord_1') as HTMLInputElement).checked = false
    }

    const setModel = ()=> {
        (document.getElementById('accord_2') as HTMLInputElement).checked = false
    }

    return ( 
        <>
        <div className="assets-auto-info__container">
            <div className="assets-auto-info__item-container-auto">
                <div className="assets-auto-info__item">
                    <div className="assets-auto-info__label">Марка автомобиля</div>
                    {/* <DropDownList data={arr} keyId={0}></DropDownList> */}
                    <div className="drop-down-list">
                        <input className="drop-down-list-input" type="checkbox" name="accord" id='accord_1'></input>
                        <label className="drop-down-list__title" htmlFor='accord_1'>
                            <p>{brandSelector === '' ?  'Выберете марку транспорта' : brandSelector}</p> 
                        </label> 
                        <div className="drop-down-list__content">
                            <input type="text" id="inputSearchBrand" placeholder='Введите марку транспорта' onKeyUp={searchBrand} value={searchBrandSelector} onChange={changeBrandSelector}/> 
                            <ul id = 'listBrand'>
                                {data.map((el)=>{
                                    return (
                                        <li key={el.id} onClick={()=>{
                                            setBrandSelector(el.content)
                                            // dataArr.brand = el.content
                                            setBrand()
                                        }}><p>{el.content}</p></li>
                                    )
                                })}
                            </ul>
                        </div>           
                    </div>
                </div>
                <div className="assets-auto-info__item">
                    <div className="assets-auto-info__label">Модель автомобиля</div>
                    <div className="drop-down-list">
                        <input className="drop-down-list-input" type="checkbox" name="accord" id='accord_2'></input>
                        <label className="drop-down-list__title" htmlFor='accord_2'>
                            <p>{modelSelector === '' ?  'Выберете марку транспорта' : modelSelector}</p> 
                        </label> 
                        <div className="drop-down-list__content">
                            <input type="text" id="inputSearchModel" placeholder='Введите модель транспорта' onKeyUp={searchModel} value={searchModelSelector} onChange={changeModelSelector}/> 
                            <ul id = 'listModel'>
                                {data2.map((el)=>{
                                    return (
                                        <li key={el.id} onClick={()=>{
                                            setModelSelector(el.content)
                                            // dataArr.name = el.content
                                            setModel()
                                        }}><p>{el.content}</p></li>
                                    )
                                })}
                            </ul>
                        </div>           
                    </div>
                    {/* <DropDownList data={arr} keyId={1}></DropDownList> */}
                </div>
            </div>
            <div className="assets-auto-info__item">
                <div className="assets-auto-info__label">VIN-номер</div>
                <input type="text" value={valueVIN} onChange={changeVIN}/>
                {textAlertVIN!=='' && <Alert text={textAlertVIN} type={'warning'}/>}
            </div>
            <div className="assets-auto-info__item">
                <div className="assets-auto-info__label">Назначение</div>
                <input type="text" value={valuePurpose} onChange={changePurpose}/>
                {textAlertPurpose!=='' && <Alert text={textAlertPurpose} type={'warning'}/>}
            </div>
        </div>
        {alert.visible && alert.type==='Error' && <Alert text={alert.text} type={alert.type}/>}
        </>
    )
}