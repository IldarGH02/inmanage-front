// import React, { useEffect, useState } from "react"
// import "./editPropertyPage.css"

// import { Background } from "../../../../widgets/elements/Background/Background";
// import { SpinnerLoader } from "../../../../widgets/elements/SpinnerLoader/SpinnerLoader";
// import { useTypedSelector } from "../../../../features/hooks/useTypedSelector";
// import { EditPropertyForm } from "../../../../widgets/forms/liabilities/property/EditPropertyForm/EditPropertyForm";
// import { useDispatch } from "react-redux";
// import { getLiabilities, hideLoader, showLoader } from "../../../../app/store/actions/liabilities/liabilitiesActions";
// import { actionTypesLiabilities } from "../../../../app/store/types/liabilitiesTypes";
// import { ILiabilitiesProperty } from "../../../../app/types/liabilities/LiabilitiesType";
// import { useParams } from "react-router-dom";

// import assetsBckg from '../../../../shared/assets/img/assets/assetsBckg.png'

// export function EditPropertyPage() {
//     const state = useTypedSelector(state => state.liabilitiesReducer)
//     const dispatch = useDispatch()
//     const [property, setProperty] = useState<ILiabilitiesProperty|null>(null)
//     const {id} = useParams()

//     useEffect(()=>{
//         if(state.liabilities === null) {
//             dispatch(showLoader(actionTypesLiabilities.SHOW_LOADER_LIABILITIES))
//             const res = getLiabilities(actionTypesLiabilities.GET_LIABILITIES)
//             res.then(e => {
//                 dispatch(e!)
//                 const propertyTmp = e!.payload.properties!.properties!.find(el=>el.id===Number(id))!
//                 setProperty(propertyTmp)
//             })
//             .catch((e) => {
//                 dispatch(hideLoader(actionTypesLiabilities.HIDE_LOADER_LIABILITIES))
//                 console.log(e)
//             })
//         } else {
//             const propertyTmp = state.liabilities.properties!.properties!.find(el=>el.id===Number(id))!
//             setProperty(propertyTmp)
//         }
//     },[])

//     return (
//         <>
//         <Background imgBckg={assetsBckg}/>
//         <SpinnerLoader loading={state.loading} />
//         <div className="edit-property-page">
//             <div className="edit-property-page__container" >
//                 <div className="edit-property-page__header">
//                     <div className="edit-property-page__title">Редактирование недвижимости</div>
//                 </div>
//                 <div className="edit-property-page__content">
//                     {property && 
//                         <EditPropertyForm property={property}/>
//                     }
//                 </div>
//             </div>
//         </div>
//         </>
//     )
// }
