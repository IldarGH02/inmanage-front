// import React, { useContext, useEffect, useState } from "react"
// import { IAssetsTransport } from "../../../../../../../app/types/actives/transport/TransportTypes.ts"
// import { IStep } from "../../../../../../../app/types/steps"
// import { Alert } from "../../../../../../Alert/Alert"
// import { AlertContext } from "../../../../../../../features/context/alert/AlertContext"
// import { AddModalContext } from "../../../../../../../features/context/assets/property/addModal/AddModalContext"
// import './assetsPriceInfo.css'

// interface IContext {
//     stepsArr: IStep[],
//     dataArr: IAssetsTransport,
//     nextStep: () => void,
//     earlierStep: () => void, 
// }

// export function LiabilitiesPriceInfo() {
//     const { dataArr } = useContext(AddModalContext) as IContext
//     const {alert} = useContext(AlertContext)
//     // const [valRb1, setValRb1] = useState(true)
//     // const [valRb2, setValRb2] = useState(false)
//     const [valuePriceBuy, setValuePriceBuy] = useState<string>('')
//     // const [valuePriceBuy, setValuePriceBuy] = useState<string>('')
//     // const [test, setTest] = useState<string>('')
//     const [valueFirstBuy, setValueFirstBuy] = useState<string>('')
//     const [valueTimeCredit, setValueTimeCredit] = useState<string>('0')
//     const [valuePercentCredit, setValuePercentCredit] = useState<string>('5.00')
//     const [valuePayingCredit] = useState<number|string>('') //setValuePayingCredit
//     const [visibleValPrice, setVisibleValPrice] = useState(true)
//     const [textAlertPriceBuy, setTextAlertPriceBuy] = useState('')
//     const [textAlertFirstBuy, setTextAlertFirstBuy] = useState('')
//     const [textAlertPercent, setTextAlertPercent] = useState('')
//     const [textAlertTimeCredit, setTextAlertTimeCredit] = useState('')
//     // const [textAlertPriceBuy]

//     useEffect(()=>{
//         if(Number.isInteger(dataArr.percentage)) {
//             setValuePercentCredit(String(dataArr.percentage)+'.00')
//         }
//         else {
//             setValuePercentCredit(String(dataArr.percentage))
//         }
//         setValuePriceBuy(dataArr.bought_price.toLocaleString())
//         setValueFirstBuy(dataArr.initial_payment.toLocaleString())
//         setValueTimeCredit(dataArr.loan_term.toLocaleString())
//         // setValuePercentCredit(dataArr.interest_rate)
//         // setValuePercentCredit(String(dataArr.percentage))
//         // setValuePayingCredit(dataArr.monthly_payment)
//         setVisibleValPrice(dataArr.credit_indicator!)
//         console.log(valuePayingCredit)
//     },[])


//     ////////////
//     function discharge(str:string): string {
//         return str.replace(/[^0-9.]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ")
//     }
//     ////////////

//     const changePriceBuy = (event: React.FormEvent<HTMLInputElement>) => {
//         const maxLength = 10
//         let length = event.currentTarget.value.replace(/ /g,'').length
//         // console.log(event.currentTarget.value)
//         // let num = event.currentTarget.value.split('/\s+/').join('')
//         // console.log(num)
//         // let a=f(event.currentTarget.value)
//         setValuePriceBuy(event.currentTarget.value)
//         if(length<=maxLength) {
//             setTextAlertPriceBuy('')
//             dataArr.bought_price = Number(event.currentTarget.value.replace(/ /g,''))
//         }
//         else {
//             dataArr.bought_price = 0
//             setTextAlertPriceBuy(`допустимое количество символов превышено на ${length - maxLength}`)
//         }
//         // setValuePriceBuy(Number(event.currentTarget.value))
        
//         // if(Number(event.currentTarget.value)===0) {
//         //     setValuePriceBuy(0)
//         // }
//         // else {
//             // setValuePriceBuy(Number(num))
        
//         // }
//     }

//     const changeFirstBuy = (event: React.FormEvent<HTMLInputElement>) => {
//         const maxLength = 10
//         let length = event.currentTarget.value.replace(/ /g,'').length
//         // console.log(event.currentTarget.value)
//         // let num = event.currentTarget.value.split('/\s+/').join('')
//         // console.log(num)
//         // let a=f(event.currentTarget.value)
//         setValueFirstBuy(event.currentTarget.value)
//         if(length<=maxLength && Number(event.currentTarget.value.replace(/ /g,'')) < Number(valuePriceBuy.replace(/ /g,''))) {
//             setTextAlertFirstBuy('')
//             dataArr.initial_payment = Number(event.currentTarget.value.replace(/ /g,''))
//         }
//         else {
//             dataArr.initial_payment = 0
//             setTextAlertFirstBuy(`некорректные данные`)
//         }
//     }

//     const changeTimeCredit = (event: React.FormEvent<HTMLInputElement>) => {
//         let num = event.currentTarget.value.replace(/ /g,'')
//         // console.log(event.currentTarget.value)
//         // let num = event.currentTarget.value.split('/\s+/').join('')
//         // console.log(num)
//         // let a=f(event.currentTarget.value)
//         setValueTimeCredit(num)
//         if(Number(event.currentTarget.value.replace(/ /g,'')) <= 500) {
//             setTextAlertTimeCredit('')
//             // setValueTimeCredit(num)
//             dataArr.loan_term = Number(event.currentTarget.value.replace(/ /g,''))
//         }
//         else {
//             dataArr.loan_term = 0
//             setTextAlertTimeCredit(`некорректные данные (max 500)`)
//         }
        
