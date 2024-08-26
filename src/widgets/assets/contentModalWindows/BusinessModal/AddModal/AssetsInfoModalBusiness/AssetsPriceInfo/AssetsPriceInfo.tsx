// import React, { useContext, useEffect, useState } from "react"
// import { IAssetsBusiness } from "../../../../../../../app/types/actives/business/BusinessTypes.ts"
// import { IStep } from "../../../../../../../app/types/steps"
// import { Alert } from "../../../../../../Alert/Alert"
// import { AlertContext } from "../../../../../../../features/context/alert/AlertContext"
// import { AddModalContext } from "../../../../../../../features/context/assets/property/addModal/AddModalContext"
// import './assetsPriceInfo.css'

// interface IContext {
//     stepsArr: IStep[],
//     dataArr: IAssetsBusiness,
//     nextStep: () => void,
//     earlierStep: () => void, 
// }

// export function AssetsPriceInfo() {
//     const {alert} = useContext(AlertContext) //showAlert, hideAlert
//     const { dataArr } = useContext(AddModalContext) as IContext
//     // const [valRb1, setValRb1] = useState(true)
//     // const [valRb2, setValRb2] = useState(false)
//     // const [valuePriceBuy, setValuePriceBuy] = useState<string>('')

//     const [valueCreditor, setValueCreditor] = useState<string>('')
//     const [valueThirdPartyTools, setValueThirdPartyTools] = useState<string>('')
//     const [valueThirdPartyToolsPercent, setValueThirdPartyToolsPercent] = useState<string>('')

//     const [valueOwnFunds, setValueOwnFunds] = useState<string>()
//     const [valueLoanSum, setValueLoanSum] = useState<string>('')
//     const [valueTimeCredit, setValueTimeCredit] = useState<string>('0')
//     const [valuePercentCredit, setValuePercentCredit] = useState<string>('5,00')
//     const [visibleValPrice, setVisibleValPrice] = useState(false)
//     const [visibleValCredit, setVisibleValCredit] = useState(false)
//     const [visibleValInvest, setVisibleValInvest] = useState(false)

    
//     const [textAlertCreditor, setTextAlertCreditor] = useState('')
//     const [textAlertThirdPartyTools, setTextAlertThirdPartyTools] = useState('')
//     const [textAlertThirdPartyToolsPercent, setTextAlertThirdPartyToolsPercent] = useState('')

//     const [textAlertOwnFunds, setTextAlertOwnFunds] = useState('')

//     const [textAlertLoanSum, setTextAlertLoanSum] = useState('')
//     const [textAlertPercent, setTextAlertPercent] = useState('')
//     const [textAlertTimeCredit, setTextAlertTimeCredit] = useState('')

//     useEffect(()=>{
//         if(Number.isInteger(dataArr.percentage)) {
//             setValuePercentCredit(String(dataArr.percentage)+'.00')
//         }
//         else {
//             setValuePercentCredit(String(dataArr.percentage))
//         }
//         if(Number.isInteger(dataArr.third_party_tools_percentage)) {
//             setValueThirdPartyToolsPercent(String(dataArr.third_party_tools_percentage)+'.00')
//         }
//         else {
//             setValueThirdPartyToolsPercent(String(dataArr.third_party_tools_percentage))
//         }
//         setValueThirdPartyTools(dataArr.third_party_tools.toLocaleString())
//         // setValueThirdPartyToolsPercent(String(dataArr.third_party_tools_percentage))
//         setValueOwnFunds(dataArr.own_funds.toLocaleString())
//         setValueLoanSum(dataArr.loan_sum.toLocaleString())
//         setValueTimeCredit(String(dataArr.loan_term))
//         // setValuePercentCredit(String(dataArr.percentage))
//         setValueCreditor(String(dataArr.creditor))
//         // setValuePayingCredit(dataArr.monthly_payment)
//         setVisibleValPrice(dataArr.investment_type2!.own_funds)
//         setVisibleValCredit(dataArr.investment_type2!.third_party_tools)
//         setVisibleValInvest(dataArr.investment_type2!.loan_credit)
//     },[])

//      ////////////
//      function discharge(str:string): string {
//         return str.replace(/[^0-9.]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ")
//     }
//     ////////////

    

//     const changeOwnFunds = (event: React.FormEvent<HTMLInputElement>) => {
//         const maxLength = 10
//         let length = event.currentTarget.value.replace(/ /g,'').length
//         setValueOwnFunds(event.currentTarget.value)
//         if(length<=maxLength) {
//             setTextAlertOwnFunds('')
//             dataArr.own_funds = Number(event.currentTarget.value.replace(/ /g,''))
//         }
//         else {
//             dataArr.own_funds = 0
//             setTextAlertOwnFunds(`кол-во символов превышено на ${length - maxLength}`)
//         }
//     }

