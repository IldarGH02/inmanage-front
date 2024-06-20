import React, { useState } from "react"
import "./editModal.css"
import { InputText } from "../../../../../../shared/ui/input/InputText/InputTextTest"
import { ILoansDTO } from "../../../../../../app/types/dto/assets/IAssetsLiabilitiesDTO"
import { ILiabilities } from "../../../../../../app/types/liabilities/ILiabilities"

interface IEditModal {
    onClose: ()=> void,
    data: ILiabilities,
    onEdit: (obj: ILoansDTO)=>void
}

export function EditModal({onClose, data, onEdit}: IEditModal) {
    const [valueName, setValueName] = useState('name') //data.name
    const [alertName, setAlertName] = useState('')

    const clickEditBtn = ()=> {
        if(alertName==='' && valueName!=='') {
            const loanDTO:ILoansDTO = {
                id: data.id!,
                name: valueName,
            }
            onEdit(loanDTO)
            onClose()
        }
    }
    
    return (
        <div className="edit-modal">
            <div className="edit-modal__header">
                <h1 className="edit-modal__title">Редактирование</h1>
                <button className="edit-modal__close-btn" onClick={onClose}>x</button>
            </div>
            <div className="edit-modal__content">
                <div className="edit-modal__item">
                    <div className="edit-modal__label">Название</div>
                    <InputText attentionFlag={false} length={30} value={valueName} setValue={setValueName} setAlert={setAlertName}></InputText>
                </div>
                {/* <div className="edit-modal__item">
                    <div className="edit-modal__label">Адрес</div>
                    <InputText attentionFlag={false} lenght={60} value={valueAddress} setValue={setValueAddress} setAlert={setAlertAddress}></InputText>
                </div>
                <div className="edit-modal__item">
                    <div className="edit-modal__label">Владелец</div>
                    <InputText attentionFlag={false} lenght={30} value={valueOwner} setValue={setValueOwner} setAlert={setAlertOwner}></InputText>
                </div> */}
            </div>
            <div className="edit-modal__footer">
                <button className="blue-btn edit-modal__cancel-btn" onClick={onClose}>Отменить</button>
                <button className="blue-btn edit-modal__edit-btn" onClick={clickEditBtn}>Редактировать</button>
            </div>
        </div>
    )
}