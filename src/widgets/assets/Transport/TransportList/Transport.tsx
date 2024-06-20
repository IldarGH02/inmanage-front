import React, { useContext, useState } from "react";
import { useTransport } from "../../../../features/hooks/assets/transport/transportHooks";
import { IAssetsTransport } from "../../../../app/types/assets/transport/ITransport";
import { AddModalState } from "../../../../features/context/assets/property/addModal/AddModalState";
import { ModalContext } from "../../../../features/context/modalProperty/ModalContext";
import { DeleteModalWindow } from "../../../modalWindow/DeleteModalWindow/DeleteModalWindow";
import { Modal } from "../../../modalWindow/Modal";
import { steps } from "../../../modalWindow/steps/data/assetsTransportData";
import { ASSETS_TRANSPORT_ADD, ASSETS_TRANSPORT_DELETE, ASSETS_TRANSPORT_EDIT } from "../../../modalWindow/types";
import { AddModal } from "../../contentModalWindows/TransportModal/AddModal/AddModalWindow";
import { EditModal } from "../../contentModalWindows/TransportModal/EditModal/EditModal";
import { IncomeModal } from "../../contentModalWindows/TransportModal/IncomeModal/IncomeModal";
import "../transport.css"

const initialDataArr: IAssetsTransport  = {
    id: Number(new Date),
    user_id: 1,
    owner: '',
    vin: '',
    use: '',
    month_income: 0,
    month_expense: 0,
    average_profit: 0,
    revenue: 0,
    credit_indicator: false,
    loan_term: 0,
    month_payment: 0,
    bought_price: 0,
    owner_type: false,
    initial_payment: 0,
    percentage: 5.00,
    mark: "",
    model: "",
    average_market_price: 0,
    min_market_price: 0,
    max_market_price: 0,
    images: [],
    income: [],
    expenses: [],
    total_income: 0,
    total_expense: 0
}

interface ITransportItemDTO {
    id: number, 
    name: string,
    brand: string,
    owner: string,
    vin: string,
    use: string,
    owner_type: boolean
}

export function Transport() {
    const {addTransport, editTransport, removeTransport} = useTransport()
    const modal = useContext(ModalContext)
    const {show, hide} = useContext(ModalContext)
    const [transportDto] = useState<ITransportItemDTO>() //setTransportDto
    const [idDt] = useState(0) //setIdDt

    const addPropertyItem = (newItem:IAssetsTransport) => {
        addTransport(newItem)
    }

    // const editModal = (obj: ITransportItemDTO) => {
    //     setTransportDto(obj)
    //     show(ASSETS_TRANSPORT_EDIT)
    // }

    const editTransportItem = (obj: ITransportItemDTO) => {
        editTransport(obj)
        hide()
    }

    // const removeModal = (id:number, type:string) => {
    //     setIdDt(id)
    //     show(type)
    // }

    const removeItem = (reason:number, price?: number) => {
        if(reason!==0) {
            removeTransport(idDt)
            if(reason===3) {
                console.log(price)
            }
        }
    }

    return (
        <>
        <AddModalState dataSteps={steps} dataArr={initialDataArr}>
        {modal.modal.visible && 
            <Modal>
                {modal.modal.kind === 
                   ASSETS_TRANSPORT_ADD ? <AddModal onAddPropertyItem={addPropertyItem}></AddModal>:
                   modal.modal.kind === ASSETS_TRANSPORT_DELETE ? <DeleteModalWindow onRemoveItem={removeItem}></DeleteModalWindow>:
                   modal.modal.kind === ASSETS_TRANSPORT_EDIT ? <EditModal transportDto = {transportDto!} onEditTransportItem={editTransportItem}></EditModal>:
                   <IncomeModal></IncomeModal>
                   //     modal.modal.kind === PROPERTY_EDIT ? <EditModal name="Аппартаменты" price={1230.23}></EditModal>: 
                //    <IncomeModal></IncomeModal>
                }
                
            </Modal>
        }
        <div className="transport">
            <div className="transport__header">
                <div className="transport__title"><h1>Транспорт</h1></div>
                <div>
                    <button className="transport__btn-add">История</button>
                    <button className="transport__btn-add" onClick={()=>show(ASSETS_TRANSPORT_ADD)}>Добавить</button>
                </div>
            </div>
            <div className="transport__items">
            {
                // transoprts.map((el:IAssetsTransport) => {
                //     return ( <TransportItem data={el} onShowModal={removeModal} onEditModal={editModal} key={el.id}/>)
                // })
            }
            </div>
        </div>
        </AddModalState>
        </>
    )
}