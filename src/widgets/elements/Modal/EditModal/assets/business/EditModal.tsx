import React, { useState } from "react"
import "./editModal.css"
import { InputText } from "../../../../../../shared/ui/input/InputText/InputTextTest"
import { IBusinessDTO } from "../../../../../../app/types/dto/assets/IAssetsLiabilitiesDTO"
import { IAssetsBusiness } from "../../../../../../app/types/assets/IAssets"

interface IEditModal {
    onClose: ()=> void,
    data: IAssetsBusiness,
    onEdit: (obj: IBusinessDTO)=>void
}

export function EditModal({onClose, data, onEdit}: IEditModal) {
    const [valueName, setValueName] = useState(data.name)
    const [alertName, setAlertName] = useState('')
    const [valueAddress, setValueAddress] = useState(data.address)
    const [alertAddress, setAlertAddress] = useState('')
    const [alertDirection, setAlertDirection] = useState('')
    const [valueDirection, setValueDirection] = useState(data.direction)

    const [onlineCommerce] = useState(data.type) // setOnlineCommerce

    const clickEditBtn = ()=> {
        if(alertName==='' && alertAddress==='' && alertDirection==='' && valueDirection!=='' && valueName!=='' && valueAddress!=='') {
            const businessDTO:IBusinessDTO | any = {
                id: data.id!,
                direction: valueDirection,
                name: valueName,
                address: valueAddress,
                type: onlineCommerce
            }
            onEdit(businessDTO)
            onClose()
        }
    }
    
    return (
        <div className="edit-modal" id="business-edit-modal">
            <div className="edit-modal__header">
                <h1 className="edit-modal__title">Редактирование</h1>
                <button className="edit-modal__close-btn" onClick={onClose}>x</button>
            </div>
            <div className="edit-modal__content">
                <div className="edit-modal__item">
                    <div className="edit-modal__label">Название</div>
                    <InputText attentionFlag={false} length={30} value={valueName} setValue={setValueName} setAlert={setAlertName}></InputText>
                </div>
                <div className="edit-modal__item">
                    <div className="edit-modal__label">Адрес</div>
                    <InputText attentionFlag={false} length={30} value={valueAddress} setValue={setValueAddress} setAlert={setAlertAddress}></InputText>
                </div>
                <div className="edit-modal__item">
                    <div className="edit-modal__label">Направление</div>
                    <InputText attentionFlag={false} length={30} value={valueDirection} setValue={setValueDirection} setAlert={setAlertDirection}></InputText>
                </div>
                <div className="edit-modal__item-container">
                    <div className="edit-modal__label">Тип коммерции</div>
                    <div className="edit-modal__rb">
                        <input type="radio" id="rb1" checked={!onlineCommerce} onChange={()=>{
                            // setOnlineCommerce(false)
                        }}/>
                        <label htmlFor="rb1">оффлайн</label>
                    </div>
                    <div className="edit-modal__rb">
                        <input type="radio" id="rb2" onChange={()=>{
                            // setOnlineCommerce(true)
                        }}/>
                        <label htmlFor="rb2">онлайн</label>
                    </div>
                </div>
            </div>
            <div className="edit-modal__footer">
                <button className="blue-btn edit-modal__cancel-btn" onClick={onClose}>Отменить</button>
                <button className="blue-btn edit-modal__edit-btn" onClick={clickEditBtn}>Редактировать</button>
            </div>
        </div>
    )
}
