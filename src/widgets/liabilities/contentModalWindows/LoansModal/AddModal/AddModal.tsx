// import React, { useContext, useState } from "react";
// import { ILiabilitiesLoans } from "../../../../../app/types/liabilities/loans/ILoans";
// import { Alert } from "../../../../Alert/Alert";
// import Calendar from "../../../../Calendar/Calendar";
// import { ModalContext } from "../../../../../features/context/modalProperty/ModalContext";
// import { InputPercent } from "../../../../../shared/ui/input/inputPercent/InputPercent"; 
// import "./addModal.css"

// interface IAddModal {
//     onAddLoanItem: (newItem:ILiabilitiesLoans)=>void
// }

// export function AddModal({onAddLoanItem}:IAddModal) {
//     const {hide} = useContext(ModalContext)
//     const [insuranceVal, setInsuranceVal] = useState(true)

//     const [textAlertName, setTextAlertName] = useState('')
//     const [textAlertSumCredit, setTextAlertSumCredit] = useState('')
//     const [textAlertMaintenanceCost, setTextAlertMaintenanceCost] = useState('')
//     const [textAlertTimeCredit, setTextAlertTimeCredit] = useState('')
//     const [textAlertPercentCredit] = useState('') //setTextAlertPercentCredit
//     const [textAlertInsuranceSum, setTextAlertInsuranceSum] = useState('')
//     const [textAlertMain, setTextAlertMain] = useState('')

//     const [valueDate, setValueDate] = useState('')
//     const [valueName, setValueName] = useState('')
//     const [valueMaintenanceCost, setValueMaintenanceCost] = useState<string>('')
//     const [valueSumCredit, setValueSumCredit] = useState<string>('')
//     const [valueInsuranceSum, setValueInsuranceSum] = useState<string>('')
//     const [valueTimeCredit, setValueTimeCredit] = useState<string>('')
//     const [valuePercentCredit, setValuePercentCredit] = useState<string>('5.00')

//      ////////////
//      function discharge(str:string): string {
//         return str.replace(/[^0-9.]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ")
//     }
//     ////////////

//     const addItem = () => {
//         if(valueTimeCredit!=='' && valueMaintenanceCost!=='' && valueName!=='' && 
//         valueDate!=='' && (valueInsuranceSum!=='' && !insuranceVal || insuranceVal) && valuePercentCredit!=='' && valueSumCredit!=='' &&
//         valueTimeCredit!=='0' && valueSumCredit!=='0' &&
//         textAlertName==='' && textAlertSumCredit==='' && textAlertMaintenanceCost==='' && 
//         textAlertTimeCredit==='' && textAlertPercentCredit==='' && textAlertInsuranceSum==='') {
//             let newData: any = {
//                 user_id: 1,
//                 name: valueName,
//                 date: valueDate,
//                 insurance: insuranceVal,
//                 insurance_sum: Number(valueInsuranceSum.replace(/ /g,'')),
//                 remainder: Number(valueSumCredit.replace(/ /g,'')), //остаток
//                 sum: Number(valueSumCredit.replace(/ /g,'')),
//                 loan_term: Number(valueTimeCredit.replace(/ /g,'')),
//                 percentage: Number(valuePercentCredit.replace(/ /g,'')),
//                 month_payment: 0,
//                 maintenance_cost: Number(valueMaintenanceCost.replace(/ /g,''))
//             }
//             console.log(newData)
//             onAddLoanItem(newData)
//             hide()
//         }
//         else {
//             setTextAlertMain('Не все поля заполнены корректно! Пожалуйста, заполните их.')
//         }
        
//     } 

//     const clickDate = (date:string) => {
//         setValueDate(date)
//     }

//     const changeName = (event: React.FormEvent<HTMLInputElement>) => {
//         const maxLength = 35
//         let length = event.currentTarget.value.length
//         setValueName(event.currentTarget.value)
//         if(length<=maxLength) {
//             setTextAlertName('')
//         }
//         else {
//             setTextAlertName(`допустимое количество символов превышено на ${length - maxLength}`)
//         } 
//     }

//     // const changePercentCredit = (event: React.FormEvent<HTMLInputElement>) => {
//     //     if((/(\d{1,2})[.]?(\d{1,2})$/).test( event.currentTarget.value )) {
//     //         if( Number(event.currentTarget.value)<100){
//     //             setValuePercentCredit(event.currentTarget.value)
//     //             setTextAlertPercentCredit(``)
//     //         }
//     //         else {
//     //             setTextAlertPercentCredit(`некорректные данные`)
//     //         }
//     //     }
//     // }

//     const changeMaintenanceCost = (event: React.FormEvent<HTMLInputElement>) => {
//         const maxLength = 10
//         let length = event.currentTarget.value.replace(/ /g,'').length
//         setValueMaintenanceCost(event.currentTarget.value)
//         if(length<=maxLength) {
//             setTextAlertMaintenanceCost('')
//         }
//         else {
//             setTextAlertMaintenanceCost(`некорректные данные`)
//         }
//     }

//     const changeInsuranceSum = (event: React.FormEvent<HTMLInputElement>) => {
//         const maxLength = 10
//         let length = event.currentTarget.value.replace(/ /g,'').length
//         setValueInsuranceSum(event.currentTarget.value)
//         if(length<=maxLength ) {
//             setTextAlertInsuranceSum('')
//         }
//         else {
//             setTextAlertInsuranceSum(`некорректные данные`)
//         }
//     }

