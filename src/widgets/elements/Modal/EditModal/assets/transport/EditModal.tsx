import { useState } from "react"
import "./editModal.css"
import { InputText } from "../../../../../../shared/ui/input/InputText/InputTextTest"
import { ITransportDTO } from "../../../../../../app/types/dto/assets/IAssetsLiabilitiesDTO"
// import { IAssetsTransport } from "../../../../../../app/types/actives/ActivesTypes.ts"
// import { ILiabilitiesTransport } from "../../../../../../app/types/liabilities/LiabilitiesType.ts"

interface IEditModal {
    onClose: ()=> void,
    // data: IAssetsTransport | ILiabilitiesTransport,
    onEdit: (obj: ITransportDTO)=>void
}

export function EditModal({onClose, onEdit}: IEditModal) { //data
    const [valueOwner, setValueOwner] = useState('')
    const [alertOwner, setAlertOwner] = useState('')
    const [valuePurpose, setValuePurpose] = useState('')
    const [alertPurpose, setAlertPurpose] = useState('')

    // const [individualPerson, setIndividualPerson] = useState('')//физическое лицо

    const clickEditBtn = ()=> {
        if(alertPurpose===''  && alertOwner==='' && valueOwner!=='') {
            const transportDTO:ITransportDTO = {
                id: 1, //data.id!
                owner: valueOwner,
                vin: '',
                use: valuePurpose,
                owner_type: false
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
                    {/* <InputTextVIN value={valueVIN} setValue={setValueVIN} setAlert={setAlertVIN}></InputTextVIN> */}
                </div>
                <div className="edit-modal__item">
                    <div className="edit-modal__label">Назначение</div>
                    <InputText attentionFlag={false} length={30} value={valuePurpose} setValue={setValuePurpose} setAlert={setAlertPurpose}></InputText>
                </div>
                <div className="edit-modal__item-container">
                    <div className="edit-modal__label">Тип собственности</div>
                    <div className="edit-modal__rb">
                        <input type="radio" id="rb1" checked={false} onChange={()=>{
                            // setIndividualPerson(false)
                        }}/>
                        <label htmlFor="rb1">физическое лицо</label>
                    </div>
                    <div className="edit-modal__rb">
                        <input type="radio" id="rb2" checked={false} onChange={()=>{
                            // setIndividualPerson(true)
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