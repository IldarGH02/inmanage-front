import React, { useContext, useState } from "react";
import { useBusiness } from "../../../../features/hooks/assets/business/businessHooks";
import { IAssetsBusiness } from "../../../../app/types/assets/business/IBusiness";
import { AddModalState } from "../../../../features/context/assets/property/addModal/AddModalState";
import { ModalContext } from "../../../../features/context/modalProperty/ModalContext";
import { DeleteModalWindow } from "../../../modalWindow/DeleteModalWindow/DeleteModalWindow";
import { Modal } from "../../../modalWindow/Modal";
import { steps } from "../../../modalWindow/steps/data/assetsBusinessData";
import { ASSETS_BUSINESS_ADD, ASSETS_BUSINESS_DELETE, ASSETS_BUSINESS_EDIT, ASSETS_BUSINESS_INCOME } from "../../../modalWindow/types";
import { AddModal } from "../../contentModalWindows/BusinessModal/AddModal/AddModalWindow";
import { EditModal } from "../../contentModalWindows/BusinessModal/EditModal/EditModal";
import { IncomeModal } from "../../contentModalWindows/BusinessModal/IncomeModal/IncomeModal";
import { InventoryModalWindow } from "../../contentModalWindows/BusinessModal/IneventoryModal/InventoryModalWindow";
import "../business.css"
import { BusinessItem } from "../BusinessItem/BusinessItemTest";

const initialDataArr: IAssetsBusiness | any  = {
    id: 0,
    user_id: 1,
    name: '',
    address: '',
    direction: "",
    type: false,
    investment_type2: {
        own_funds: false,
        third_party_tools: false,
        loan_credit: false
    },
    own_funds: 0,
    third_party_tools: 0,
    creditor: "",
    loan_term: 0,
    percentage: 0,
    month_payment: 0,
    revenue: 0,
    month_income: 0,
    month_expense: 0,
    average_profit: 0,
    loan_sum: 0,
    third_party_tools_percentage: 0
}

interface IBusinessItemDTO {
    id: number, 
    name: string,
    address: string,
    direction: string,
    type: boolean,
}

export function Business() {
    const {business, addBusiness, editBusiness, removeBusiness} = useBusiness()
    const modal = useContext(ModalContext)
    const {show, hide} = useContext(ModalContext)
    const [businessDto, setBusinessDto] = useState<IBusinessItemDTO>()
    // const [arrData, setArrData] = useState<IAssetsBusiness[]>(data)
    const [idDt, setIdDt] = useState(0)
    
    const addBusinessItem = (newItem:IAssetsBusiness) => {
        addBusiness(newItem)
    }

    const editModal = (obj: IBusinessItemDTO) => {
        setBusinessDto(obj)
        show(ASSETS_BUSINESS_EDIT)
    }

    const editBusinessItem = (obj: IBusinessItemDTO) => {
        editBusiness(obj)
        hide()
    }

    const showModal = (id:number, type:string) => {
        setIdDt(id)
        show(type)
    }

    const removeItem = (reason:number, price?: number) => {
        if(reason!==0) {
            removeBusiness(idDt)
            if(reason===3) {
                console.log(price)
            }
        }
    }

    // const inventoryModal = (id:number, type:string) => {
    //     setIdDt(id)
    //     show(type)
    // }

    return (
        <>
        <AddModalState dataSteps={steps} dataArr={initialDataArr}>
        {modal.modal.visible && 
            <Modal>
                {modal.modal.kind === 
                   ASSETS_BUSINESS_ADD ? <AddModal onAddBusinessItem={addBusinessItem}></AddModal> :
                    modal.modal.kind === ASSETS_BUSINESS_EDIT ? <EditModal businessDto={businessDto!} onEditBusinessItem={editBusinessItem}></EditModal>: 
                    modal.modal.kind === ASSETS_BUSINESS_INCOME ?  <IncomeModal></IncomeModal> :
                    modal.modal.kind === ASSETS_BUSINESS_DELETE ? <DeleteModalWindow onRemoveItem={removeItem}></DeleteModalWindow>:
                    <InventoryModalWindow id={idDt}/>
                }
                
            </Modal>
        }
        <div className="business">
            <div className="business__header">
                <div className="business__title"><h1>Бизнес</h1></div>
                <div>
                    <button className="business__btn-add">История</button>
                    <button className="business__btn-add" onClick={()=>show(ASSETS_BUSINESS_ADD)}>Добавить</button>
                </div>
            </div>
            <div className="business__items">
                {
                    business.map((el:IAssetsBusiness) => {
                        return ( <BusinessItem data={el} onShowModal={showModal} onEditModal={editModal} key={el.id}/>)
                    })
                }
                {/* <BusinessItem/> */}
            </div>
        </div>
        </AddModalState>
        </>
    )
}