//     const changeSumCredit = (event: React.FormEvent<HTMLInputElement>) => {
//         const maxLength = 10
//         let length = event.currentTarget.value.replace(/ /g,'').length
//         setValueSumCredit(event.currentTarget.value)
//         if(length<=maxLength) {
//             setTextAlertSumCredit('')
//         }
//         else {
//             setTextAlertSumCredit(`некорректные данные`)
//         }
//     }

//     const changeTimeCredit = (event: React.FormEvent<HTMLInputElement>) => {
//         let num = event.currentTarget.value.replace(/ /g,'')
//         setValueTimeCredit(num)
//         if(Number(event.currentTarget.value.replace(/ /g,'')) <= 500) {
//             setTextAlertTimeCredit('')
//         }
//         else {
//             setTextAlertTimeCredit(`некорректные данные (max 500)`)
//         }
//     }

//     return (
//         <div className="loans-add-modal">
//             <div className="loans-add-modal__title">
//                 <h1>Добавление нового кредита/займа</h1>
//                 <button className="loans-add-modal__close-btn" onClick={()=>hide()}>x</button>
//             </div>
//             <div className="loans-add-modal__content">
//                 <div className="loans-add-modal__item">
//                     <div className="loans-add-modal__label">Название</div>
//                     <input type="text" value={valueName} onChange={changeName}/>
//                     {textAlertName!=='' && <Alert text={textAlertName} type={'warning'}/>}
//                 </div>
//                 <div className="loans-add-modal__item">
//                     <div className="loans-add-modal__label">Детали кредита/займа</div>
//                     <div className="loans-add-modal__input-container">
//                         <div className="loans-add-modal__input-item">
//                             <div className="loans-add-modal__input-label">Сумма</div>
//                             <input type="text" placeholder="Введите сумму" value={valueSumCredit} onChange={changeSumCredit} onKeyUp={()=>setValueSumCredit(discharge(valueSumCredit))}/> <b>руб.</b>
//                             {textAlertSumCredit!=='' && <Alert text={textAlertSumCredit} type={'warning'}/>}
//                         </div>
//                         <div className="loans-add-modal__input-item">
//                             <div className="loans-add-modal__input-label">Проценты</div>
//                             <InputPercent value="5.00" setValue={setValuePercentCredit}/>
//                             {/* <input type="text" placeholder="Введите процентную ставку" value={valuePercentCredit} onChange={changePercentCredit}/> <b>%</b>
//                             {textAlertPercentCredit!=='' && <Alert text={textAlertPercentCredit} type={'warning'}/>} */}
//                         </div>
//                         <div className="loans-add-modal__input-item">
//                             <div className="loans-add-modal__input-label">Срок</div>
//                             <input type="text" placeholder="Введите срок кредитования" value={valueTimeCredit} onChange={changeTimeCredit} onKeyUp={()=>setValueTimeCredit(discharge(valueTimeCredit))}/> <b>мес.</b>
//                             {textAlertTimeCredit!=='' && <Alert text={textAlertTimeCredit} type={'warning'}/>}
//                         </div>
//                         <div className="loans-add-modal__input-item">
//                             <div className="loans-add-modal__input-label">Обслуживание</div>
//                             <input type="text" placeholder="Введите стоимость обслуживания" value={valueMaintenanceCost} onChange={changeMaintenanceCost} onKeyUp={()=>setValueMaintenanceCost(discharge(valueMaintenanceCost))}/> <b>руб.</b>
//                             {textAlertMaintenanceCost!=='' && <Alert text={textAlertMaintenanceCost} type={'warning'}/>}
//                         </div>
//                     </div>
//                 </div>
                
//                 <div className="loans-add-modal__item" style={{width: '20%'}}>
//                     <div className="loans-add-modal__label">Дата</div>
//                     <Calendar onCickCalendar={clickDate}/>
//                 </div>
//                 <div className="loans-add-modal__item">
//                     <div className="loans-add-modal__label">Наличие страховки</div>
//                     <div className="loans-add-modal__checkbox-group">
//                         <div className="loans-add-modal__item-container">
//                             <input type="radio" id="insurance1" checked={insuranceVal} onChange={()=>{
//                             setInsuranceVal(true)
//                             }}/>
//                             <label htmlFor="insurance1">нет</label>
//                         </div>
//                         <div className="loans-add-modal__item-container">
//                             <input type="radio" id="insurance2" checked={!insuranceVal} onChange={()=>{
//                             setInsuranceVal(false)
//                             }}/>
//                             <label htmlFor="insurance2">да</label>
//                             {!insuranceVal && 
//                                 <div className="loans-add-modal__item">
//                                     <input type="text" placeholder="Введите стоимость страховки" value={valueInsuranceSum} onChange={changeInsuranceSum} onKeyUp={()=>setValueInsuranceSum(discharge(valueInsuranceSum))}/>
//                                     {textAlertInsuranceSum!=='' && <Alert text={textAlertInsuranceSum} type={'warning'}/>}
//                                 </div>
//                             }
//                         </div>
//                     </div>
//                 </div>
//                 {textAlertMain!=='' && <Alert text={textAlertMain} type={'Error'}/>}
                
//             </div>
//             <div className="loans-add-modal__footer">
//                 <button className="loans-add-modal__add-btn" onClick={addItem}>Добавить</button>
//                 <button className="loans-add-modal__cancel-btn" onClick={()=>hide()}>Отменить</button>
//             </div>
//         </div>
//     )
// }