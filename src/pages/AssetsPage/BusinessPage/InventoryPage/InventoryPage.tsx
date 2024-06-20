import { useEffect, useState } from "react"
import { Inventory } from "../../../../widgets/elements/Inventory/Inventory" 
import { Link, useParams } from "react-router-dom"
import { BackBtn } from "../../../../widgets/elements/buttons/BackBtn/BackBtn"
import { Modal } from "../../../../widgets/elements/Modal/Modal"
import { InventoryModal } from "../../../../widgets/elements/Modal/InventoryModal/InventoryModal"
import { useBusiness } from "../../../../features/hooks/assets/business/businessHooks" 
import { IInventoryDto } from "../../../../app/types/dto/assets/IAssetsLiabilitiesDTO"

import "./inventoryPage.css"

export function InventoryPage() {
    const {id} = useParams()
    const {inventoryArr, editInventory, getInventory, removeInventory, addInventory, business, getBusiness} = useBusiness()
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(()=>{
        getBusiness(Number(id))
        getInventory(Number(id))
    },[])

    const openModal = ()=> {
        setModalVisible(true)
    }

    const removeItem = (id:number)=> {
        removeInventory(id)
    }

    const editItem = (id:number)=> {
        editInventory(id)
    }
    
    const addItem = (obj:IInventoryDto)=> {
        addInventory(obj, Number(id))
    }

    return (
        <>
        {modalVisible && 
        <Modal onClose={()=>setModalVisible(false)}>
            <InventoryModal onAddInventory={addItem} onClose={()=>setModalVisible(false)}/>
        </Modal>
        }
        <div id="assets-wrapper" className="wrapper">
            <div className="container">
                <div className="inventory-page">
                    <Link className="property-item-page__back-btn" to={`/assets/business/${id}`}>
                        <BackBtn />
                    </Link>
                    <div className="inventory-page__title">Инвентаризация</div>
                    <div className="inventory-page__content">
                        <div className="inventory-page__name">{business.name}</div>
                        <div className="inventory-page__address">{business.address}</div>
                        <div className="inventory-page__inventory">
                            <Inventory onEditItem={editItem} onRemoveItem={removeItem} data={inventoryArr} onOpenModal={openModal}/>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        </>
    )
}