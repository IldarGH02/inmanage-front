import "./inventory.css"
import { IInventoryProperty } from "../../../app/types/actives/realty/RealtyTypes.ts"
import { InventoryItem } from "./InventoryItem/InventoryItem"
// import { IInventoryBusiness } from "../../../app/types/actives/business/BusinessTypes.ts"

interface IInventory {
    onOpenModal: ()=> void,
    data: IInventoryProperty[], 
    onEditItem: (id: number)=>void,
    onRemoveItem: (id: number)=>void
}

export function Inventory({onOpenModal, data, onEditItem, onRemoveItem}: IInventory) {
    // const [dawActive, setDawActive] = useState(true)

    const changeItem = (id: number)=> {
        onEditItem(id)
    }

    const removeItem = (id: number)=> {
        onRemoveItem(id)
    }

    return (
        <div className="inventory">
            <div className="inventory__list">
                {data.length === 0 && 
                    <div className="inventory-list-empty">
                        Список пуст
                    </div>
                }
                {data.map(el=>{
                    return (
                        <InventoryItem key={el.id} data={el} onRemoveItem={removeItem} onChangeItem={changeItem}/>
                    )
                })}
                
            </div>
            <div className="inventory__actions">
                <div className="inventory__add-btn" onClick={onOpenModal}>+</div>
            </div>
        </div>
    )
}