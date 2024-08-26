// import React, { useEffect, useState } from "react"
// import "./editTransportPage.css"

// import { Background } from "../../../../widgets/elements/Background/Background";
// import { SpinnerLoader } from "../../../../widgets/elements/SpinnerLoader/SpinnerLoader";
// import { useTypedSelector } from "../../../../features/hooks/useTypedSelector";
// import { useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
// import { hideLoader, showLoader } from "../../../../app/store/actions/assets/assetsActions";
// import { ILiabilitiesTransport } from "../../../../app/types/liabilities/LiabilitiesType";
// import { actionTypesLiabilities } from "../../../../app/store/types/liabilitiesTypes";
// import { getLiabilities } from "../../../../app/store/actions/liabilities/liabilitiesActions";
// import { EditTransportForm } from "../../../../widgets/forms/liabilities/transport/EditTransportForm/EditTransportForm";

// import assetsBckg from '../../../../shared/assets/img/assets/assetsBckg.png'

// export function EditTransportPage() {
//     const state = useTypedSelector(state => state.liabilitiesReducer)
//     const dispatch = useDispatch()
//     const [transport, setTransport] = useState<ILiabilitiesTransport|null>(null)
//     const {id} = useParams()

//     useEffect(()=>{
//         if(state.liabilities === null) {
//             dispatch(showLoader(actionTypesLiabilities.SHOW_LOADER_LIABILITIES))
//             const res = getLiabilities(actionTypesLiabilities.GET_LIABILITIES)
//             res.then(e => {
//                 dispatch(e!)
//                 const transportTmp = e!.payload.transports!.transport!.find(el=>el.id===Number(id))!
//                 setTransport(transportTmp)
//             })
//             .catch((e) => {
//                 dispatch(hideLoader(actionTypesLiabilities.HIDE_LOADER_LIABILITIES))
//                 console.log(e)
//             })
//         } else {
//             const transportTmp = state.liabilities.transports!.transport!.find(el=>el.id===Number(id))!
//             setTransport(transportTmp)
//         }
//     },[])

//     return (
//         <>
//         <Background imgBckg={assetsBckg}/>
//         <SpinnerLoader loading={state.loading} />
//         <div className="edit-transport-page">
//             <div className="edit-transport-page__container" >
//                 <div className="edit-transport-page__header">
//                     <div className="edit-transport-page__title">Редактирование транспорта</div>
//                 </div>
//                 <div className="edit-transport-page__content">
//                     {transport!==null && 
//                         <EditTransportForm transport={transport}/>
//                     }
//                 </div>
//             </div>
//         </div>
//         </>
//     )
// }
