// import React, { useContext, useState } from "react";
// import { ModalContext } from "../../../../features/context/modalProperty/ModalContext";
// import { DeleteModalWindow } from "../../../modalWindow/DeleteModalWindow/DeleteModalWindow";
// import { Modal } from "../../../modalWindow/Modal";
// import { LIABILITIES_LOANS_ADD } from "../../../modalWindow/types";
// import { AddModal } from "../../contentModalWindows/LoansModal/AddModal/AddModal";
// import "../loans.css"
// import { useLoans } from "../../../../features/hooks/liabilities/loans/loansHooks";

// export function LoansList() {
//     const modal = useContext(ModalContext)
//     const {show} = useContext(ModalContext)
//     const {loans, addLoan, removeLoan} = useLoans()
//     const [idDt] = useState(0) //etIdDt

//     const addLoanItem = () => {
//         addLoan()
//     }
//     console.log(loans)

//     // const removeModal = (id:number, type:string) => {
//     //     setIdDt(id)
//     //     console.log(type)
//     //     show(type)
//     // }
    
//     const removeItem = (reason:number, price?: number) => {
//         if(reason!==0) {
//             removeLoan(idDt)
//             if(reason===3) {
//                 console.log(price)
//             }
//         }
//     }

//     return (
//         <>
//         {modal.modal.visible && 
//             <Modal>
//                 {modal.modal.kind === 
//                    LIABILITIES_LOANS_ADD ? <AddModal onAddLoanItem={addLoanItem}></AddModal> : <DeleteModalWindow onRemoveItem={removeItem}></DeleteModalWindow>
//                     // modal.modal.kind === PROPERTY_EDIT ? <EditModal name="Аппартаменты" price={1230.23}></EditModal>: 
//                     // modal.modal.kind === ASSETS_PROPERTY_DELETE ? <DeleteModalWindow></DeleteModalWindow> :
//                     // <IncomeModal></IncomeModal>
//                 }
                
//             </Modal>
//         }
//         <div className="property">
//             <div className="property__header">
//                 <div className="property__title"><h1>Кредиты/Займы</h1></div>
//                 <div>
//                     <button className="property__btn-add">История</button>
//                     <button className="property__btn-add" onClick={()=>show(LIABILITIES_LOANS_ADD)}>Добавить</button>
//                 </div>
                
//             </div>
//             <div className="property__items">
//             {
//                 // loans.map((el:ILoans, i) => {
//                 //     return ( <LoansItem data={el} onShowModal={removeModal} key={i}/>)
//                 // })
//             }
//             </div>
//         </div>
//         </>
//     )
// }