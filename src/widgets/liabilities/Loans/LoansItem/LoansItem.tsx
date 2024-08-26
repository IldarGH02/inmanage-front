// import React from "react"
// import "./loansItem.css"
// import { ILiabilities } from "../../../../app/types/liabilities/LiabilitiesType"

// import loanImg from '../../../../../shared/assets/img/assets/loan.png'

// interface ILoansItem {
//     data: ILiabilities,
// }

// export function LoansItem({data}: ILoansItem) {
//     return (
//         <div className="loans-item">
//             <div className="loans-item__img">
//                 <img src={loanImg} alt="loanImg" />
//             </div>
//             <div className="loans-item__content">
//                 <div className="loans-item__info">
//                     <div className="loans-item__name">{'data.name'}</div>
//                     {/* <div className="loans-item__address">{data.address}</div> */}
//                 </div>
//                 <div className="loans-item__finance">
//                     <div className="loans-item__income">
//                     {/* {'month_income' in data && 
//                     <>
//                         <span>Доходы:</span><b>{data.month_income.toLocaleString()} ₽</b>
//                     </>
//                     } */}
//                     </div>
//                     <div className="loans-item__expense">
//                         <span>Расходы:</span>
//                         <b>{data.total_expenses.toLocaleString()} ₽</b> 
//                     </div>
//                     <div className="loans-item__profit">
//                     {/* {'average_profit' in data && 
//                     <>
//                         <span>Прибыль:</span><b>{data.average_profit.toLocaleString()} ₽</b>
//                     </>
//                     } */}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }