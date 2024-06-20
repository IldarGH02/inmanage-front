import React, { useEffect, useState } from 'react'
import './dropDownList.css'

type dataDropDownList = {
    id: number,
    content: string
}

interface IDropDownList {
    data: dataDropDownList[],
    value: string,
    setValue: (val: string)=>void,
    id: string,
    idSearching: string,
    placeholder: string
}

export function DropDownList({data, value, setValue, id, idSearching, placeholder}:IDropDownList) {
    const [searchSelector, setSearchSelector] = useState('')
    // const [brandSelector, setBrandSelector] = useState(value)

    useEffect(()=>{
        // console.log(keys[0])
    },[])

    const changeBrandSelector = (event: React.FormEvent<HTMLInputElement>) => {
        setSearchSelector(event.currentTarget.value)
    }

    function searchBrand() {
        let filter = searchSelector.toUpperCase()
        let ul = document.getElementById(idSearching);
        // console.log(ul?.getElementsByTagName('ul'))
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

    const setBrand = ()=> {
        (document.getElementById(id) as HTMLInputElement).checked = false
    }

    return (
        <div className="drop-down-list">
            <input className="drop-down-list-input" type="checkbox" name="accord" id={id}></input>
            <label className="drop-down-list__title" htmlFor={id}>
                <p>{value === '' ?  placeholder : value}</p> 
            </label> 
            <div className="drop-down-list__content">
                <input type="text" onKeyUp={searchBrand} value={searchSelector} onChange={changeBrandSelector}/> 
                <ul id={idSearching}>
                {data.map((el)=>{
                    return (
                        <li key={el.id} onClick={()=>{
                            // setBrandSelector(el.content)
                            setValue(el.content)
                            setBrand()
                        }}><p>{el.content}</p></li>
                    )
                })}
                </ul>
            </div>          
        </div>
    )
}