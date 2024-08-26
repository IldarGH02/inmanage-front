// import { useEffect, useState } from "react"
// import { Inventory } from "../../../../widgets/elements/Inventory/Inventory" 
import { Link, useParams } from "react-router-dom"
import { BackBtn } from "../../../../widgets/elements/buttons/BackBtn/BackBtn"
// import { Modal } from "../../../../widgets/elements/Modal/Modal"
// import { InventoryModal } from "../../../../widgets/elements/Modal/InventoryModal/InventoryModal"
// import { IInventoryDto } from "../../../../app/types/dto/assets/IAssetsLiabilitiesDTO"

import "./inventoryPage.css"

export function InventoryPage() {
    const {id} = useParams()
    // const [modalVisible, setModalVisible] = useState(false)

    return (
        <>
        {/* {modalVisible && 
        <Modal onClose={()=>setModalVisible(false)}>
            <InventoryModal onAddInventory={addItem} onClose={()=>setModalVisible(false)}/>
        </Modal>
        } */}
        <div id="assets-wrapper" className="wrapper">
            <div className="container">
                <div className="inventory-page">
                    <Link className="property-item-page__back-btn" to={`/assets/business/${id}`}>
                        <BackBtn />
                    </Link>
                    <h1 className="inventory-page__title">Инвентаризация</h1>
                    <div className="inventory-page__content">
                        {/* <div className="inventory-page__name">{business.name}</div>
                        <div className="inventory-page__address">{business.address}</div>
                        <div className="inventory-page__inventory">
                            <Inventory onEditItem={editItem} onRemoveItem={removeItem} data={inventoryArr} onOpenModal={openModal}/>
                        </div> */}

                    </div>
                </div>
            </div>
        </div>
        </>
    )
}