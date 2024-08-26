// import { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { FinanceTable } from "../../../widgets/elements/FinanceTable/FinanceTable";
// import { useTypedSelector } from "../../../features/hooks/useTypedSelector";
// import { useDispatch } from "react-redux";
// import { getLiabilities, hideLoader, showLoader } from "../../../app/store/actions/liabilities/liabilitiesActions";
// import { Background } from "../../../widgets/elements/Background/Background";
// import { actionTypesLiabilities } from "../../../app/store/types/liabilitiesTypes";
// import { ItemLiabilities } from "../../../widgets/liabilities/ItemLiabilities/ItemLiabilities";
// import { SpinnerLoader } from "../../../widgets/elements/SpinnerLoader/SpinnerLoader";

// import homeImg from '../../../shared/assets/img/assets/home.png'
// import liabilitiesBckg from '../../../shared/assets/img/liabilities/liabilitiesBckg.png'

// export function PropertyPage() {
//     const state = useTypedSelector(state => state.liabilitiesReducer)
//     const dispatch = useDispatch()

//     useEffect(()=>{
//         if(state.liabilities === null) {
//             dispatch(showLoader(actionTypesLiabilities.SHOW_LOADER_LIABILITIES))
//             const res = getLiabilities(actionTypesLiabilities.GET_LIABILITIES)
//             res.then(e => {
//                 dispatch(e!);
//                 }
//             )
//             .catch((e) => {
//                 dispatch(hideLoader(actionTypesLiabilities.HIDE_LOADER_LIABILITIES))
//                 console.log(e)
//             })
//         }
//     },[])

//     return (
//         <>
//         <Background imgBckg={liabilitiesBckg}/>
//         <SpinnerLoader loading={state.loading} />
//         <div className="property-page">
//             <div className="property-page__container" >
//                 <div className="property-page__title">Недвижимость</div>
//                 <div className="property-page__finances">
//                     <FinanceTable
//                         link="add"
//                         price={state.liabilities && state.liabilities.properties ? state.liabilities.properties.total_funds : 0}
//                         expenses={state.liabilities && state.liabilities.properties ? state.liabilities.properties.total_expenses : 0}
//                         remainder={0}
//                     />
//                 </div>
//                 <div className="property-page__list-container">
//                     {state.liabilities?.properties?.properties.length === 0 &&
//                         <div className="property-page__list-empty">
//                             Недвижимости нет
//                         </div>
//                     }
//                     <div className="property-page__list">
//                         {state.liabilities?.properties!.properties.map((el)=>{
//                             return (
//                                 <Link className="property-page__item" to={`${el.id}`}  key={el.id}>
//                                     <ItemLiabilities
//                                         title={el.name}
//                                         img={homeImg}
//                                         actualPrice={el.actual_price}
//                                         expenses={el.month_expense}
//                                         remainder={0}/>
//                                 </Link>
//                             )
//                         })}
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </>
//     )
// }
