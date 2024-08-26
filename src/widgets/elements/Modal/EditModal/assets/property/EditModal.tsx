import { useState } from "react"
import "./editModal.css"
import { InputText } from "../../../../../../shared/ui/input/InputText/InputTextTest"
import { IPropertyDTO } from "../../../../../../app/types/dto/assets/IAssetsLiabilitiesDTO"
// import { IAssetsProperty } from "../../../../../../app/types/actives/ActivesTypes.ts"
// import { ILiabilitiesProperty } from "../../../../../../app/types/liabilities/LiabilitiesType.ts"

interface IEditModal {
    onClose: ()=> void,
    // data: IAssetsProperty | ILiabilitiesProperty,
    onEdit: (obj: IPropertyDTO)=>void
}

export function EditModal({onClose, onEdit}: IEditModal) { //data
    const [valueOwner, setValueOwner] = useState('')
    const [alertOwner, setAlertOwner] = useState('')
    const [valueName, setValueName] = useState('')
    const [alertName, setAlertName] = useState('')
    const [valueAddress, setValueAddress] = useState('')
    const [alertAddress, setAlertAddress] = useState('')

    const clickEditBtn = ()=> {
        if(alertName==='' && alertAddress==='' && alertOwner==='' && valueName!=='' && valueAddress!=='') {
            const propertyDTO:IPropertyDTO = {
                id: 10, //data.id!
                owner: valueOwner,
                name: valueName,
                address: valueAddress
            }
            onEdit(propertyDTO)
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
                <div className="edit-modal__item">
                    <div className="edit-modal__label">Адрес</div>
                    <InputText attentionFlag={false} length={60} value={valueAddress} setValue={setValueAddress} setAlert={setAlertAddress}></InputText>
                </div>
                <div className="edit-modal__item">
                    <div className="edit-modal__label">Владелец</div>
                    <InputText attentionFlag={false} length={30} value={valueOwner} setValue={setValueOwner} setAlert={setAlertOwner}></InputText>
                </div>
            </div>
            <div className="edit-modal__footer">
                <button className="blue-btn edit-modal__cancel-btn" onClick={onClose}>Отменить</button>
                <button className="blue-btn edit-modal__edit-btn" onClick={clickEditBtn}>Редактировать</button>
            </div>
        </div>
    )
}