// import React, { useEffect, useState } from "react"
// import "./propertyStep2.css"
// import { InputSum } from "../../../../../../shared/ui/input/InputSum/InputSumTest"
// import { Alert } from "../../../../../Alert/Alert"
// import { InputPercent } from "../../../../../../shared/ui/input/inputPercent/InputPercent"
// import { InputTimeCredit } from "../../../../../../shared/ui/input/inputTimeCredit/InputTimeCredit"
// import { IAssetsProperty } from "../../../../../../app/types/actives/ActivesTypes.ts"

// interface IPropertyStep2 {
//     onChangeBtnVisible: (flag: boolean) => void,
//     onChangeValues: (obj: IAssetsProperty) => void,
//     data: IAssetsProperty
// }

// export function PropertyStep2({onChangeBtnVisible, onChangeValues, data}:IPropertyStep2) {
//     const [valuePriceBuy, setValuePriceBuy] = useState(discharge(String(data.bought_price)))
//     const [valueTimeCredit, setValueTimeCredit] = useState(discharge(String(data.loan_term)))
//     const [valuePercentCredit, setValuePercentCredit] = useState(Number.isInteger(data.percentage)?String(data.percentage)+'.00':String(data.percentage))
//     const [valueFirstBuy, setValueFirstBuy] = useState(discharge(String(data.initial_payment)))
//     const [textAlertPriceBuy, setTextAlertPriceBuy] = useState('')
//     const [textAlertFirstBuy, setTextAlertFirstBuy] = useState('')
//     const [textAlertPercent] = useState('') // setTextAlertPercent
//     const [textAlertTimeCredit] = useState('') // setTextAlertTimeCredit

//     const [visibleCredit] = useState() //setVisibleCredit


//     ////////////
//     function discharge(str:string): string {
//         return str.replace(/[^0-9.]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ")
//     }
//     ////////////

    

//     // useEffect(()=>{
//     //     // console.log(valuePriceBuy)
//     //     // let tmp = data.bought_price.toLocaleString()
//     //     // setVisibleCredit(data.credit_indicator!)
//     //     // setValuePriceBuy(tmp)
//     //     // setValueFirstBuy(data.initial_payment.toLocaleString())
//     //     // setValueTimeCredit(data.loan_term.toLocaleString())
//     //     if(Number.isInteger(data.percentage)) {
//     //         setValuePercentCredit(String(data.percentage)+'.00')
//     //     }
//     //     else {
//     //         setValuePercentCredit(String(data.percentage))
//     //     }
//     // },[])

//     useEffect(()=>{
//         // console.log(Number.isNaN(valuePriceBuy))
//         // if(Number.isNaN(valuePriceBuy)) {
//             // console.log(valuePriceBuy.replace(/ /g,''))
//             let dataTmp = data
//             // dataTmp.credit_indicator = visibleCredit
//             dataTmp.bought_price = Number(valuePriceBuy.replace(/ /g,''))
//             dataTmp.initial_payment = Number(valueFirstBuy.replace(/ /g,''))
//             dataTmp.loan_term = Number(valueTimeCredit.replace(/ /g,''))
//             dataTmp.percentage = Number(valuePercentCredit)
//             onChangeValues(dataTmp)
//             if((!visibleCredit &&  valuePriceBuy!=='' && valuePriceBuy!=='0' && textAlertPriceBuy === '') || (visibleCredit && valuePriceBuy!=='' && textAlertPriceBuy==='' && valueTimeCredit!=='' && textAlertTimeCredit==='' && valuePercentCredit!=='' && valueTimeCredit!=='0' && textAlertPercent==='' && textAlertFirstBuy==='' && valueFirstBuy!=='' && valueFirstBuy!=='0')) {
//                 onChangeBtnVisible(true)
//             }
//             else {
//                 onChangeBtnVisible(false)
//             }
//         // }
        
//     },[valuePriceBuy,valueTimeCredit,valuePercentCredit,valueFirstBuy, visibleCredit])

//     // const changeVal = ()=> {
//     //     let dataTmp = data
//     //     dataTmp.credit_indicator = visibleCredit
//     //     dataTmp.bought_price = Number(valuePriceBuy.replace(/ /g,''))
//     //     dataTmp.initial_payment = Number(valueFirstBuy.replace(/ /g,''))
//     //     dataTmp.loan_term = Number(valueTimeCredit.replace(/ /g,''))
//     //     dataTmp.percentage = Number(valuePercentCredit)
//     //     onChangeValues(dataTmp)
//     //     if(!visibleCredit &&  valuePriceBuy!=='' && textAlertPriceBuy === '' || visibleCredit && valuePriceBuy!=='' && textAlertPriceBuy==='' && valueTimeCredit!=='' && textAlertTimeCredit==='' && valuePercentCredit!=='' && textAlertPercent==='' && textAlertFirstBuy==='' && valueFirstBuy!=='') {
//     //         onChangeBtnVisible(true)
//     //     }
//     //     else {
//     //         onChangeBtnVisible(false)
//     //     }
//     // }

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
//                 <div className="property-add__name">Стоимость недвижимости<b>*</b></div>
//                 <InputSum length={10} value={valuePriceBuy} setValue={setValuePriceBuy} setAlert={setTextAlertPriceBuy}/>
//             </div>
//             <div className="property-add__item">
//                 <div className="property-add__name">Тип выплаты<b>*</b></div>
//                 <div className="property-add__item-container">
//                     <div className="property-add__rb">
//                         <input type="radio" id="rb1" checked={!visibleCredit} onChange={()=>{
//                             // setVisibleCredit(() => {}) // Исправить
//                         }}/>
//                         <label htmlFor="rb1">наличный расчет</label>
//                     </div>
//                     <div className="property-add__rb">
//                         <input type="radio" id="rb2" checked={visibleCredit} onChange={()=>{
//                             // setVisibleCredit(() => {}) // Исправить
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
//                                 <InputTimeCredit value={valueTimeCredit} setValue={setValueTimeCredit} setAlert={() => {}}/>
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