//     const changeLoanSum = (event: React.FormEvent<HTMLInputElement>) => {
//         const maxLength = 10
//         let length = event.currentTarget.value.replace(/ /g,'').length
//         setValueLoanSum(event.currentTarget.value)
//         if(length<=maxLength) {
//             setTextAlertLoanSum('')
//             dataArr.loan_sum = Number(event.currentTarget.value.replace(/ /g,''))
//         }
//         else {
//             dataArr.loan_sum = 0
//             setTextAlertLoanSum(`кол-во символов превышено на ${length - maxLength}`)
//         }
//     }

//     const changePercentCredit = (event: React.FormEvent<HTMLInputElement>) => {
//         console.log(Number(event.currentTarget.value))
//         if((/(\d{1,2})[.]?(\d{1,2})$/).test( event.currentTarget.value )) {
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

//     // const changeFirstBuy = (event: React.FormEvent<HTMLInputElement>) => {
//     //     const maxLength = 10
//     //     let length = event.currentTarget.value.replace(/ /g,'').length
//     //     // console.log(event.currentTarget.value)
//     //     // let num = event.currentTarget.value.split('/\s+/').join('')
//     //     // console.log(num)
//     //     // let a=f(event.currentTarget.value)
//     //     setValueFirstBuy(event.currentTarget.value)
//     //     if(length<=maxLength) {
//     //         setTextAlertFirstBuy('')
//     //         dataArr.initial_payment = Number(event.currentTarget.value.replace(/ /g,''))
//     //     }
//     //     else {
//     //         dataArr.initial_payment = 0
//     //         setTextAlertFirstBuy(`некорректные данные`)
//     //     }
//     // }

//     const changeTimeCredit = (event: React.FormEvent<HTMLInputElement>) => {
//         let num = event.currentTarget.value.replace(/ /g,'')
//         setValueTimeCredit(num)
//         if(Number(event.currentTarget.value.replace(/ /g,'')) <= 500) {
//             setTextAlertTimeCredit('')
//             dataArr.loan_term = Number(event.currentTarget.value.replace(/ /g,''))
//         }
//         else {
//             dataArr.loan_term = 0
//             setTextAlertTimeCredit(`некорректные данные (max 500)`)
//         }
//     }

//     const changeThirdPartyTools = (event: React.FormEvent<HTMLInputElement>) => {
//         const maxLength = 10
//         let length = event.currentTarget.value.replace(/ /g,'').length
//         setValueThirdPartyTools(event.currentTarget.value)
//         if(length<=maxLength) {
//             setTextAlertThirdPartyTools('')
//             dataArr.third_party_tools = Number(event.currentTarget.value.replace(/ /g,''))
//         }
//         else {
//             dataArr.third_party_tools = 0
//             setTextAlertThirdPartyTools(`кол-во символов превышено на ${length - maxLength}`)
//         }
//     }

//     const changeThirdPartyToolsPercent = (event: React.FormEvent<HTMLInputElement>) => {
//         console.log(Number(event.currentTarget.value))
//         if((/(\d{1,2})[.]?(\d{1,2})$/).test( event.currentTarget.value )) {
//             if( Number(event.currentTarget.value)<100){
//                 setValueThirdPartyToolsPercent(event.currentTarget.value)
//                 setTextAlertThirdPartyToolsPercent(``)
//                 dataArr.third_party_tools_percentage = Number(event.currentTarget.value)
//             }
//             else {
//                 dataArr.third_party_tools_percentage = -1
//                 setTextAlertThirdPartyToolsPercent(`некорректные данные`)
//             }
//         }
//     }

//     const changeCreditor = (event: React.FormEvent<HTMLInputElement>) => {
//         const maxLength = 35
//         let length = event.currentTarget.value.length
//         setValueCreditor(event.currentTarget.value)
//         if(length<maxLength) {
//             setTextAlertCreditor('')
//             dataArr.creditor = event.currentTarget.value
//         }
//         else {
//             dataArr.creditor = ''
//             setTextAlertCreditor(`кол-во символов превышено на ${length - maxLength}`)
//         }
//     }

//     return (
//         <>
//         <div className="assets-price-info-business__container">
//             <div className="assets-price-info-business__item">
//                 <div className="assets-price-info-business__label">Тип инвестиций</div>
//                 <div className="assets-price-info-business__item-container">
//                     <input type="checkbox" id="rent1" checked={visibleValPrice} onChange={()=>{
//                         dataArr.investment_type2!.own_funds = !visibleValPrice
//                         setVisibleValPrice(!visibleValPrice)
//                         }}/>
//                     <label htmlFor="rent1">собственные средства</label>
                    
