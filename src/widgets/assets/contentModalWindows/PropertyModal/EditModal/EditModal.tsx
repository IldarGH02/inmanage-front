import React, { useContext, useEffect, useState } from "react";
import { Alert } from "../../../../Alert/Alert";
import { AlertContext } from "../../../../../features/context/alert/AlertContext";
import { ModalContext } from "../../../../../features/context/modalProperty/ModalContext";
import "./editModal.css"

interface IEditModal {
    name: string,
    address: string, 
    onEditPropertyItem: (name: string, address: string) => void
}

export function EditModal({name, address, onEditPropertyItem}: IEditModal) {
    const {alert, showAlert, hideAlert} = useContext(AlertContext)
    const [valueName, setValueName] = useState(name)
    const [valueAddress, setValueAddress] = useState(address)
    const {hide} = useContext(ModalContext)
    const [textAlertName, setTextAlertName] = useState('')
    const [newData] = useState({name: name, address: address}) //setNewData

    useEffect(()=>{
        hideAlert()
    },[])

    const changeName = (event: React.FormEvent<HTMLInputElement>) => {
        setValueName(event.currentTarget.value)
        const maxLength = 30
        const length = event.currentTarget.value.length
        setValueName(event.currentTarget.value)
        if(length<=maxLength) {
            newData.name = event.currentTarget.value
            setTextAlertName('')
        }
        else {
            newData.name = ''
            setTextAlertName(`допустимое количество символов превышено на ${length - maxLength}`)
        }
    }

    const changeAddress = (event: React.FormEvent<HTMLInputElement>) => {
        setValueAddress(event.currentTarget.value)
    }

    return (
        <>
        <div className="edit-modal">
            <div className="edit-modal__title">
                <h1>Редактирование</h1>
                <button className="edit-modal__close-btn" onClick={()=>{
                    hide()
                    hideAlert()
                }}>x</button>
            </div>
            <div className="edit-modal__content">
                <div className="edit-modal__container-items">
                    <div className="edit-modal__item">
                        <div className="edit-modal__label">Название недвижимости</div>
                        <input type="text" value={valueName} onChange={changeName}/>
                        {textAlertName!=='' && <Alert text={textAlertName} type={'warning'}/>}
                    </div>
                    <div className="edit-modal__item">
                        <div className="edit-modal__label">Адрес недвижимости</div>
                        <input type="text" value={valueAddress} onChange={changeAddress}/>
                    </div>
                </div>
                {alert.visible && alert.type==='Error' && <Alert text={alert.text} type={alert.type}/>}
            </div>
            
            <div className="edit-modal__footer">
                <button className="edit-modal__add-btn" onClick={()=>{
                    if(newData.name !== '') {
                        hideAlert()
                        onEditPropertyItem(valueName, valueAddress)
                    }
                    else {
                        showAlert('Не все поля заполнены корректно! Пожалуйста, заполните их.', 'Error')
                    }
                }}>Редактировать</button>
                <button className="edit-modal__cancel-btn" onClick={()=>{
                    hide()
                    hideAlert()
                }}>Отменить</button>
            </div>
        </div>
        
        </>
    )
}