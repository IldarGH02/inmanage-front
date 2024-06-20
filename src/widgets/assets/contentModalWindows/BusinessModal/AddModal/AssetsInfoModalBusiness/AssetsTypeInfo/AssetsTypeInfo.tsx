import React, { useContext, useEffect, useState } from "react"
import { IStep } from "../../../../../../../app/types/steps"
import { AddModalContext } from "../../../../../../../features/context/assets/property/addModal/AddModalContext"
import './assetsTypeInfo.css'
import "../../../../../../DropDownList/dropDownList.css"
import { IAssetsBusiness } from "../../../../../../../app/types/assets/business/IBusiness"
import { AlertContext } from "../../../../../../../features/context/alert/AlertContext"
import { Alert } from "../../../../../../Alert/Alert"

interface IContext {
    stepsArr: IStep[],
    dataArr: IAssetsBusiness,
    nextStep: () => void,
    earlierStep: () => void, 
}

const data = [
    {id: 1, content:'HTML'},
    {id: 2, content:'CSS'},
    {id: 3, content:'JS'},
    {id: 4, content:'TS'},
    {id: 5, content:'SQL'},
    {id: 6, content:'HTML'},
    {id: 7, content:'CSS'},
    {id: 8, content:'JS'},
    {id: 9, content:'TS'},
    {id: 10, content:'SQL'},
    {id: 11, content:'HTML'},
    {id: 12, content:'CSS'},
    {id: 13, content:'JS'},
    {id: 14, content:'TS'},
    {id: 15, content:'SQL'},   
]

export function AssetsTypeInfo() {
    const {alert} = useContext(AlertContext)
    const { dataArr } = useContext(AddModalContext) as IContext
    const [searchTypeSelector, setSearchTypeSelector] = useState('')
    const [typeSelector, setTypeSelector] = useState('')
    const [onlineCommerce, setOnlineCommerce] = useState(false)
    useEffect(()=>{
        setTypeSelector(dataArr.direction)
        setOnlineCommerce(dataArr.type)
    },[])

    function searchType() {
        let filter = searchTypeSelector.toUpperCase()
        let ul = document.getElementById("listTypeBusiness");
        let li = (ul as HTMLElement).getElementsByTagName("li");
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

    const changeTypeSelector = (event: React.FormEvent<HTMLInputElement>) => {
        setSearchTypeSelector(event.currentTarget.value)
        dataArr.direction = event.currentTarget.value
    }

    const setType = ()=> {
        (document.getElementById('accord_type') as HTMLInputElement).checked = false
    }

    return (
        <>
        <div className="assets-main-info__container">
           <div className="business-add-modal__item" style={{position:'relative', height: '110px'}}>
                <div className="business-add-modal__label" style={{fontSize: '25px', width: '100%', marginBottom: '25px'}}>Направление бизнеса</div>
                <div className="drop-down-list" style={{marginBottom: '55px'}}>
                    <input className="drop-down-list-input" type="checkbox" name="accord" id='accord_type'></input>
                    <label className="drop-down-list__title" htmlFor='accord_type'>
                        <p>{typeSelector === '' ?  'Выберете направление бизнеса' : typeSelector}</p> 
                    </label> 
                    <div className="drop-down-list__content">
                        <input type="text" id="inputSearchTypeBusiness" placeholder='Введите направление бизнеса' onKeyUp={searchType} value={searchTypeSelector} onChange={changeTypeSelector}/> 
                        <ul id = 'listTypeBusiness'>
                            {data.map((el)=>{
                                return (
                                    <li key={el.id} onClick={()=>{
                                        setTypeSelector(el.content)
                                        dataArr.direction = el.content
                                        setType()
                                    }}><p>{el.content}</p></li>
                                )
                            })}
                        </ul>
                    </div>           
                </div>       
            </div>
            <div className="assets-type-info__item">
                <div className="assets-type-info__label" style={{fontSize: '25px', width: '100%', marginBottom: '25px'}}>Тип коммерции</div>
                    <div className="assets-type-info__item-container">
                        <input type="radio" id="type1" checked={!onlineCommerce} onChange={()=>{
                            setOnlineCommerce(false)
                            dataArr.type = false}}/>
                        <label htmlFor="type1">онлайн</label>
                    </div>
                    <div className="assets-type-info__item-container">
                        <input type="radio" id="type2" checked={onlineCommerce} onChange={()=>{
                            setOnlineCommerce(true)
                            dataArr.type = true
                            }}/>
                        <label htmlFor="type2">офлайн</label>
                    </div>
            </div>
        </div>
        {alert.visible && alert.type==='Error' && <Alert text={alert.text} type={alert.type}/>}
        </>
    )
}