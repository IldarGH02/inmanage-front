// import React, { useEffect } from "react"
// import "./loanPage.css"
// import { Link } from "react-router-dom"
// import { FinanceTable } from "../../../widgets/elements/FinanceTable/FinanceTable"
// import { useTypedSelector } from "../../../features/hooks/useTypedSelector"
// import { useDispatch } from "react-redux"
// import { getLiabilities, showLoader } from "../../../app/store/actions/liabilities/liabilitiesActions"
// import { Background } from "../../../widgets/elements/Background/Background"
// import { actionTypesLiabilities } from "../../../app/store/types/liabilitiesTypes"
// import { ItemLiabilities } from "../../../widgets/liabilities/ItemLiabilities/ItemLiabilities"

// import assetsBckg from '../../../shared/assets/img/assets/assetsBckg.png'
// import loanItem from '../../../shared/assets/img/liabilities/loanItem.png'

// export function LoanPage() {
//     const state = useTypedSelector(state => state.liabilitiesReducer)
//     const dispatch = useDispatch()

//     useEffect(()=>{
//         if(state.liabilities === null) {
//             dispatch(showLoader(actionTypesLiabilities.SHOW_LOADER_LIABILITIES))
//             const res = getLiabilities(actionTypesLiabilities.GET_LIABILITIES)
//             res.then(e => {
//                 // console.log(e)
//                 dispatch(e!);
//                 }
//             )
//             .catch((e) => {
//                 console.log(e)
//             })
//         }
//     },[])

//     return (
//         <>
//         <Background imgBckg={assetsBckg}/>
//         <div className="loan-page">
//             <div className="loan-page__container" >
//                 <div className="loan-page__title">Кредиты</div>
//                 <div className="loan-page__finances">
//                     <FinanceTable 
//                         link="add"
//                         price={state.liabilities && state.liabilities.loans ? state.liabilities.loans.total_funds : 0} 
//                         expenses={state.liabilities && state.liabilities.loans ? state.liabilities.loans.total_expenses : 0} 
//                         remainder={0}
//                     />
//                 </div>
//                 <div className="loan-page__list">
//                     {state.liabilities?.loans?.loans.length === 0 && 
//                         <div className="loan-page__list-empty">
//                             Кредитов нет
//                         </div>
//                     }
//                     <div className="loan-page__list-container">
//                         {state.liabilities?.loans?.loans.map((el)=>{
//                             return (
//                                 <Link className="property-page__item" to={`${el.id}`}  key={el.id}>
//                                     <ItemLiabilities
//                                         title={el.name}
//                                         img={loanItem}
//                                         actualPrice={0}
//                                         expenses={0}
//                                         remainder={el.remainder}
//                                     />
//                                 </Link>
//                             )
//                         })}
//                     </div>
//                     {/* <Link className="realty-page__item" to={`${1}`}>
//                         <ItemLiabilities
//                             title={'Кредит'}
//                             img={loanItem}
//                             actualPrice={0}
//                             expenses={0}
//                             remainder={0}
//                         />
//                     </Link> */}
//                 </div>
//             </div>
//         </div>
//         </>
//     )
// }
