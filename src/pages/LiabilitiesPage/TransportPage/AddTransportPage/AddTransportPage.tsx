// import React, { useEffect } from "react"
// import "./addTransportPage.css"

// import { Background } from "../../../../widgets/elements/Background/Background";
// import { SpinnerLoader } from "../../../../widgets/elements/SpinnerLoader/SpinnerLoader";
// import { useTypedSelector } from "../../../../features/hooks/useTypedSelector";
// import { useDispatch } from "react-redux";
// import { getLiabilities, hideLoader, showLoader } from "../../../../app/store/actions/liabilities/liabilitiesActions";
// import { actionTypesLiabilities } from "../../../../app/store/types/liabilitiesTypes";
// import { AddTransportForm } from "../../../../widgets/forms/liabilities/transport/AddTransportForm/AddTransportForm";

// import assetsBckg from '../../../../shared/assets/img/assets/assetsBckg.png'

// export function AddTransportPage() {
//     const state = useTypedSelector(state => state.liabilitiesReducer)
//     const dispatch = useDispatch()

//     useEffect(()=>{
//         if(state.liabilities === null) {
//             dispatch(showLoader(actionTypesLiabilities.SHOW_LOADER_LIABILITIES))
//             const res = getLiabilities(actionTypesLiabilities.GET_LIABILITIES)
//             res.then(e => {
//                 dispatch(e!);
//             })
//             .catch((e) => {
//                 dispatch(hideLoader(actionTypesLiabilities.HIDE_LOADER_LIABILITIES))
//                 console.log(e)
//             })
//         }
        
//     },[])

//     return (
//         <>
//         <Background imgBckg={assetsBckg}/>
//         <SpinnerLoader loading={state.loading} />
//         <div className="add-transport-page">
//             <div className="add-transport-page__container" >
//                 <div className="add-transport-page__header">
//                     <div className="add-transport-page__title">Транспорт</div>
//                 </div>
//                 <div className="add-transport-page__content">
//                     <AddTransportForm/>
//                 </div>
//             </div>
//         </div>
//         </>
//     )
// }
