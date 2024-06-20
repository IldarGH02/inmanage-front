import React, { useContext, useEffect, useState } from "react";
import { Alert } from "../../../../Alert/Alert";
import { AlertContext } from "../../../../../features/context/alert/AlertContext";
import { ModalContext } from "../../../../../features/context/modalProperty/ModalContext";
import "./editModal.css"

interface IEditPropertyDTO {
    id: number,
    name: string,
    address: string, 
    bought_price: number
}

interface IEditModal {
    propertyDto: IEditPropertyDTO,
    onEditPropertyItem: (obj: IEditPropertyDTO)=>void
}

export function EditModal({propertyDto, onEditPropertyItem}: IEditModal) {
    const [valueName, setValueName] = useState(propertyDto.name)
    const [valuePrice, setValuePrice] = useState(String(propertyDto.bought_price))
    const [valueAdress, setValueAdress] = useState(propertyDto.address)
    const [textAlertName, setTextAlertName] = useState('')
    const [textAlertPrice, setTextAlertPrice] = useState('')
    const {hide} = useContext(ModalContext)
    const {alert, showAlert, hideAlert} = useContext(AlertContext)
    const [newData] = useState({
        name: propertyDto.name,
        address: propertyDto.address,
        bought_price: propertyDto.bought_price
    }) //setNewData

    useEffect(()=>{
        hideAlert()
    },[])

    ////////////
    function discharge(str:string): string {
        return str.replace(/[^0-9.]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }
    ////////////

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

    const changePrice = (event: React.FormEvent<HTMLInputElement>) => {
        const maxLength = 10
        let length = event.currentTarget.value.replace(/ /g,'').length
        setValuePrice(event.currentTarget.value)
        if(length<=maxLength) {
            setTextAlertPrice('')
            newData.bought_price = Number(event.currentTarget.value.replace(/ /g,''))
        }
        else {
            newData.bought_price = 0
            setTextAlertPrice(`допустимое количество символов превышено на ${length - maxLength}`)
        }
    }

    const editProperty = ()=> {
        if(newData.name !== '' && textAlertName==='' && newData.address !== '' && textAlertPrice==='') {
            let newDto: IEditPropertyDTO = {
                id: propertyDto.id,
                name: valueName,
                address: valueAdress,
                bought_price: Number(valuePrice.replace(/ /g,''))
            }
            onEditPropertyItem(newDto)
        }
        else {
            showAlert('Не все поля заполнены корректно! Пожалуйста, заполните их.', 'Error')
        }
    }

    return (
        <div className="edit-modal">
            <div className="edit-modal__title">
                <h1>Редактирование</h1>
                <button className="edit-modal__close-btn" onClick={()=>hide()}>x</button>
            </div>
            <div className="edit-modal__content">
                <div className="edit-modal__item">
                    <div className="edit-modal__label">Название недвижимости</div>
                    <input type="text" value={valueName} onChange={changeName}/>
                    {textAlertName!=='' && <Alert text={textAlertName} type={'warning'}/>}
                </div>
                <div className="edit-modal__item">
                    <div className="edit-modal__label">Адрес недвижимости</div>
                    <input type="text" value={valueAdress} onChange={changeAdress}/>
                </div>
                <div className="edit-modal__item">
                    <div className="edit-modal__label">Цена покупки пассива</div>
                    <input type="text" value={valuePrice} onChange={changePrice} onKeyUp={()=>setValuePrice(discharge(valuePrice))}/>
                    {textAlertPrice!=='' && <Alert text={textAlertName} type={'warning'}/>}
                </div>
                {alert.visible && alert.type==='Error' && <Alert text={alert.text} type={alert.type}/>}
            </div>
            <div className="edit-modal__footer">
                <button className="edit-modal__add-btn" onClick={editProperty}>Редактировать</button>
                <button className="edit-modal__cancel-btn" onClick={()=>{
                    hide()
                    hideAlert()
                }}>Отменить</button>
            </div>
        </div>
    )
}