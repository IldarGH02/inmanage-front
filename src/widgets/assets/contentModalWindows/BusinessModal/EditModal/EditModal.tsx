import React, { useContext, useEffect, useState } from "react";
import { Alert } from "../../../../Alert/Alert";
import { AlertContext } from "../../../../../features/context/alert/AlertContext";
import { ModalContext } from "../../../../../features/context/modalProperty/ModalContext";
import "./editModal.css"

interface IAssetsBusinessDTO {
    id: number, 
    name: string,
    address: string,
    direction: string,
    type: boolean,
}

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

interface IEditModal {
    businessDto: IAssetsBusinessDTO,
    onEditBusinessItem: (obj: IAssetsBusinessDTO)=>void
}

export function EditModal({businessDto, onEditBusinessItem}: IEditModal) {
    const {alert, showAlert, hideAlert} = useContext(AlertContext)
    const [valueName, setValueName] = useState(businessDto.name)
    const [valueAdress, setValueAdress] = useState(businessDto.address)
    const [searchTypeSelector, setSearchTypeSelector] = useState('')
    const [typeSelector, setTypeSelector] = useState(businessDto.direction)
    const [onlineCommerce, setOnlineCommerce] = useState(businessDto.type)
    const [textAlertName, setTextAlertName] = useState('')
    const {hide} = useContext(ModalContext)
    const [newData] = useState({
        name: businessDto.name,
        address: businessDto.address,
    }) //setNewData

    useEffect(()=>{
        hideAlert()
    },[])

    const changeName = (event: React.FormEvent<HTMLInputElement>) => {
        const maxLength = 35
        let length = event.currentTarget.value.length
        setValueName(event.currentTarget.value)
        if(length<maxLength) {
            setTextAlertName('')
            newData.name = event.currentTarget.value
        }
        else {
            newData.name = ''
            setTextAlertName(`допустимое количество символов превышено на ${length - maxLength}`)
        }
    }

    const changeAdress = (event: React.FormEvent<HTMLInputElement>) => {
        setValueAdress(event.currentTarget.value)
    }

    const changeTypeSelector = (event: React.FormEvent<HTMLInputElement>) => {
        setSearchTypeSelector(event.currentTarget.value)
    }

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

    const setType = ()=> {
        (document.getElementById('accord_type') as HTMLInputElement).checked = false
    }

    const editTransport = ()=> {
        if(newData.name !== '' && textAlertName==='' && newData.address !== '') {
            let newDto: IAssetsBusinessDTO = {
                id: businessDto.id,
                name: valueName,
                address: valueAdress,
                type: onlineCommerce,
                direction: typeSelector
            }
            onEditBusinessItem(newDto)
        }
        else {
            showAlert('Не все поля заполнены корректно! Пожалуйста, заполните их.', 'Error')
        }
    }

    return (
        <div className="edit-modal">
            <div className="edit-modal__title">
                <h1>Редактирование</h1>
                <button className="edit-modal__close-btn" onClick={()=>{
                    hide()
                    hideAlert()
                }}>x</button>
            </div>
            <div className="edit-modal__content">
                <div className="edit-modal__item">
                    <div className="edit-modal__label">Название бизнеса</div>
                    <input type="text" value={valueName} onChange={changeName}/>
                    {textAlertName!=='' && <Alert text={textAlertName} type={'warning'}/>}
                </div>
                <div className="edit-modal__item">
                    <div className="edit-modal__label">Адрес бизнеса</div>
                    <input type="text" value={valueAdress} onChange={changeAdress}/>
                </div>
                
                <div className="edit-modal__item" style={{position:'relative', height: '110px'}}>
                    <div className="edit-modal__label" style={{fontSize: '25px', width: '100%', marginBottom: '25px'}}>Направление бизнеса</div>
                    <div className="drop-down-list" style={{marginBottom: '55px'}}>
                        <input className="drop-down-list-input" type="checkbox" name="accord" id='accord_type'></input>
                        <label className="drop-down-list__title" htmlFor='accord_type'>
                            <p>{typeSelector === '' ?  'Выберете направление бизнеса' : typeSelector}</p> 
                        </label> 
                        <div className="drop-down-list__content">
                            <input type="text" id="inputSearchTypeBusiness" placeholder='Введите направление бизнеса' onKeyUp={searchType} value={searchTypeSelector} onChange={changeTypeSelector}/> 
                            <ul id = 'listTypeBusiness'>
                                {arr.map((el)=>{
                                    return (
                                        <li key={el.id} onClick={()=>{
                                            setTypeSelector(el.content)
                                            setType()
                                        }}><p>{el.content}</p></li>
                                    )
                                })}
                            </ul>
                        </div>           
                    </div>       
                </div>
                <div className="edit-modal__item">
                <div className="edit-modal__label" style={{fontSize: '25px', width: '100%', marginBottom: '25px'}}>Тип коммерции</div>
                    <div className="edit-modal__item-container">
                        <input type="radio" id="type1" checked={!onlineCommerce} onChange={()=>{
                            setOnlineCommerce(false)
                            }}/>
                        <label htmlFor="type1">онлайн</label>
                    </div>
                    <div className="edit-modal__item-container">
                        <input type="radio" id="type2" checked={onlineCommerce} onChange={()=>{
                            setOnlineCommerce(true)
                            }}/>
                        <label htmlFor="type2">офлайн</label>
                    </div>
                </div>
                {alert.visible && alert.type==='Error' && <Alert text={alert.text} type={alert.type}/>}
            </div>
            <div className="edit-modal__footer">
                <button className="edit-modal__add-btn" onClick={editTransport}>Редактировать</button>
                <button className="edit-modal__cancel-btn" onClick={()=>{
                    hide()
                    hideAlert()
                }}>Отменить</button>
            </div>
        </div>
    )
}