import React, { useContext, useEffect, useState } from "react";
import { Alert } from "../../../../Alert/Alert";
import { AlertContext } from "../../../../../features/context/alert/AlertContext";
import { ModalContext } from "../../../../../features/context/modalProperty/ModalContext";
import "./editModal.css"

interface IEditModal {
    transportDto: ILiabilitiesTransportDTO,
    onEditTransportItem: (obj: ILiabilitiesTransportDTO)=>void
}

interface ILiabilitiesTransportDTO {
    id: number, 
    name: string,
    brand: string,
    owner: string,
    vin: string,
    use: string,
    owner_type: boolean
}

const data = [
    {id: 1, content:'Skoda'},   
]

const data2 = [
    {id: 1, content:'Rapid'},
    {id: 2, content:'Octavia'},
    {id: 3, content:'Superb'},
]

export function EditModal({transportDto, onEditTransportItem}: IEditModal) {
    const {alert, showAlert, hideAlert} = useContext(AlertContext)
    const [valueOwner, setValueOwner] = useState(transportDto.owner)
    const [valueVIN, setValueVIN] = useState(transportDto.vin)
    const [valuePurpose, setValuePurpose] = useState(transportDto.use)
    const {hide} = useContext(ModalContext)
    const [searchBrandSelector, setSearchBrandSelector] = useState('')
    const [searchModelSelector, setSearchModelSelector] = useState('')
    const [brandSelector, setBrandSelector] = useState(transportDto.brand)
    const [modelSelector, setModelSelector] = useState(transportDto.name)
    const [individualPerson, setIndividualPerson] = useState(transportDto.owner_type)
    const [newData] = useState({
        vin: transportDto.vin,
        // model: transportDto.name,
        // brand: transportDto.brand,
        owner: transportDto.owner,
        use: transportDto.use,
    }) //setNewData
    const [textAlertPurpose, setTextAlertPurpose] = useState('')
    const [textAlertVIN, setTextAlertVIN] = useState('')
    const [textAlertOwner, setTextAlertOwner] = useState('')

    useEffect(()=>{
        hideAlert()
    },[])

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
        setSearchBrandSelector(event.currentTarget.value)
    }

    const changeModelSelector = (event: React.FormEvent<HTMLInputElement>) => {
        setSearchModelSelector(event.currentTarget.value)
    }

    const changeOwner = (event: React.FormEvent<HTMLInputElement>) => {
        const maxLength = 100
        let length = event.currentTarget.value.length
        setValueOwner(event.currentTarget.value)
        if(length<maxLength) {
            setTextAlertOwner('')
            newData.owner = event.currentTarget.value
        }
        else {
            newData.owner = ''
            setTextAlertOwner(`допустимое количество символов превышено на ${length - maxLength}`)
        } 
    }

    const changeVIN = (event: React.FormEvent<HTMLInputElement>) => {
        const maxLength = 17
        let length = event.currentTarget.value.replace(/ /g,'').length
        setValueVIN(event.currentTarget.value.replace(/ /g,''))
        if(length===maxLength) {
            setTextAlertVIN('')
            newData.vin = event.currentTarget.value
        }
        else {
            newData.vin = ''
            if(length>=1 && length<17) {
                setTextAlertVIN(`осталось ввести симовов для заполнения ${maxLength - length}`)
            }
            if(length>maxLength) {
                setTextAlertVIN(`допустимое количество символов превышено на ${length - maxLength}`)
            }
            if(length===0) {
                setTextAlertVIN('')
            }
        } 
    }

    const changePurpose = (event: React.FormEvent<HTMLInputElement>) => {
        const maxLength = 35
        let length = event.currentTarget.value.length
        console.log(event.currentTarget.value)
        setValuePurpose(event.currentTarget.value)
        if(length<maxLength) {
            setTextAlertPurpose('')
            newData.use = event.currentTarget.value
        }
        else {
            newData.use = ''
            setTextAlertPurpose(`допустимое количество символов превышено на ${length - maxLength}`)
        } 
    }

    const setBrand = ()=> {
        (document.getElementById('accord_1') as HTMLInputElement).checked = false
    }

    const setModel = ()=> {
        (document.getElementById('accord_2') as HTMLInputElement).checked = false
    }

    const editTransport = ()=> {
        if(newData.owner !== '' && newData.use !== '' && newData.vin !== '') {
            let newDto: ILiabilitiesTransportDTO = {
                id: transportDto.id,
                brand: brandSelector,
                name: modelSelector,
                owner: valueOwner,
                owner_type: individualPerson,
                use: valuePurpose,
                vin: valueVIN
            }
            onEditTransportItem(newDto)
        }
        else {
            showAlert('Не все поля заполнены корректно! Пожалуйста, заполните их.', 'Error')
            console.log(alert.visible)
        }
    }

    return (
        <div className="transport-edit-modal">
            <div className="transport-edit-modal__title">
                <h1>Редактирование</h1>
                <button className="transport-edit-modal__close-btn" onClick={()=>{
                    hide()
                    hideAlert()
                }}>x</button>
            </div>
            <div className="transport-edit-modal__content">
                <div className="transport-edit-modal__item-container-auto">
                <div className="transport-edit-modal__item">
                    <div className="transport-edit-modal__label">Марка автомобиля</div>
                    <div className="drop-down-list">
                        <input className="drop-down-list-input" type="checkbox" name="accord" id='accord_1'></input>
                        <label className="drop-down-list__title" htmlFor='accord_1'>
                            <p>{brandSelector === '' ?  'Выберете марку транспорта' : brandSelector}</p> 
                        </label> 
                        <div className="drop-down-list__content">
                            <input type="text" id="inputSearchBrand" placeholder='Введите марку транспорта' onKeyUp={searchBrand} value={searchBrandSelector} onChange={changeBrandSelector}/> 
                            <ul id = 'listBrand'>
                                {data.map((el)=>{
                                    return (
                                        <li key={el.id} onClick={()=>{
                                            setBrandSelector(el.content)
                                            setBrand()
                                        }}><p>{el.content}</p></li>
                                    )
                                })}
                            </ul>
                        </div>           
                    </div>
                </div>
                <div className="transport-edit-modal__item">
                    <div className="transport-edit-modal__label">Модель автомобиля</div>
                    <div className="drop-down-list">
                        <input className="drop-down-list-input" type="checkbox" name="accord" id='accord_2'></input>
                        <label className="drop-down-list__title" htmlFor='accord_2'>
                            <p>{modelSelector === '' ?  'Выберете марку транспорта' : modelSelector}</p> 
                        </label> 
                        <div className="drop-down-list__content">
                            <input type="text" id="inputSearchModel" placeholder='Введите модель транспорта' onKeyUp={searchModel} value={searchModelSelector} onChange={changeModelSelector}/> 
                            <ul id = 'listModel'>
                                {data2.map((el)=>{
                                    return (
                                        <li key={el.id} onClick={()=>{
                                            setModelSelector(el.content)
                                            setModel()
                                        }}><p>{el.content}</p></li>
                                    )
                                })}
                            </ul>
                        </div>           
                    </div>
                </div>
                </div>
                <div className="transport-edit-modal__item">
                    <div className="transport-edit-modal__label">Владелец по ПТС</div>
                    <input type="text" value={valueOwner} onChange={changeOwner}/>
                    {textAlertOwner!=='' && <Alert text={textAlertOwner} type={'warning'}/>}
                </div>
                <div className="transport-edit-modal__item">
                    <div className="transport-edit-modal__label">VIN-номер</div>
                    <input type="text" value={valueVIN} onChange={changeVIN}/>
                    {textAlertVIN!=='' && <Alert text={textAlertVIN} type={'warning'}/>}
                </div>
                <div className="transport-edit-modal__item">
                    <div className="transport-edit-modal__label">Назначение</div>
                    <input type="text" value={valuePurpose} onChange={changePurpose}/>
                    {textAlertPurpose!=='' && <Alert text={textAlertPurpose} type={'warning'}/>}
                </div>
                <div className="transport-edit-modal__item">
                    <div className="transport-edit-modal__label">Тип собственника</div>
                    <div className="transport-edit-modal__checkbox-group">
                        <div className="transport-edit-modal__item-container">
                            <input type="radio" id="type1" checked={!individualPerson} onChange={()=>{
                            setIndividualPerson(false)}}/>
                            <label htmlFor="type1">юредическое лицо</label>
                        </div>
                        <div className="transport-edit-modal__item-container">
                            <input type="radio" id="type2" checked={individualPerson} onChange={()=>{
                            setIndividualPerson(true)}}/>
                            <label htmlFor="type2">физическое лицо</label>
                        </div>
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