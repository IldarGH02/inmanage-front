import React, { useState } from "react";
import "./dropDownListTransport.css";
import { IDropDownList } from "../../../../../app/types/elements/IDropDownList";

interface IDropDownListProps {
    data: IDropDownList[],
    value: string,
    setValue: (val: string)=>void,
    placeholder: string,
    idDDList: string
}

export function DropDownListTransport({data, value, setValue, placeholder, idDDList}:IDropDownListProps) {
    const [searchSelector, setSearchSelector] = useState('')

    // useEffect(()=>{
    //     console.log(data)
    // },[])

    const changeSearchSelector = (event: React.FormEvent<HTMLInputElement>) => {
        setSearchSelector(event.currentTarget.value)
    }

    function searchBrand() {
        let filter = searchSelector.toUpperCase()
        let ul = document.getElementById('expense-ddlist-searching');
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
        (document.getElementById(idDDList) as HTMLInputElement).checked = false
    }

    return (
        <div className="drop-down-list-transport">
            <input className="drop-down-list-transport-input" type="checkbox" name="accord" id={idDDList} onClick={()=>console.log(data)}></input>
            <label className="drop-down-list-transport__title" htmlFor={idDDList}>
                <div className="drop-down-list-transport__label" style={{fontSize: value!==''?'15px':'20px'}}>{placeholder}</div>
                <p className="drop-down-list-transport__value">{value}</p> 
            </label> 
            <div className="drop-down-list-transport__content">
                <input type="text" onKeyUp={searchBrand} value={searchSelector} onChange={changeSearchSelector}/> 
                {data.length === 0 && 
                    <div className="drop-down-list-transport__list-empty">Список пуст...</div>
                }
                <ul id="expense-ddlist-searching">
                {data.map((el)=>{
                    return (
                        <li key={el.id} onClick={()=>{
                            setValue(el.content)
                            setItem()
                        }}><p>{el.content}</p></li>
                    )
                })}
                </ul>
            </div>      
        </div>
    )
}