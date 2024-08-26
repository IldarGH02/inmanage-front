// import React, { useContext, useEffect, useState } from "react";
// import { IAssetsTransport } from "../../../../../app/types/actives/transport/TransportTypes.ts";
// import { IStep, Status } from "../../../../../app/types/steps";
// import { AlertContext } from "../../../../../features/context/alert/AlertContext";
// import { AddModalContext } from "../../../../../features/context/assets/property/addModal/AddModalContext";
// import { ModalContext } from "../../../../../features/context/modalProperty/ModalContext";
// import { steps } from "../../../../modalWindow/steps/data/assetsTransportData";
// import Steps from "../../../../modalWindow/steps/Steps";
// import { AssetsAutoInfo } from "./AssetsInfoModalTransport/AssetsAutoInfo/AssetsAutoInfo";
// import { AssetsOwnerInfo } from "./AssetsInfoModalTransport/AssetsOwnerInfo/AssetsOwnerInfo";
// import { AssetsPriceInfo } from "./AssetsInfoModalTransport/AssetsPriceInfo/AssetsPriceInfo";
// // import "./addModalWindow.css"

// interface IContext {
//     stepsArr: IStep[],
//     dataArr: IAssetsTransport,
//     nextStep: () => void,
//     earlierStep: () => void, 
//     clearSteps: () => void
// }

// interface IAddModal {
//     onAddPropertyItem: (newItem:IAssetsTransport)=>void
// }

// export function AddModal({onAddPropertyItem}:IAddModal) {
//     const [indexContentArr, setIndexContentArr] = useState(0)
//     const {showAlert, hideAlert} = useContext(AlertContext)
//     const {hide} = useContext(ModalContext)
//     const [visibleBtnAdd, setVisibleBtnAdd] = useState(false)
//     const { dataArr, stepsArr, nextStep, earlierStep, clearSteps } = useContext(AddModalContext) as IContext
//     const contentArr = [<AssetsAutoInfo/>, <AssetsOwnerInfo/>, <AssetsPriceInfo/>]
    
//     useEffect(()=>{
//         clearSteps()
//         hideAlert()
//     },[])

//     const addItem = () => {
//         let flag = false
//         if(!dataArr.credit_indicator && dataArr.bought_price !== 0) {
//             flag = true
//         }
//         else if(dataArr.bought_price !== 0 && dataArr.initial_payment !== 0 && dataArr.loan_term !== 0 && dataArr.percentage !== -1 ) {
//                 flag = true
//         }
//         else {
//             showAlert('Не все поля заполнены корректно! Пожалуйста, заполните их.', 'Error')
//         }
//         if(flag) {
//             let newData: IAssetsTransport | any = {
//                 // id: Number(new Date),
//                 user_id: dataArr.user_id,
//                 owner: dataArr.owner,
//                 vin: dataArr.vin,
//                 use: dataArr.use,
//                 month_income: 0,
//                 month_expense: 0,
//                 average_profit: 0,
//                 revenue: 0,
//                 // credit_indicator: dataArr.credit_indicator,
//                 initial_payment: dataArr.credit_indicator === false ? 0 : dataArr.initial_payment,
//                 loan_term: dataArr.credit_indicator === false ? 0 : dataArr.loan_term,
//                 percentage: dataArr.credit_indicator === false ? 0 : dataArr.percentage,
//                 month_payment: dataArr.credit_indicator === false ? 0 : dataArr.month_payment,
//                 // loan_term: dataArr.loan_term,
//                 // month_payment: dataArr.month_payment,
//                 // brand: dataArr.brand,
//                 bought_price: dataArr.bought_price,
//                 // name: dataArr.name,
//                 owner_type: dataArr.owner_type,
//                 // initial_payment: dataArr.initial_payment,
//                 // percentage: dataArr.percentage
//             }
//             onAddPropertyItem(newData)
//             hide()
//             // dataArr.brand = ''
//             dataArr.credit_indicator = false 
//             // dataArr.name = ''
//             // dataArr.brand = ''
//             dataArr.vin = ''
//             dataArr.owner = ''
//             dataArr.bought_price = 0
//             dataArr.loan_term = 0
//             dataArr.month_payment = 0
//             dataArr.use = ''
//             dataArr.owner_type = false
//             dataArr.initial_payment = 0
//             stepsArr[1].status = Status.active
//             for(let i=2; i<steps.length; i++) {
//                 stepsArr[i].status = Status.inactive
//             }
//             hideAlert()
//         } 
//     } 