//                     {visibleValPrice && 
//                     <span style={{display:'flex', flexDirection: 'column'}}>
//                         <div style={{display: 'flex'}}>
//                         <input type="text" placeholder="Укажите стоимость" value={valueOwnFunds} onChange={changeOwnFunds} onKeyUp={()=>setValueOwnFunds(discharge(valueOwnFunds!))}></input>
//                         <b> руб.</b>
//                         </div>
//                     {textAlertOwnFunds!=='' && <Alert text={textAlertOwnFunds} type={'warning'}/>}
//                     </span>}
//                 </div>

//                 <div className="assets-price-info-business__item-container" >
//                     <input type="checkbox" id="rent2" checked={visibleValCredit} onChange={()=>{
//                         dataArr.investment_type2!.third_party_tools = !visibleValCredit
//                         setVisibleValCredit(!visibleValCredit)
//                         }}
//                         />
//                     <label htmlFor="rent2">сторонние и инвестиционные средства</label>
//                 </div>
//                 {visibleValCredit && <div className="assets-price-info-business__credit-container">
//                     <div className="assets-price-info-business__credit-item">
//                         <div className="assets-price-info-business__credit-label">Сумма кредита</div> 
//                         <input type="text" value={valueThirdPartyTools} onChange={changeThirdPartyTools}  onKeyUp={()=>setValueThirdPartyTools(discharge(valueThirdPartyTools))}></input> <b>мес.</b>
//                         {textAlertThirdPartyTools!=='' && <Alert text={textAlertThirdPartyTools} type={'warning'}/>}
//                     </div>
//                     <div className="assets-price-info-business__credit-item">
//                         <div className="assets-price-info-business__credit-label">Процент</div> 
//                         <input type="text" value={valueThirdPartyToolsPercent} onChange={changeThirdPartyToolsPercent} ></input> <b>%</b>
//                         {textAlertThirdPartyToolsPercent!=='' && <Alert text={textAlertThirdPartyToolsPercent} type={'warning'}/>}
//                     </div>
//                     <div className="assets-price-info-business__credit-item">
//                         <div className="assets-price-info-business__credit-label">Кредитор</div> 
//                         <input type="text" value={valueCreditor} onChange={changeCreditor} style={{width:'350px'}}></input>
//                         {textAlertCreditor!=='' && <Alert text={textAlertCreditor} type={'warning'}/>}
//                     </div>
//                 </div>}

//                 <div className="assets-price-info-business__item-container" >
//                     <input type="checkbox" id="rent3" checked={visibleValInvest} onChange={()=>{
//                         dataArr.investment_type2!.loan_credit = !visibleValInvest
//                         setVisibleValInvest(!visibleValInvest)

//                         }}/>
//                     <label htmlFor="rent3">инвистиции в кредит</label>
//                 </div>
//                 {visibleValInvest && <div className="assets-price-info-business__credit-container">
//                 <div className="assets-price-info-business__credit-item">
//                         <div className="assets-price-info-business__credit-label">Сумма кредитования</div> 
//                         <input type="text" value={valueLoanSum} onChange={changeLoanSum} onKeyUp={()=>setValueLoanSum(discharge(valueLoanSum))}></input> <b>руб.</b>
//                         {textAlertLoanSum!=='' && <Alert text={textAlertLoanSum} type={'warning'}/>}
//                     </div>
//                     {/* <div className="actives-price-info-business__credit-item">
//                         <div className="actives-price-info-business__credit-label">Первый взнос</div>
//                         <input type="text" value={valueFirstBuy} onChange={changeFirstBuy}  min='0'></input> <b>руб.</b>
//                     </div> */}
//                     <div className="assets-price-info-business__credit-item">
//                         <div className="assets-price-info-business__credit-label">Срок кредитования</div> 
//                         <input type="text" value={valueTimeCredit} onChange={changeTimeCredit} onKeyUp={()=>setValueTimeCredit(discharge(valueTimeCredit))}></input> <b>мес.</b>
//                         {textAlertTimeCredit!=='' && <Alert text={textAlertTimeCredit} type={'warning'}/>}
//                     </div>
//                     <div className="assets-price-info-business__credit-item">
//                         <div className="assets-price-info-business__credit-label">Процентная ставка</div> 
//                         <input type="text" value={valuePercentCredit} onChange={changePercentCredit} ></input> <b>%</b>
//                         {textAlertPercent!=='' && <Alert text={textAlertPercent} type={'warning'}/>}
//                     </div>
//                 </div>}
//             </div>
//         </div>
//         {alert.visible && alert.type==='Error' && <Alert text={alert.text} type={alert.type}/>}
//         </>
//     )
// }