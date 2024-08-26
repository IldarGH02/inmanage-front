import { useState } from "react"
import "./inventoryModal.css"
import { InputText } from "../../../../shared/ui/input/InputText/InputTextTest"
import { InputSum } from "../../../../shared/ui/input/InputSum/InputSum" 
import { IInventoryDto } from "../../../../app/types/dto/assets/IAssetsLiabilitiesDTO"

interface IInventoryModal {
    onClose: ()=>void,
    onAddInventory: (obj: IInventoryDto)=>void
}

export function InventoryModal({onAddInventory, onClose}: IInventoryModal) {
    const [valueName, setValueName] = useState('')
    const [textAlertName, setTextAlertName] = useState('')
    const [valueSum, setValueSum] = useState('')
    const [textAlertSum, setTextAlertSum] = useState('')

    const addBtnClick = ()=> {
        if(valueName!=='' && textAlertName==='' && valueSum!='0' && textAlertSum==='') {
            const objDTO: IInventoryDto = {
                name: valueName,
                price: Number(valueSum.replace(/ /g,'')),
                done: false
            }
            onAddInventory(objDTO)
            onClose()
        }
        if(valueSum==='0') {
            setTextAlertSum('Сумма должна быть больше нуля')
        }
    }

    return (
        <div className="inventory-modal">
            <div className="inventory-modal__header">
                <div className="inventory-modal__title">Добавление</div>
                <button className="inventory-modal__close-btn" onClick={onClose}>x</button>
            </div>
            <div className="inventory-modal__content">
                <div className="inventory-modal__content-item">
                    <div className="inventory-modal__content-item-name">Название</div>
                    <InputText length={50} value={valueName} setValue={setValueName} placeHolder="Введите название" setAlert={setTextAlertName} attentionFlag={true}></InputText>
                </div>
                <div className="inventory-modal__content-item">
                    <div className="inventory-modal__content-item-name">Сумма</div>
                    <InputSum length={10} value={valueSum} setValue={setValueSum}></InputSum>
                </div>
                
            </div>
            <div className="inventory-modal__footer">
                <button className="blue-btn inventory-modal__cancel-btn" onClick={onClose}>Отмена</button>
                <button className="blue-btn inventory-modal__add-btn" onClick={addBtnClick}>Добавить</button>
            </div>
        </div>
    )
}