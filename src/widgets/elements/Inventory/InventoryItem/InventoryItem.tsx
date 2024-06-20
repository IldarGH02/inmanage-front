import React from "react"
import "./inventoryItem.css"
import { Daw } from "../../Daw/daw"
import { IInventoryProperty } from "../../../../app/types/assets/property/IProperty"
import { IInventoryBusiness } from "../../../../app/types/assets/business/IBusiness"
import { CartBtn } from "../../buttons/CartBtn/CartBtn"

interface IInventoryItem {
    data: IInventoryProperty | IInventoryBusiness,
    onChangeItem: (id: number)=>void,
    onRemoveItem: (id: number)=>void
}

export function InventoryItem({data, onChangeItem, onRemoveItem}: IInventoryItem) {
    // const [dawActive, setDawActive] = useState(data.done)

    const changeDaw = ()=> {
        // setDawActive(!dawActive)
        onChangeItem(data.id!)
    }

    const removeItem = ()=> {
        onRemoveItem(data.id!)
    }

    return (
        <div className="inventory-item">
            <div className="inventory-item__info">
                <div className={`inventory-item__name${data.done?'--active':''}`}>{data.name}</div>
                <div className={`inventory-item__sum${data.id?'--active':''}`}>{data.price.toLocaleString()} ₽</div>
            </div>
            <div className="inventory-item__btns">
                <div className="inventory-item__daw">
                    <Daw onChangeDaw={changeDaw} dawActive={data.done}/>
                </div>
                <div className="inventory-item__remove-btn" onClick={removeItem}><CartBtn/></div>
            </div>
        </div>
    )
}