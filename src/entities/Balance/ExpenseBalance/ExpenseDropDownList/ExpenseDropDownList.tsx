import React, { useEffect, useState } from "react";
import "./expenseDropDownList.css";
import { IExpenseSliderCategory } from "../../../../app/types/balance/IBalance";

interface IDropDownList {
    data: IExpenseSliderCategory[],
    value: string,
    setValue: (val: string, id: number)=>void,
    placeholder: string,
    idTitle: string,
    idContent: string,
    error?: boolean,
}

export function ExpenseDropDownList({data, idTitle, idContent, value,  error=false, setValue, placeholder}:IDropDownList) {
    const [searchSelector, setSearchSelector] = useState('')
    const [contentVisible, setContentVisible] = useState(false)
    const [contentList, setContentList] = useState(data)

    useEffect(()=>{
        function handleClick(e: MouseEvent) {
            if((e.target as HTMLElement).closest(`#${idTitle}`)) {
                setContentVisible(true)
            } else {
                if(!(e.target as HTMLElement).closest(`.drop-down-list-form__search-input`) && !(e.target as HTMLElement).closest(`.expense-drop-down-list__search-input`)) {
                    // if(document.querySelector(`#${idContent}`)) {
                    //     setTouched(true)
                    // }
                    setContentVisible(false)
                }
            }
        }
        window.addEventListener('click', handleClick)
        return ()=>window.removeEventListener('click', handleClick)
    }, [])

    const onChangeTitle = (newTitle: string, id: number) => {
        if(value!==newTitle) {
            setValue(newTitle, id)
        }
    }

    const changeSearchSelector = (event: React.FormEvent<HTMLInputElement>) => {
        setSearchSelector(event.currentTarget.value)
        if(event.currentTarget.value === '') {
            setContentList(data)
        }
    }

    function searchBrand() {
        let filter = searchSelector.toUpperCase()
        let newArr = contentList.filter(el=>{
            if(el.name.toUpperCase().indexOf(filter)!==-1) {
                return el
            }
        })
        setContentList(newArr)
    }

    return (
        <div className="expense-drop-down-list">
            <div id={idTitle} className={`expense-drop-down-list__container${(error)?'--error':''}`}>
                <div className="expense-drop-down-list__label">{placeholder}</div>
                <div className="expense-drop-down-list__title">{`${value?value:'Не выбрано'}`}</div>
            </div>
            
            {contentVisible &&
                <div id={idContent} className="expense-drop-down-list__content">
                    {data.length === 0 && 
                        <div className="expense-drop-down-list__list-empty">Список пуст...</div>
                    }
                    {data.length !== 0 && 
                        <input type="text" className="expense-drop-down-list__search-input" onKeyUp={searchBrand} value={searchSelector} onChange={changeSearchSelector}/>
                    }
                    {data.map(el=>{

                        return (
                            <div className="expense-drop-down-list__item" onClick={()=>onChangeTitle(el.name, el.id)} key={el.id}>{el.name}</div>
                        )
                        
                    })}
                </div>
            }
        </div>
    )
}