//     const nextSt = (index:number) => {
//         var flag = false
//         switch (index) {
//             case 0: {
//                 if(dataArr.vin !== '' && dataArr.use !== '') {
//                     flag = true
//                 } // (dataArr.vin !== '' && dataArr.use !== '' && dataArr.name !== '' && dataArr.brand !== '')
//                 else {
//                     showAlert('Не все поля заполнены корректно! Пожалуйста, заполните их.', 'Error')
//                 }
//                 break
//             }
//             case 1: {
//                 if(dataArr.owner!=='') {
//                     flag = true
//                 }
//                 else {
//                     showAlert('Не все поля заполнены корректно! Пожалуйста, заполните их.', 'Error')
//                 }
//                 break
//             }
//             case 2: {
//                 if(!dataArr.credit_indicator && dataArr.bought_price !== 0) {
//                     flag = true
//                 }
//                 else if(dataArr.bought_price !== 0 && dataArr.loan_term !== 0 && dataArr.month_payment !== 0) {
//                     flag = true
//                 }
//                 else {
//                     showAlert('Не все поля заполнены корректно! Пожалуйста, заполните их.', 'Error')
//                 }
//                 break
//             }       
//             default:
//                 break;
//         }
        
//         if(flag) {
//             hideAlert()
//             stepsArr.forEach((el:IStep, i)=>{
//                 if(el.status===Status.active) {
//                     if(i===stepsArr.length-1) {
//                         setIndexContentArr(i)
//                     }
//                     else {
//                         setIndexContentArr(i)
//                     }
//                 }
//             })
//             nextStep()
//             if(stepsArr[stepsArr.length-1].status === Status.active) {
//                 setVisibleBtnAdd(true)
//             }
//         }
//         else {
//             console.log('Error.tsx!')
//         }   
//     }

//     return (
//             <div className="add-modal">
//                 <div className="add-modal__title">
//                     <h1>Добавление нового транспорта</h1>
//                     {/* <button className="add-modal__close-btn">x</button> */}
//                     <button className="add-modal__close-btn" onClick={hide}>x</button>
//                 </div>
//                 <div className="add-modal__content">
//                     <Steps></Steps>
//                     {/* <AssetsAutoInfo/> */}
//                     {/* <AssetsPriceInfo/>
//                     <AssetsOwnerInfo/> */}
//                     {contentArr[indexContentArr]}
//                 </div>
//                 <div className="add-modal__footer">
                    
//                     {/* <button className="add-modal__cancel-btn" onClick={hide}>Отменить</button> */}
//                     <button className="add-modal__back-btn" onClick={()=>{
//                         if(stepsArr[stepsArr.length-1].status === Status.done) {
//                             setVisibleBtnAdd(false)
//                         }
//                         earlierStep()
//                         stepsArr.forEach((el:IStep, i)=>{
//                             if(el.status===Status.done && i!==0) {
//                                 hideAlert()
//                                 setIndexContentArr(i-1)  
//                             }
//                         })
//                     }}>Шаг назад</button>
//                     {visibleBtnAdd === true ? <button className="add-modal__add-btn" onClick={addItem}>Добавить</button>: <button className="add-modal__next-btn" onClick={()=>
//                     {   
//                         for(let i:number=stepsArr.length-1; i>=0; i--) {
//                             if(stepsArr[i].status === Status.active) {
//                                 nextSt(i-1)
//                                 break
//                             }
                                
//                         }
                        
//                     }}
//                     >Далее</button>}
//                 </div>
//             </div>
//     )
// }