import React, { useState } from "react";
import "./addModal.css"

const arr = [
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

export function AddModal() {
    const [valueOwner, setValueOwner] = useState('')
    const [valueVIN, setValueVIN] = useState('')
    const [valuePurpose, setValuePurpose] = useState('')
    // const {hide} = useContext(ModalContext)
    const [visibleBrand, setVisibleBrand] = useState(false)
    const [visibleModel, setVisibleModel] = useState(false)
    const [brandSelector, setBrandSelector] = useState('')
    const [modelSelector, setModelSelector] = useState('')

    function searchBrand() {
        let input = document.getElementById("inputSearchBrand");
        let filter = (input as HTMLInputElement).value.toUpperCase();
        let ul = document.getElementById("listBrand");
        let li = (ul as HTMLElement).getElementsByTagName("li");
        // Перебирайте все элементы списка и скрывайте те, которые не соответствуют поисковому запросу
        for (let i = 0; i < li.length; i++) {
            let a = li[i].getElementsByTagName("p")[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                (li[i] as HTMLElement).style.display = "";
            } else {
                (li[i] as HTMLElement).style.display = "none";
            }
        }
    }

    function searchModel() {
        let input = document.getElementById("inputSearchModel");
        let filter = (input as HTMLInputElement).value.toUpperCase();
        let ul = document.getElementById("listModel");
        let li = (ul as HTMLElement).getElementsByTagName("li");
        // Перебирайте все элементы списка и скрывайте те, которые не соответствуют поисковому запросу
        for (let i = 0; i < li.length; i++) {
            let a = li[i].getElementsByTagName("p")[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                (li[i] as HTMLElement).style.display = "";
            } else {
                (li[i] as HTMLElement).style.display = "none";
            }
        }
    }

    const changeBrandSelector = (event: React.FormEvent<HTMLInputElement>) => {
        setBrandSelector(event.currentTarget.value)
    }

    const changeModelSelector = (event: React.FormEvent<HTMLInputElement>) => {
        setModelSelector(event.currentTarget.value)
    }

    const changeOwner = (event: React.FormEvent<HTMLInputElement>) => {
        setValueOwner(event.currentTarget.value)
    }

    const changeVIN = (event: React.FormEvent<HTMLInputElement>) => {
        setValueVIN(event.currentTarget.value)
    }

    const changePurpose = (event: React.FormEvent<HTMLInputElement>) => {
        setValuePurpose(event.currentTarget.value)
    }

    return (
        <div className="transport-add-modal">
            <div className="transport-add-modal__title">
                <h1>Добавление нового транспорта</h1>
                {/* <button className="add-modal__close-btn" onClick={hide}>x</button> */}
            </div>
            <div className="transport-add-modal__content">
                <div className="transport-add-modal__item-container-auto">
                    <div className="transport-add-modal__item">
                        <div className="transport-add-modal__label">Марка автомобиля</div>
                        {/* <DropDownList></DropDownList> */}
                        <input type="text" id="inputSearchBrand" onKeyUp={searchBrand} onClick={()=>setVisibleBrand(!visibleBrand)} value={brandSelector} onChange={changeBrandSelector} onBlur={()=>setTimeout(()=>setVisibleBrand(false),200)}/> 
                        {visibleBrand && 
                            <div className="transport-add-modal__search-list" >
                                <div className="search-list__title"><h3>Выберете марку автомобиля</h3></div>
                                <ul id = 'listBrand'>
                                    {arr.map((el)=>{
                                        return (
                                            <li key={el.id} onClick={()=>setBrandSelector(el.content)}><p>{el.content}</p></li>
                                        )
                                    })}
                                </ul>
                            </div>
                        }
                    </div>
                    <div className="transport-add-modal__item">
                        <div className="transport-add-modal__label">Модель автомобиля</div>
                        <input type="text" id="inputSearchModel" onKeyUp={searchModel} onClick={()=>setVisibleModel(!visibleModel)} value={modelSelector} onChange={changeModelSelector} onBlur={()=>setTimeout(()=>setVisibleModel(false),200)}/> 
                        {visibleModel && 
                            <div className="transport-add-modal__search-list">
                                <div className="search-list__title"><h3>Выберете модель автомобиля</h3></div>
                                <ul id = 'listModel'>
                                    {arr.map((el)=>{
                                        return (
                                            <li key={el.id} onClick={()=>setModelSelector(el.content)}><p>{el.content}</p></li>
                                        )
                                    })}
                                </ul>
                            </div>
                        }
                    </div>
                </div>
                <div className="transport-add-modal__item">
                    <div className="transport-add-modal__label">Владелец по ПТС</div>
                    <input type="text" value={valueOwner} onChange={changeOwner}/>
                </div>
                <div className="transport-add-modal__item">
                    <div className="transport-add-modal__label">VIN-номер</div>
                    <input type="text" value={valueVIN} onChange={changeVIN}/>
                </div>
                <div className="transport-add-modal__item">
                    <div className="transport-add-modal__label">Назначение</div>
                    <input type="text" value={valuePurpose} onChange={changePurpose}/>
                </div>
                <div className="transport-add-modal__item">
                    <div className="transport-add-modal__label">Тип собственника</div>
                    <div className="transport-add-modal__checkbox-group">
                        <div className="transport-add-modal__item-container">
                            <input type="radio" id="type1" />
                            <label htmlFor="type1">юредическое лицо</label>
                            {/* <span></span> */}
                            {/* <div>посуточно</div> */}
                        </div>
                        <div className="transport-add-modal__item-container">
                            <input type="radio" id="type2" />
                            <label htmlFor="type2">физическое лицо</label>
                            {/* <span></span> */}
                            {/* <div>посуточно</div> */}
                        </div>
                        {/* <div className="business-add-modal__item-container">
                            <input type="checkbox" />
                            <span>долгосрочная</span>
                        </div> */}
                    </div>
                    
                </div>
            </div>
            <div className="transport-add-modal__footer">
                <button className="transport-add-modal__add-btn">Добавить</button>
                {/* <button className="transport-add-modal__cancel-btn" onClick={hide}>Отменить</button> */}
            </div>
        </div>
    )
}