//         // setValueTimeCredit(event.currentTarget.value)
//         // if(Number(event.currentTarget.value)>600) {
//         //     setTextAlertTimeCredit(`некорректные данные`)
//         // }
//         // else {
//         //     setTextAlertTimeCredit('')
//         //     dataArr.loans_terms = Number(event.currentTarget.value)
//         // }
//     }

//     const changePercentCredit = (event: React.FormEvent<HTMLInputElement>) => {
//         console.log(Number(event.currentTarget.value))
//         if((/(^\d{1,2})[.](\d{1,2})$/).test( event.currentTarget.value )) {
//             if( Number(event.currentTarget.value)<100){
//                 setValuePercentCredit(event.currentTarget.value)
//                 setTextAlertPercent(``)
//                 dataArr.percentage = Number(event.currentTarget.value)
//             }
//             else {
//                 dataArr.percentage = -1
//                 setTextAlertPercent(`некорректные данные`)
//             }
//         }
//     }

//     // const changePayingCredit = (event: React.FormEvent<HTMLInputElement>) => {
//     //     if(Number(event.currentTarget.value)===0) {
//     //         setValuePayingCredit('')
//     //     }
//     //     else {
//     //         setValuePayingCredit(Number(event.currentTarget.value))
//     //         dataArr.month_payment = Number(event.currentTarget.value)
//     //     }
//     // }

//     return (
//         <>
//         <div className="assets-price-info-property__container">
//             <div className="assets-price-info-property__item">
//                 <div className="assets-price-info-property__label">Стоимость объекта</div> 
//                 <input type="text" value={valuePriceBuy} onChange={changePriceBuy} onKeyUp={()=>setValuePriceBuy(discharge(valuePriceBuy))}></input> <b>руб.</b>
//                 {textAlertPriceBuy!=='' && <Alert text={textAlertPriceBuy} type={'warning'}/>}
//             </div>
//             <div className="assets-price-info-property__item">
//                 <div className="assets-price-info-property__label">Тип выплаты</div>
//                 <div className="assets-price-info-property__item-container">
//                     <input type="radio" id="rent1" checked={!visibleValPrice} onChange={()=>{
//                         // setValRb2(false)
//                         setVisibleValPrice(false)
//                         dataArr.credit_indicator = false
//                         // setValRb1(!valRb1)
//                         }}/>
//                     <label htmlFor="rent1">наличный расчет</label>
//                     {/* {visibleValPrice && <><input type="number" placeholder="Укажите стоимость" value={valuePrice} onChange={changePrice} min='0'/><b>руб.</b></>} */}
//                 </div>
//                 <div className="assets-price-info-property__item-container" >
//                     <input type="radio" id="rent2" checked={visibleValPrice} onChange={()=>{
//                         // setValRb1(false)
//                         setVisibleValPrice(true)
//                         dataArr.credit_indicator=true
//                         // setValRb2(!valRb2)
//                         }}/>
//                     <label htmlFor="rent2">ипотека / кредит</label>
//                 </div>
//                 {visibleValPrice && <div className="assets-price-info-property__credit-container">
//                     <div className="assets-price-info-property__credit-item">
//                         <div className="assets-price-info-property__credit-label">Первый взнос</div> 
//                         <input type="text" value={valueFirstBuy} onChange={changeFirstBuy} onKeyUp={()=>setValueFirstBuy(discharge(valueFirstBuy))}></input> <b>руб.</b>
//                         {textAlertFirstBuy!=='' && <Alert text={textAlertFirstBuy} type={'warning'}/>}
//                     </div>
//                     <div className="assets-price-info-property__credit-item">
//                         <div className="assets-price-info-property__credit-label">Срок кредитования</div> 
//                         <input type="text" value={valueTimeCredit} onChange={changeTimeCredit}  onKeyUp={()=>setValueTimeCredit(discharge(valueTimeCredit))}></input> <b>мес.</b>
//                         {textAlertTimeCredit!=='' && <Alert text={textAlertTimeCredit} type={'warning'}/>}
//                     </div>
//                     <div className="assets-price-info-property__credit-item">
//                         <div className="assets-price-info-property__credit-label">Процентная ставка</div> 
//                         <input type="text" value={valuePercentCredit} onChange={changePercentCredit}></input> <b>%</b>
//                         {textAlertPercent!=='' && <Alert text={textAlertPercent} type={'warning'}/>}
//                     </div>
//                     {/* <div className="actives-price-info-property__credit-item">
//                         <div className="actives-price-info-property__credit-label">Ежемесячный плятеж</div>
//                         <input type="number" value={valuePayingCredit} onChange={changePayingCredit}  min='0'></input> <b>руб.</b>
//                     </div> */}
//                 </div>}
//             </div>
//         </div>
//         {alert.visible && alert.type==='Error' && <Alert text={alert.text} type={alert.type}/>}
//         </>
//     )
// }


// // useEffect(()=>{
// //     setValuePriceBuy(dataArr.bought_price)
// //     setValueFirstBuy(dataArr.first_buy)
// //     setValueTimeCredit(dataArr.loans_terms)
// //     setValuePercentCredit(dataArr.interest_rate)
// //     setValuePayingCredit(dataArr.monthly_payment)
// //     setVisibleValPrice(dataArr.credit_indicator)
// // },[])