// import React, { useContext, useEffect, useState } from "react";
// import { BussinessD } 
// import { IStep, Status } from "../../../../../app/types/steps";
// import { AlertContext } from "../../../../../features/context/alert/AlertContext";
// import { AddModalContext } from "../../../../../features/context/assets/property/addModal/AddModalContext";
// import { ModalContext } from "../../../../../features/context/modalProperty/ModalContext";
// import { steps } from "../../../../modalWindow/steps/data/assetsTransportData";
// import Steps from "../../../../modalWindow/steps/Steps";
// import { AssetsBusinessInfo } from "./AssetsInfoModalBusiness/AssetsBusinessInfo/AssetsBusinessInfo";
// import { AssetsPriceInfo } from "./AssetsInfoModalBusiness/AssetsPriceInfo/AssetsPriceInfo";
// import { AssetsTypeInfo } from "./AssetsInfoModalBusiness/AssetsTypeInfo/AssetsTypeInfo";
// // import "./addModalWindow.css"

// interface IContext {
//     stepsArr: IStep[],
//     dataArr: IAssetsBusiness,
//     nextStep: () => void,
//     earlierStep: () => void, 
//     clearSteps: () => void
// }

// interface IAddModal {
//     onAddBusinessItem: (newItem:IAssetsBusiness)=>void
// }

// // interface IAddModal {
// //     onAddPropertyItem: (newItem:IAssetsTransport)=>void
// // }

// // let initialDataArr: IAssetsTransport  = {
// //     id: Number(new Date),
// //     user_id: undefined,
// //     class_name: undefined,
// //     owner: '',
// //     vin: '',
// //     use: '',
// //     month_income: undefined,
// //     month_expense: undefined,
// //     average_profit: undefined,
// //     revenue: 0,
// //     individual_person: false,
// //     credit_indicator: false,
// //     first_buy: 0,
// //     loans_terms: '',
// //     interest_rate: '',
// //     monthly_payment: '',
// //     purpose: "",
// //     brand: "",
// //     model: "",
// //     bought_price: ""
// // }

// export function AddModal({onAddBusinessItem}:IAddModal) {
//     const [indexContentArr, setIndexContentArr] = useState(0)
//     const {hide} = useContext(ModalContext)
//     const {showAlert, hideAlert} = useContext(AlertContext)
//     const [visibleBtnAdd, setVisibleBtnAdd] = useState(false)
//     const { dataArr, stepsArr, nextStep, earlierStep, clearSteps } = useContext(AddModalContext) as IContext
//     const contentArr = [<AssetsBusinessInfo/>, <AssetsTypeInfo/>, <AssetsPriceInfo/>]
    
//     useEffect(()=>{
//         clearSteps()
//         hideAlert()
//     },[])

//     const addItem = () => {
//         let flag = true
//         if(dataArr.investment_type2!.own_funds && dataArr.own_funds === 0) {
//             flag = false
//         }
//         if(dataArr.investment_type2!.loan_credit && dataArr.loan_term === 0 && dataArr.percentage === -1 && dataArr.loan_sum === 0) {
//             flag = false
//         }
//         if(dataArr.investment_type2!.third_party_tools && dataArr.creditor === '' && dataArr.third_party_tools === 0 && dataArr.third_party_tools_percentage === -1) {
//             flag = false
//         }
//         if(!dataArr.investment_type2!.loan_credit && !dataArr.investment_type2!.own_funds && !dataArr.investment_type2!.third_party_tools) {
//             flag = false
//         }
//         if(!flag) {
//             showAlert('Не все поля заполнены корректно! Пожалуйста, заполните их.', 'Error')
//         }
//         console.log(dataArr)
//         if(flag) {
//             let newData: IAssetsBusiness | any = {
//                 // logo
//                 // id: Number(new Date),
//                 user_id: dataArr.user_id,
//                 address: dataArr.address,
//                 name: dataArr.name,
//                 direction: dataArr.direction,
//                 month_income: 0,
//                 month_expense: 0,
//                 average_profit: 0,
//                 revenue: 0,
//                 own_funds: dataArr.investment_type2!.own_funds ? dataArr.own_funds : 0,
//                 third_party_tools: dataArr.investment_type2!.third_party_tools ? dataArr.third_party_tools : 0,
//                 third_party_tools_percentage: dataArr.investment_type2!.third_party_tools ? dataArr.third_party_tools_percentage : 0,
//                 creditor: dataArr.investment_type2!.third_party_tools ? dataArr.creditor : '',
//                 loan_term: dataArr.investment_type2!.loan_credit === false ? 0 : dataArr.loan_term,
//                 percentage: dataArr.investment_type2!.loan_credit === false ? 0 : dataArr.percentage,
//                 loan_sum: dataArr.investment_type2!.loan_credit === false ? 0 : dataArr.loan_sum,
//                 month_payment: dataArr.month_payment,
//                 type: dataArr.type,
//             }
//             console.log(newData)
//             onAddBusinessItem(newData)
//             hide()
//             // dataArr.address = '',
//             // dataArr.name = '',
//             // dataArr.direction = '',
//             // dataArr.month_income = 0,
//             // dataArr.month_expense = 0,
//             // dataArr.average_profit = 0,
//             // dataArr.revenue = 0,
//             // dataArr.own_funds = 0,
//             // dataArr.third_party_tools = 0,
//             // dataArr.third_party_tools_percentage = 0,
//             // dataArr.creditor = '',
//             // dataArr.loan_term = 0,
//             // dataArr.percentage = 0,
//             // dataArr.loan_sum = 0,
//             // dataArr.month_payment = 0,
//             // dataArr.type = false,
//             // dataArr.investment_type2!.loan_credit = false
//             dataArr.investment_type2!.own_funds = false
//             dataArr.investment_type2!.third_party_tools = false
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
//                 if(dataArr.address !== '' && dataArr.name !== '') {
//                     flag = true
//                 }
//                 else {
//                     showAlert('Не все поля заполнены корректно! Пожалуйста, заполните их.', 'Error')
//                 }
//                 break
//             }
//             case 1: {
//                 if(dataArr.direction!=='') {
//                     flag = true
//                 }
//                 else {
//                     showAlert('Не все поля заполнены корректно! Пожалуйста, заполните их.', 'Error')
//                 }
//                 break
//             }
//             // case 2: {
//             //     flag = true
//             //     if(dataArr.investment_type2!.own_funds && dataArr.own_funds === 0) {
//             //         flag = false
//             //     }
//             //     if(dataArr.investment_type2!.loan_credit && dataArr.loan_term !== 0 && dataArr.percentage !== -1 && dataArr.loan_sum !== 0) {
//             //         flag = false
//             //     }
//             //     if(dataArr.investment_type2?.third_party_tools && dataArr.creditor !== '' && dataArr.third_party_tools !== 0 && dataArr.third_party_tools_percentage !== -1) {
//             //         flag = false
//             //     }
//             //     if(!flag) {
//             //         showAlert('Не все поля заполнены корректно! Пожалуйста, заполните их.', 'Error.tsx')
//             //     }
//             //     else {
//             //         flag = true
//             //     }
//             //     break
//             // }       
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
//         // <AddModalState dataSteps={steps} dataArr={initialDataArr}>
//             <div className="add-modal">
//                 <div className="add-modal__title">
//                     <h1>Добавление нового бизнеса</h1>
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
//         // </AddModalState>
//     )
// }