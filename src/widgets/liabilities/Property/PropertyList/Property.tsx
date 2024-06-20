import React, { useContext, useState } from "react";
import { useProperty } from "../../../../features/hooks/liabilities/property/propertyHooks";
import { ILiabilitiesProperty } from "../../../../app/types/liabilities/property/IProperty";
import { AddModalState } from "../../../../features/context/assets/property/addModal/AddModalState";
import { ModalContext } from "../../../../features/context/modalProperty/ModalContext";
import { DeleteModalWindow } from "../../../modalWindow/DeleteModalWindow/DeleteModalWindow";
import { InventoryModalWindow } from "../../../modalWindow/InventoryModalWindow/InventoryModalWindow";
import { Modal } from "../../../modalWindow/Modal";
import { steps } from "../../../modalWindow/steps/data/assetsPropertyData";
import { LIABILITIES_PROPERTY_ADD, LIABILITIES_PROPERTY_EDIT, LIABILITIES_PROPERTY_DELETE, LIABILITIES_PROPERTY_INCOME } from "../../../modalWindow/types";
import { AddModal } from "../../contentModalWindows/LiabilitiesModal/AddModal/AddModal";
import { EditModal } from "../../contentModalWindows/LiabilitiesModal/EditModal/EditModal";
import { IncomeModal } from "../../contentModalWindows/LiabilitiesModal/IncomeModal/IncomeModal";
import "../property.css"

// let data:ILiabilitiesProperty[] = [
//     {
//         id: 1,
//         user_id: 1,
//         name: 'АППАРТАМЕНТЫ',
//         address: 'Москва, ул. Новодмитровская, д.2 к.4, кв.242',
//         bought_price: 1000000, //цена покупки
//         actual_price: 1200000,
//         equipment_price: 10000,
//         month_expense: 200,
//         average_consumption: 500,
//         rent_type: true,
//         // credit_indicator: false,
//         initial_payment: 0,//первый взнос
//         loan_term: 0, // срок кредитования
//         percentage: 0,
//         owner: 'asdasd', //процентная ставка
//         month_payment: 0, // ежемесячный платеж
//     },
//     {
//         id: 2,
//         user_id: 1,
//         name: 'АППАРТАМЕНТЫ',
//         address: 'Москва, ул. Новодмитровская, д.2 к.4, кв.242',
//         bought_price: 10000, //цена покупки
//         actual_price: 12000,
//         equipment_price: 1000,
//         month_expense: 100,
//         average_consumption: 600,
//         rent_type: true,
//         // credit_indicator: false,
//         initial_payment: 0,//первый взнос
//         loan_term: 0, // срок кредитования
//         percentage: 0,
//         owner: 'asdasd', //процентная ставка
//         month_payment: 0, // ежемесячный платеж
//     }
// ]

const initialDataArr: ILiabilitiesProperty  = {
    id: Number(new Date),
    user_id: 1,
    name: '',
    address: '',
    actual_price: 0,
    equipment_price: 0,
    month_expense: 0,
    average_consumption: 0,
    credit_indicator: false,
    owner: '',
    bought_price: 0,
    rent_type: false,
    initial_payment: 0,
    loan_term: 0,
    percentage: 5.00,
    month_payment: 0,
    average_market_price: 0,
    min_market_price: 0,
    max_market_price: 0,
    expenses: [],
    total_expense: 0
}

interface IEditPropertyDTO {
    id: number,
    name: string,
    address: string, 
    bought_price: number
}

export function Property() {
    const modal = useContext(ModalContext)
    const {show, hide} = useContext(ModalContext)
    // const [arrData, setArrData] = useState<ILiabilitiesProperty[]>(data)
    const [idDt] = useState(0) //setIdDt
    const [propertyDto] = useState<IEditPropertyDTO>() //setPropertyDto
    // const {property, addProperty, editProperty, removeProperty} = useProperty()
    const {addProperty, removeProperty} = useProperty() // убрал параметры чтобы не было ошибки

    const addPropertyItem = (newItem:ILiabilitiesProperty) => {
        addProperty(newItem)
    }

    const removeItem = (reason:number, price?: number) => {
        if(reason!==0) {
            removeProperty(idDt)
            if(reason===3) {
                console.log(price)
            }
        }
    }

    // const showModal = (id:number, type:string) => {
    //     setIdDt(id)
    //     show(type)
    // }

    // const editModal = (obj: IEditPropertyDTO) => {
    //     setPropertyDto(obj)
    //     show(LIABILITIES_PROPERTY_EDIT)
    // }

    // const editPropertyItem = (obj: IEditPropertyDTO) => {
    //     editProperty(obj)
    //     hide()
    // }

    const editPropertyItem = () => {
        hide()
    }

    return (
        <>
        <AddModalState dataSteps={steps} dataArr={initialDataArr}>
        {modal.modal.visible && 
            <Modal>
                {modal.modal.kind === 
                   LIABILITIES_PROPERTY_ADD ? <AddModal onAddPropertyItem={addPropertyItem}></AddModal> :
                   modal.modal.kind === LIABILITIES_PROPERTY_EDIT ? <EditModal propertyDto = {propertyDto!} onEditPropertyItem={editPropertyItem}></EditModal>: 
                   modal.modal.kind === LIABILITIES_PROPERTY_DELETE ? <DeleteModalWindow onRemoveItem={removeItem}></DeleteModalWindow>:
                   modal.modal.kind === LIABILITIES_PROPERTY_INCOME ? <IncomeModal></IncomeModal>:
                   <InventoryModalWindow id={idDt}/>
                }
                
            </Modal>
        }
        <div className="property">
            <div className="property__header">
                <div className="property__title"><h1>Недвижимость</h1></div>
                <div>
                    <button className="property__btn-add">История</button>
                    <button className="property__btn-add" onClick={()=>show(LIABILITIES_PROPERTY_ADD)}>Добавить</button>
                </div>
                
            </div>
            <div className="property__items">
                {
                    // property.map((el) => {
                    //     return (<PropertyItem data={el} onShowModal={showModal} onEditModal={editModal} key={el.id}/>)
                    // })
                }
                {/* <PropertyItem/> */}
            </div>
        </div>
        </AddModalState>
        </>
    )
}