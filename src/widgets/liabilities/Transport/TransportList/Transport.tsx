// import React, { useContext, useState } from "react";
// import { useTransport } from "../../../../features/hooks/liabilities/transport/transportHooks";
// import { ILiabilitiesTransport } from "../../../../app/types/liabilities/transport/ITransport";
// import { AddModalState } from "../../../../features/context/assets/property/addModal/AddModalState";
// import { ModalContext } from "../../../../features/context/modalProperty/ModalContext";
// import { DeleteModalWindow } from "../../../modalWindow/DeleteModalWindow/DeleteModalWindow";
// import { Modal } from "../../../modalWindow/Modal";
// import { steps } from "../../../modalWindow/steps/data/assetsTransportData";
// import { LIABILITIES_TRANSPORT_ADD, LIABILITIES_TRANSPORT_DELETE, LIABILITIES_TRANSPORT_EDIT } from "../../../modalWindow/types";
// import { AddModal } from "../../contentModalWindows/TransportModal/AddModal/AddModal";
// import { EditModal } from "../../contentModalWindows/TransportModal/EditModal/EditModal";
// import { IncomeModal } from "../../contentModalWindows/TransportModal/IncomeModal/IncomeModal";
// import "../transport.css"

// const initialDataArr: ILiabilitiesTransport | any = {
//     id: Number(new Date),
//     user_id: 1,
//     owner: '',
//     vin: '',
//     use: '',
//     month_expense: 0,
//     credit_indicator: false,
//     loan_term: 0,
//     month_payment: 0,
//     brand: "",
//     name: "",
//     bought_price: 0,
//     owner_type: false,
//     initial_payment: 0,
//     percentage: 5.00,
//     average_consumption: 0
// }

// interface ITransportItemDTO {
//     id: number, 
//     name: string,
//     brand: string,
//     owner: string,
//     vin: string,
//     use: string,
//     owner_type: boolean
// }

// export function Transport() {
//     const {addTransport, editTransport, removeTransport} = useTransport()
//     const [transportDto] = useState<ITransportItemDTO>() //setTransportDto
//     const modal = useContext(ModalContext)
//     const {show, hide} = useContext(ModalContext)
//     const [idDt] = useState(0) //setIdDt

//     const addPropertyItem = (newItem:ILiabilitiesTransport) => {
//         addTransport(newItem)
//     }

//     // const editModal = (obj: ITransportItemDTO) => {
//     //     setTransportDto(obj)
//     //     show(LIABILITIES_TRANSPORT_EDIT)
//     // }

//     const editTransportItem = (obj: ITransportItemDTO) => {
//         editTransport(obj)
//         hide()
//     }

//     // const removeModal = (id:number, type:string) => {
//     //     setIdDt(id)
//     //     show(type)
//     // }
    
//     const removeItem = (reason:number, price?: number) => {
//         if(reason!==0) {
//             removeTransport(idDt)
//             if(reason===3) {
//                 console.log(price)
//             }
//         }
//     }

//     return (
//         <>
//         <AddModalState dataSteps={steps} dataArr={initialDataArr}>
//         {modal.modal.visible && 
//             <Modal> 
//                 {modal.modal.kind === 
//                    LIABILITIES_TRANSPORT_ADD ? <AddModal onAddPropertyItem={addPropertyItem}></AddModal>:
//                    modal.modal.kind === LIABILITIES_TRANSPORT_DELETE ? <DeleteModalWindow onRemoveItem={removeItem}></DeleteModalWindow>:
//                    modal.modal.kind === LIABILITIES_TRANSPORT_EDIT ? <EditModal transportDto = {transportDto!} onEditTransportItem={editTransportItem}></EditModal>:
//                    <IncomeModal></IncomeModal>
//                 }
                
//             </Modal>
//         }
//         <div className="transport">
//             <div className="transport__header">
//                 <div className="transport__title"><h1>Транспорт</h1></div>
//                 <div>
//                     <button className="transport__btn-add">История</button>
//                     <button className="transport__btn-add" onClick={()=>show(LIABILITIES_TRANSPORT_ADD)}>Добавить</button>
//                 </div>
//             </div>
//             <div className="transport__items">
//             {
//                 // transoprts.map((el:ILiabilitiesTransport) => {
//                 //     return ( <TransportItem data={el} onShowModal={removeModal} onEditModal={editModal} key={el.id}/>)
//                 // })
//             }
//             </div>
//         </div>
//         </AddModalState>
//         </>
//     )
// }