import React, { useState } from "react"
import "./editModal.css"
import { InputText } from "../../../../../../shared/ui/input/InputText/InputTextTest"
import { ITransportDTO } from "../../../../../../app/types/dto/assets/IAssetsLiabilitiesDTO"
import { InputTextVIN } from "../../../../../../shared/ui/input/inputVIN/InputVIN"
import { IAssetsTransport } from "../../../../../../app/types/assets/IAssets"
import { ILiabilitiesTransport } from "../../../../../../app/types/liabilities/ILiabilities"

interface IEditModal {
    onClose: ()=> void,
    data: IAssetsTransport | ILiabilitiesTransport,
    onEdit: (obj: ITransportDTO)=>void
}

export function EditModal({onClose, data, onEdit}: IEditModal) {
    const [valueOwner, setValueOwner] = useState(data.owner)
    const [alertOwner, setAlertOwner] = useState('')
    const [valueVIN, setValueVIN] = useState(data.vin)
    const [alertVIN, setAlertVIN] = useState('')
    const [valuePurpose, setValuePurpose] = useState(data.use)
    const [alertPurpose, setAlertPurpose] = useState('')

    const [individualPerson, setIndividualPerson] = useState(data.owner_type)//физическое лицо

    const clickEditBtn = ()=> {
        if(alertPurpose==='' && alertVIN==='' && alertOwner==='' && valueOwner!=='' && valueVIN!=='') {
            const transportDTO:ITransportDTO = {
                id: data.id!,
                owner: valueOwner,
                vin: valueVIN,
                use: valuePurpose,
                owner_type: individualPerson
            }
            onEdit(transportDTO)
            onClose()
        }
    }
    
    return (
        <div className="edit-modal" id="transport-edit-modal">
            <div className="edit-modal__header">
                <h1 className="edit-modal__title">Редактирование</h1>
                <button className="edit-modal__close-btn" onClick={onClose}>x</button>
            </div>
            <div className="edit-modal__content">
                <div className="edit-modal__item">
                    <div className="edit-modal__label">Владелец по ПТС</div>
                    <InputText attentionFlag={false} length={30} value={valueOwner} setValue={setValueOwner} setAlert={setAlertOwner}></InputText>
                </div>
                <div className="edit-modal__item">
                    <div className="edit-modal__label">VIN-номер</div>
                    <InputTextVIN value={valueVIN} setValue={setValueVIN} setAlert={setAlertVIN}></InputTextVIN>
                </div>
                <div className="edit-modal__item">
                    <div className="edit-modal__label">Назначение</div>
                    <InputText attentionFlag={false} length={30} value={valuePurpose} setValue={setValuePurpose} setAlert={setAlertPurpose}></InputText>
                </div>
                <div className="edit-modal__item-container">
                    <div className="edit-modal__label">Тип собственности</div>
                    <div className="edit-modal__rb">
                        <input type="radio" id="rb1" checked={!individualPerson} onChange={()=>{
                            setIndividualPerson(false)
                        }}/>
                        <label htmlFor="rb1">физическое лицо</label>
                    </div>
                    <div className="edit-modal__rb">
                        <input type="radio" id="rb2" checked={individualPerson} onChange={()=>{
                            setIndividualPerson(true)
                        }}/>
                        <label htmlFor="rb2">юредическое лицо</label>
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