// import { useContext, useEffect, useState } from "react";
// // import { ILiabilitiesProperty } from "../../../../../app/types/liabilities/property/IProperty";
// import { IStep, Status } from "../../../../../app/types/steps";
// import { AssetsMainInfoModalProperty } from "../../../../assets/contentModalWindows/PropertyModal/AssetsInfoModalProprty/AssetsMainInfoModalProprty";
// import { AssetsPriceInfo } from "../../../../assets/contentModalWindows/PropertyModal/AssetsInfoModalProprty/AssetsPriceInfo/AssetsPriceInfo";
// import { AssetsTypeInfo } from "../../../../assets/contentModalWindows/PropertyModal/AssetsInfoModalProprty/AssetsTypeInfo/AssetsTypeInfo";
// import { AlertContext } from "../../../../../features/context/alert/AlertContext";
// import { AddModalContext } from "../../../../../features/context/assets/property/addModal/AddModalContext";
// import { ModalContext } from "../../../../../features/context/modalProperty/ModalContext";
// import { steps } from "../../../../modalWindow/steps/data/assetsPropertyData";
// import Steps from "../../../../modalWindow/steps/Steps";
// import "./addModal.css"

// interface IContext {
//     stepsArr: IStep[],
//     // dataArr: ILiabilitiesProperty,
//     nextStep: () => void,
//     earlierStep: () => void, 
//     clearSteps: () => void
// }

// interface IAddModal {
//     onAddPropertyItem: (newItem:ILiabilitiesProperty)=>void
// }

// export function AddModal({onAddPropertyItem}:IAddModal) {
//     const {showAlert, hideAlert} = useContext(AlertContext)
//     const [indexContentArr, setIndexContentArr] = useState(0)
//     const {hide} = useContext(ModalContext)
//     const [visibleBtnAdd, setVisibleBtnAdd] = useState(false)
//     const { dataArr, stepsArr, nextStep, earlierStep, clearSteps } = useContext(AddModalContext) as IContext
//     const contentArr = [<AssetsMainInfoModalProperty/>, <AssetsPriceInfo/>, <AssetsTypeInfo/>]

//     useEffect(()=>{
//         hideAlert()
//         clearSteps()
//     },[])
    
//     const addItem = () => {
//         let newData:ILiabilitiesProperty = {
//             user_id: 1,
//             name: dataArr.name,
//             address: dataArr.address,
//             actual_price: dataArr.actual_price,
//             equipment_price: dataArr.equipment_price,
//             month_expense: dataArr.month_expense,
//             average_consumption: dataArr.average_consumption,
//             owner: dataArr.owner,
//             bought_price: dataArr.bought_price,
//             rent_type: dataArr.rent_type,
//             initial_payment: dataArr.credit_indicator === false ? 0 : dataArr.initial_payment,
//             loan_term: dataArr.credit_indicator === false ? 0 : dataArr.loan_term,
//             percentage: dataArr.credit_indicator === false ? 0 : dataArr.percentage,
//             month_payment: dataArr.credit_indicator === false ? 0 : dataArr.month_payment,
//             average_market_price: 0,
//             min_market_price: 0,
//             max_market_price: 0,
//             expenses: [],
//             total_expense: 0
//         }
//         onAddPropertyItem(newData)
//         hide()
//         dataArr.id = Number(new Date),
//         dataArr.user_id = 0,
//         dataArr.name = '',
//         dataArr.address = '',
//         dataArr.actual_price = 0,
//         dataArr.equipment_price = 0,
//         dataArr.month_expense = 0,
//         dataArr.average_consumption = 0,
//         dataArr.credit_indicator = false,
//         dataArr.owner = '',
//         dataArr.bought_price = 0,
//         dataArr.rent_type = false,
//         dataArr.initial_payment = 0,
//         dataArr.loan_term = 0,
//         dataArr.percentage = 5.00,
//         dataArr.month_payment = 0
//         stepsArr[1].status = Status.active
//         for(let i=2; i<steps.length; i++) {
//             stepsArr[i].status = Status.inactive
//         }
//         hideAlert()
//     } 

//     const nextSt = (index:number) => {
//         var flag = false
//         switch (index) {
//             case 0: {
//                 if(dataArr.owner !== '' && dataArr.name !== '' && dataArr.address !== '' && dataArr.name !== undefined && dataArr.address !== undefined) {
//                     flag = true
//                 }
//                 else {
//                     showAlert('Не все поля заполнены корректно! Пожалуйста, заполните их.', 'Error')
//                 }
//                 break;
//             }
//             case 1: {
//                 if(!dataArr.credit_indicator && dataArr.bought_price !== 0) {
//                     flag = true
//                 }
//                 else if(dataArr.bought_price !== 0 && dataArr.initial_payment !== 0 && dataArr.loan_term !== 0 && dataArr.percentage !== -1 ) {
//                         flag = true
//                     }
//                     else {
//                         showAlert('Не все поля заполнены корректно! Пожалуйста, заполните их.', 'Error')
//                     }
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
//         <div className="add-modal">
//             <div className="add-modal__title">
//                 <h1>Добавление новой недвижимости</h1>
//                 <button className="add-modal__close-btn" onClick={()=>hide()}>x</button>
//             </div>
//             <div className="add-modal__content">
//                 {/* <div className="add-modal__item">
//                     <div className="add-modal__label">Название недвижимости</div>
//                     <input type="text"/>
//                 </div>
//                 <div className="add-modal__item">
//                     <div className="add-modal__label">Адрес недвижимости</div>
//                     <input type="text"/>
//                 </div>
//                 <div className="add-modal__item">
//                     <div className="add-modal__label">Цена покупки пассива</div>
//                     <input type="number"/>
//                 </div> */}
//                 <Steps></Steps>
//                 {contentArr[indexContentArr]}
//             </div>
//             <div className="add-modal__footer">
                    
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
//         </div>
//     )
// }