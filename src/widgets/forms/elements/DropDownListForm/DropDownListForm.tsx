import React from "react";
import { useEffect, useState } from "react";
import "./dropDownListForm.css";
import { IDropDownList } from "../../../../app/types/elements/IDropDownList";

interface IDropDownProps {
    checkError?: boolean,
    idTitle: string,
    idContent: string,
    data: IDropDownList[],
    title: string,
    searchInput?: boolean,
    placeholder: string,
    onChange: (title: string) => void
}

export function DropDownListForm({searchInput=false, idTitle, idContent, checkError, placeholder, data, title, onChange}: IDropDownProps) {
    const [contentVisible, setContentVisible] = useState(false)
    const [error, setError] = useState(false)
    // const [touched, setTouched] = useState(false)
    const [searchSelector, setSearchSelector] = useState('')
    const [contentList, setContentList] = useState(data)

    useEffect(()=>{
        setContentList(data)
    }, [data])

    useEffect(()=>{
        
        if(checkError) {
            console.log(checkError)
            if(title==='') {
                setError(true)
            } else {
                setError(false)
            }
        }
    }, [title, checkError])

    useEffect(()=>{
        function handleClick(e: MouseEvent) {
            if((e.target as HTMLElement).closest(`#${idTitle}`)) {
                setContentVisible(true)
            } else {
                if(!(e.target as HTMLElement).closest(`.drop-down-list-form__search-input`) && !(e.target as HTMLElement).closest(`.drop-down-list-form__search-input`)) {
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

    const onChangeTitle = (newTitle: string) => {
        if(title!==newTitle) {
            onChange(newTitle)
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
            if(el.content.toUpperCase().indexOf(filter)!==-1) {
                return el
            }
        })
        setContentList(newArr)
    }
    
    return (
        <div className="drop-down-list-form">
            <div id={idTitle} className={`drop-down-list-form__container${(error)?'--error':''}`}>
                <div className="drop-down-list-form__label">{placeholder}</div>
                <div className="drop-down-list-form__title">{`${title?title:'Не выбрано'}`}</div>
            </div>
            
            {contentVisible &&
                <div id={idContent} className="drop-down-list-form__content">
                    {data.length !== 0 && searchInput && 
                        <input type="text" className="drop-down-list-form__search-input" onKeyUp={searchBrand} value={searchSelector} onChange={changeSearchSelector}/>
                    }
                    <div className="drop-down-list-form__content-list">
                        {contentList.length === 0 && 
                            <div className="drop-down-list-form__list-empty">Список пуст...</div>
                        }
                        {contentList.map(el=>{
                            if(el.content!==title) {
                                return (
                                    <div className="drop-down-list-form__item" onClick={()=>onChangeTitle(el.content)} key={el.id}>{el.content}</div>
                                )
                            }
                        })}
                    </div>
                </div>
            }
        </div>   
    )
}
