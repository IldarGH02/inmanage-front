// import React, { useEffect, useState } from "react"
// import "./propertyStep3.css"
// import { IAssetsProperty } from "../../../../../../app/types/actives/ActivesTypes.ts"

// interface IPropertyStep3 {
//     // onChangeBtnVisible: (flag: boolean) => void, 
//     onChangeValues: (obj: IAssetsProperty)=>void, 
//     data: IAssetsProperty
// }

// export function PropertyStep3({onChangeValues, data}: IPropertyStep3) {
//     const [longRent, setLongRent] = useState(false)

//     useEffect(()=>{
//         // setLongRent(data.rent_type)
//     },[])

//     useEffect(()=>{
//         // data.rent_type = longRent
//         onChangeValues(data)
//     },[longRent])
    
//     return (
//         <div className="property-add">
//             <div className="property-add__item">
//                 <div className="property-add__name">Тип аренды</div>
//                 <div className="property-add__item-container">
//                     <div className="property-add__rb">
//                         <input type="radio" id="rb1" checked={!longRent} onChange={()=>{
//                             setLongRent(false)
//                         }}/>
//                         <label htmlFor="rb1">посуточная</label>
//                     </div>
//                     <div className="property-add__rb">
//                         <input type="radio" id="rb2" checked={longRent} onChange={()=>{
//                             setLongRent(true)
//                         }}/>
//                         <label htmlFor="rb2">долгосрочная</label>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }