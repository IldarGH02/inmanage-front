import React, { useContext, useState } from "react";
import { ModalContext } from "../../../../../features/context/modalProperty/ModalContext";
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
    const {hide} = useContext(ModalContext)
    const [visibleBusinessList, setVisibleBusinessList] = useState(false)
    const [businessSelector, setBusinessSelector] = useState('')
    const [visibleBusinessLogo] = useState(false) //setVisibleBusinessLogo

    document.getElementById('rent1')?.addEventListener('click', ()=>{
        // document.getElementById('rent2')?.prop('checked', false)
    })

    function searchBusiness() {
        let input = document.getElementById("inputSearchBusiness");
        let filter = (input as HTMLInputElement).value.toUpperCase();
        let ul = document.getElementById("listBusiness");
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

    const changeBusinessSelector = (event: React.FormEvent<HTMLInputElement>) => {
        setBusinessSelector(event.currentTarget.value)
    }

    return (
        <div className="business-add-modal">
            <div className="business-add-modal__title">
                <h1>Добавление нового бизнеса</h1>
                <button className="business-add-modal__close-btn" onClick={hide}>x</button>
            </div>
            <div className="business-add-modal__content">
                <div className="business-add-modal__item">
                    <div className="business-add-modal__label">Логотип бизнеса</div>
                    {visibleBusinessLogo && 
                    <div className="bisness-logo-choice">
                        <h2 className="bisness-logo-choice__title">Выберете логотип бизнеса или загрузите свой</h2>
                        <div className="bisness-logo-choice__list">

                        </div>
                        <div className="bisness-logo-choice__footer"></div>
                    </div>}
                    <div className="business-add-modal__container-btn">
                        <span><b>Выбрать из имеющихся</b> <button className="business-add-modal__photo-btn">Выбрать</button></span>
                        <span><b>Загрузить свой</b> <input type="file"/></span>
                    </div>
                </div>
                <div className="business-add-modal__item">
                    <div className="business-add-modal__label">Название бизнеса</div>
                    <input type="text"/>
                </div>
                <div className="business-add-modal__item">
                    <div className="business-add-modal__label">Адрес бизнеса</div>
                    <input type="text"/>
                </div>
                <div className="business-add-modal__item">
                    <div className="business-add-modal__label">Направление бизнеса</div>
                    <input type="text" id="inputSearchBusiness" onKeyUp={searchBusiness} onClick={()=>setVisibleBusinessList(!visibleBusinessList)} value={businessSelector} onChange={changeBusinessSelector} onBlur={()=>setTimeout(()=>setVisibleBusinessList(false), 200)}/> 
                    {visibleBusinessList && 
                        <div className="business-add-modal__search-list">
                            <div className="search-list__title"><h3>Выберете направление бизнеса</h3></div>
                            <ul id = 'listBusiness'>
                                {arr.map((el)=>{
                                    return (
                                        <li key={el.id} onClick={()=>setBusinessSelector(el.content)}><p>{el.content}</p></li>
                                    )
                                })}
                            </ul>
                        </div>
                    }
                </div>
                <div className="business-add-modal__item">
                    <div className="business-add-modal__label">Тип коммерции</div>
                    <div className="business-add-modal__checkbox-group">
                        <div className="business-add-modal__item-container">
                            <input type="radio" id="rent1" />
                            <label htmlFor="rent1">онлайн</label>
                            {/* <span></span> */}
                            {/* <div>посуточно</div> */}
                        </div>
                        <div className="business-add-modal__item-container">
                            <input type="radio" id="rent2" />
                            <label htmlFor="rent2">офлайн</label>
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
            <div className="business-add-modal__footer">
                <button className="business-add-modal__add-btn">Добавить</button>
                <button className="business-add-modal__cancel-btn" onClick={hide}>Отменить</button>
            </div>
        </div>
    )
}