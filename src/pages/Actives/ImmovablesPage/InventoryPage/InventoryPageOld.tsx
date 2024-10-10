import { useEffect, useState } from "react"
import "./inventoryPageOld.css"
// import { Inventory } from "../../../../widgets/elements/Inventory/Inventory"
import { Link, useParams } from "react-router-dom"
import { BackBtn } from "../../../../widgets/elements/buttons/BackBtn/BackBtn"
import { Modal } from "../../../../widgets/elements/Modal/Modal"
import { InventoryModal } from "../../../../widgets/elements/Modal/InventoryModal/InventoryModal"
// import { useProperty } from "../../../../features/hooks/assets/property/propertyHooks" 
// import { IInventoryDto } from "../../../../app/types/dto/assets/IAssetsLiabilitiesDTO"

export function InventoryPage() {
    const {id} = useParams()
    // const {inventoryArr, editInventory, getInventory, removeInventory, addInventory, property, getProperty} = useProperty()
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(()=>{
        // getProperty(Number(id))
        // getInventory(Number(id))
    },[])

    // const openModal = ()=> {
    //     setModalVisible(true)
    // }

    // const removeItem = (id:number)=> {
    //     // removeInventory(id)
    // }

    // const editItem = (id:number)=> {
    //     // editInventory(id)
    // }

    // const addItem = (obj:IInventoryDto)=> {
    //     // addInventory(obj, Number(id))
    // }

    return (
        <>
        {modalVisible && 
        <Modal onClose={()=>setModalVisible(false)}>
            <InventoryModal onAddInventory={() => {}} onClose={()=>setModalVisible(false)}/>
        </Modal>
        }
        <div id="assets-wrapper" className="wrapper">
            <div className="container">
                <div className="inventory-page">
                    <Link className="property-item-page__back-btn" to={`/assets/property/${id}`}>
                        <BackBtn />
                    </Link>
                    <div className="inventory-page__title">Инвентаризация</div>
                    <div className="inventory-page__content">
                        {/* <div className="inventory-page__name">{property.name}</div>
                        <div className="inventory-page__address">{property.address}</div>
                        <div className="inventory-page__inventory">
                            <Inventory onEditItem={editItem} onRemoveItem={removeItem} data={inventoryArr} onOpenModal={openModal} />
                        </div> */}

                    </div>
                </div>
            </div>
        </div>
        </>
    )
}