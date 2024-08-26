// import React from "react"
// import "./propertyItem.css"
// import { ILiabilitiesProperty } from "../../../../app/types/liabilities/LiabilitiesType"

// const homeImg = require('../../../../assets/img/assets/home.png')

// interface IPropertyItem {
//     data: ILiabilitiesProperty
// }

// export function PropertyItemLiabilities({data}: IPropertyItem) {
//     return (
//         <div className="property-item-liabilities">
//             <div className="property-item-liabilities__img">
//                 <img src={homeImg} alt="homeImg" />
//             </div>
//             <div className="property-item-liabilities__content">
//                 {/* <div className="realty-item-liabilities__info"> */}
//                     <div className="property-item-liabilities__name">{data.name}</div>
//                     {/* <div className="realty-item-liabilities__address">{data.address}</div> */}
//                 {/* </div> */}
//                 <div className="property-item-liabilities__finance-wrapper">
//                     <div className="property-item-liabilities__finance">
//                         <span className="property-item-liabilities__finance-title">Актуальная стоимость:</span>
//                         <div className="property-item-liabilities__sum-wrapper-green">
//                             <b className="property-item-liabilities__finance-sum">{data.actual_price.toLocaleString()}</b>
//                             <b className="property-item-liabilities__valuta">₽</b>
//                         </div>
//                     </div>
                   
//                     <div className="property-item-liabilities__finance">
//                         <span className={`property-item-liabilities__finance-title`}>Расход / месяц:</span>
//                         <div className="property-item-liabilities__sum-wrapper-red">
//                             <b className="property-item-liabilities__finance-sum">{data.month_expense.toLocaleString()}</b>
//                             <b className="property-item-liabilities__valuta">₽</b>
//                         </div>
//                     </div>

//                     <div className="property-item-liabilities__finance">
//                         <span className={`property-item-liabilities__finance-title`}>Остаток:</span>
//                         <div className="property-item-liabilities__sum-wrapper">
//                             <b className="property-item-liabilities__finance-sum">{0}</b>
//                             <b className="property-item-liabilities__valuta">₽</b>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }