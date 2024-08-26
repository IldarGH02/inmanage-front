// import React, { useContext, useEffect, useState } from "react"
// import { IAssetsTransport } from "../../../../../../../app/types/actives/transport/TransportTypes.ts"
// import { IStep } from "../../../../../../../app/types/steps"
// import { Alert } from "../../../../../../Alert/Alert"
// import { AlertContext } from "../../../../../../../features/context/alert/AlertContext"
// import { AddModalContext } from "../../../../../../../features/context/assets/property/addModal/AddModalContext"
// import './assetsOwnerInfo.css'

// interface IContext {
//     stepsArr: IStep[],
//     dataArr: IAssetsTransport,
//     nextStep: () => void,
//     earlierStep: () => void, 
// }

// export function LiabilitiesOwnerInfo() {
//     const {alert} = useContext(AlertContext)
//     const { dataArr } = useContext(AddModalContext) as IContext
//     const [valueOwner, setValueOwner] = useState('')
//     const [textAlertOwner, setTextAlertOwner] = useState('')
//     const [individualPerson, setIndividualPerson] = useState(false)
//     useEffect(()=>{
//         setValueOwner(dataArr.owner)
//         setIndividualPerson(dataArr.owner_type)
//     },[])

//     const changeOwner = (event: React.FormEvent<HTMLInputElement>) => {
//         const maxLength = 100
//         let length = event.currentTarget.value.length
//         setValueOwner(event.currentTarget.value)
//         if(length<maxLength) {
//             setTextAlertOwner('')
//             dataArr.owner = event.currentTarget.value
//         }
//         else {
//             dataArr.owner = ''
//             setTextAlertOwner(`допустимое количество символов превышено на ${length - maxLength}`)
//         } 
//     }

//     return (
//         <>
//         <div className="assets-main-info__container">
//             <div className="assets-main-info__item">
//                 <div className="assets-main-info__label">Владелец по ПТС</div>
//                 <input type='text' value={valueOwner} onChange={changeOwner}></input>
//                 {textAlertOwner!=='' && <Alert text={textAlertOwner} type={'warning'}/>}
//             </div>
//             <div className="assets-type-info__item">
//                 <div className="assets-type-info__label">Тип собственника</div>
//                     <div className="assets-type-info__item-container">
//                         <input type="radio" id="rent1" checked={!individualPerson} onChange={()=>{
//                             setIndividualPerson(false)
//                             dataArr.owner_type = false}}/>
//                         <label htmlFor="rent1">юредическое лицо</label>
//                     </div>
//                     <div className="assets-type-info__item-container">
//                         <input type="radio" id="rent2" checked={individualPerson} onChange={()=>{
//                             setIndividualPerson(true)
//                             dataArr.owner_type = true
//                             }}/>
//                         <label htmlFor="rent2">физическое лицо</label>
//                     </div>
//             </div>
//         </div>
//         {alert.visible && alert.type==='Error' && <Alert text={alert.text} type={alert.type}/>}
//         </>
//     )
// }