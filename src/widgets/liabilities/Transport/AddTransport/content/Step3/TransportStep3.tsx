// import React, { useEffect, useState } from "react"
// import "./transportStep3.css"
// import { InputSum } from "../../../../../../shared/ui/input/InputSum/InputSum" 
// import { Alert } from "../../../../../Alert/Alert"
// import { InputPercent } from "../../../../../../shared/ui/input/inputPercent/InputPercent" 
// import { InputTimeCredit } from "../../../../../../shared/ui/input/inputTimeCredit/InputTimeCredit" 
// import { ILiabilitiesTransport } from "../../../../../../app/types/liabilities/LiabilitiesType"

// interface ITransportStep3 {
//     onChangeBtnVisible: (flag: boolean) => void,
//     onChangeValues: (obj: ILiabilitiesTransport) => void,
//     data: ILiabilitiesTransport
// }

// export function TransportStep3({onChangeBtnVisible, onChangeValues, data}:ITransportStep3) {
//     const [valuePriceBuy, setValuePriceBuy] = useState(discharge(String(data.bought_price)))
//     const [valueTimeCredit, setValueTimeCredit] = useState(discharge(String(data.loan_term)))
//     const [valuePercentCredit, setValuePercentCredit] = useState(Number.isInteger(data.percentage)?String(data.percentage)+'.00':String(data.percentage))
//     const [valueFirstBuy, setValueFirstBuy] = useState(discharge(String(data.initial_payment)))
//     const [textAlertPriceBuy] = useState('') //setTextAlertPriceBuy
//     const [textAlertFirstBuy, setTextAlertFirstBuy] = useState('')
//     const [textAlertPercent] = useState('') //setTextAlertPercent
//     const [textAlertTimeCredit, setTextAlertTimeCredit] = useState('')

//     const [visibleCredit, setVisibleCredit] = useState(data.loan)

//     ////////////
//     function discharge(str:string): string {
//         return str.replace(/[^0-9.]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ")
//     }
//     ////////////

//     useEffect(()=>{
//         // console.log(Number.isNaN(valuePriceBuy))
//         // if(Number.isNaN(valuePriceBuy)) {
//             // console.log(valuePriceBuy.replace(/ /g,''))
//             let dataTmp = data
//             dataTmp.loan = visibleCredit
//             dataTmp.bought_price = Number(valuePriceBuy.replace(/ /g,''))
//             dataTmp.initial_payment = Number(valueFirstBuy.replace(/ /g,''))
//             dataTmp.loan_term = Number(valueTimeCredit.replace(/ /g,''))
//             dataTmp.percentage = Number(valuePercentCredit)
//             onChangeValues(dataTmp)
//             if((!visibleCredit &&  valuePriceBuy!=='' && valuePriceBuy!=='0' && textAlertPriceBuy === '') || (Number(valuePriceBuy.replace(/ /g,''))>=Number(valueFirstBuy.replace(/ /g,'')) && visibleCredit && valuePriceBuy!=='' && valuePriceBuy!=='0' && textAlertPriceBuy==='' && valueTimeCredit!=='' && textAlertTimeCredit==='' && valuePercentCredit!=='' && valueTimeCredit!=='0' && textAlertPercent==='' && textAlertFirstBuy==='' && valueFirstBuy!=='' && valueFirstBuy!=='0')) {
//                 onChangeBtnVisible(true)
//             }
//             else {
//                 onChangeBtnVisible(false)
//             }
//         // }
        
//     },[valuePriceBuy,valueTimeCredit,valuePercentCredit,valueFirstBuy, visibleCredit])

//     const changeFirstBuy = (event: React.FormEvent<HTMLInputElement>) => {
//         const maxLength = 10
//         let length = event.currentTarget.value.replace(/ /g,'').length
//         // console.log(valueFirstBuy === '0')
//         if(valueFirstBuy == '0') {
//             setValueFirstBuy(event.currentTarget.value[1])
//         }
//         else {
//             setValueFirstBuy(event.currentTarget.value)
//         }
//         // changeVal()
//         if(length<=maxLength && Number(event.currentTarget.value.replace(/ /g,'')) < Number(valuePriceBuy.replace(/ /g,''))) {
//             setTextAlertFirstBuy('')
//             // dataArr.initial_payment = Number(event.currentTarget.value.replace(/ /g,''))
//         }
//         else {
//             // dataArr.initial_payment = 0
//             setTextAlertFirstBuy(`некорректные данные`)
//             if(Number(event.currentTarget.value.replace(/ /g,'')) < Number(valuePriceBuy.replace(/ /g,''))) {
//                 setTextAlertFirstBuy('Первый взнос не должен превышать сумму кредита')
//             }
//         }
//     }
    
//     return (
//         <div className="property-add">
//             <div className="property-add__item">
//                 <div className="property-add__name">Цена транспорта<b>*</b></div>
//                 <InputSum length={10} value={valuePriceBuy} setValue={setValuePriceBuy}/>
//             </div>
//             <div className="property-add__item">
//                 <div className="property-add__name">Тип выплаты<b>*</b></div>
//                 <div className="property-add__item-container">
//                     <div className="property-add__rb">
//                         <input type="radio" id="rb1" checked={!visibleCredit} onChange={()=>{
//                             setVisibleCredit(false)
//                         }}/>
//                         <label htmlFor="rb1">наличный расчет</label>
//                     </div>
//                     <div className="property-add__rb">
//                         <input type="radio" id="rb2" checked={visibleCredit} onChange={()=>{
//                             setVisibleCredit(true)
//                         }}/>
//                         <label htmlFor="rb2">ипотека / кредит</label>
//                     </div>
//                 </div>
//                 {visibleCredit && 
//                 <div className="property-add__credit-block">
//                     <div className="credit-block">
//                         <div className="credit-block__item">
//                             <div className="credit-block__label">Первый взнос<b>*</b></div> 
//                             <input placeholder="Введите сумму" type="text" value={valueFirstBuy} onChange={changeFirstBuy} onKeyUp={()=>setValueFirstBuy(discharge(valueFirstBuy))}></input> <b>руб.</b>
//                             {textAlertFirstBuy!=='' && <Alert text={textAlertFirstBuy} type={'warning'}/>}
//                         </div>
//                         <div className="credit-block__item-container">
//                             <div className="credit-block__item">
//                                 <div className="credit-block__label">Срок кредитования<b>*</b></div> 
//                                 {/* <input type="text" value={valueTimeCredit} onChange={changeTimeCredit}  onKeyUp={()=>setValueTimeCredit(discharge(valueTimeCredit))}></input> <b>мес.</b> */}
//                                 <InputTimeCredit value={valueTimeCredit} setValue={setValueTimeCredit} setAlert={setTextAlertTimeCredit}/>
//                             </div>
//                             <div className="credit-block__item">
//                                 <div className="credit-block__label">Процентная ставка<b>*</b></div> 
//                                 <InputPercent value={valuePercentCredit} setValue={setValuePercentCredit}/>
//                             </div>
//                         </div>
                        
//                     </div>
//                 </div>
//                 }
                
//             </div>
//         </div>
//     )
// }
