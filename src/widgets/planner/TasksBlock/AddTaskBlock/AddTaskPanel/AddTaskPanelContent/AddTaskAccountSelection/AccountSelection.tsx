import React, { useState } from "react";
import "./addTaskAccountSelection.css";
import { IExpenseSliderCategory } from "../../../../../../../app/types/balance/IBalance";

interface IDropDownList {
    data: IExpenseSliderCategory[],
    value: string,
    setValue: (val: string)=>void,
    placeholder: string
}

export function AccountSelection({data, value, setValue, placeholder}:IDropDownList) {
    const [searchSelector, setSearchSelector] = useState('')

    // useEffect(()=>{
    //     console.log(data)
    // },[])

    const changeSearchSelector = (event: React.FormEvent<HTMLInputElement>) => {
        setSearchSelector(event.currentTarget.value)
    }

    function searchBrand() {
        let filter = searchSelector.toUpperCase()
        let ul = document.getElementById('account-selection-searching');
        let li = (ul as HTMLElement).getElementsByTagName("li");
        
        // Перебирайте все элементы списка и скрывайте те, которые не соответствуют поисковому запросу
        for (let i = 0; i < li.length; i++) {
            console.log(li[i].getElementsByTagName("p")[0])
            let a = li[i].getElementsByTagName("p")[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                (li[i] as HTMLElement).style.display = "";
                
            } else {
                (li[i] as HTMLElement).style.display = "none";
            }
        }
    }

    const setItem = ()=> {
        (document.getElementById('account-selection-ddlist') as HTMLInputElement).checked = false
    }

    return (
        <div className="account-selection">
            <input className="account-selection-input" type="checkbox" name="accord" id="account-selection-ddlist" onClick={()=>console.log(data)}></input>
            <label className="account-selection__title" htmlFor="account-selection-ddlist">
                <p>{value === '' ?  placeholder : value}</p> 
            </label> 
            <div className="account-selection__content">
                <input type="text" onKeyUp={searchBrand} value={searchSelector} onChange={changeSearchSelector}/> 
                {data.length === 0 && 
                    <div className="account-selection__list-empty">Список пуст...</div>
                }
                <ul id="account-selection-searching">
                {data.map((el)=>{
                    return (
                        <li key={el.id} onClick={()=>{
                            setValue(el.name)
                            setItem()
                        }}><p>{el.name}</p></li>
                    )
                })}
                </ul>
            </div>      
        </div>
    )
}