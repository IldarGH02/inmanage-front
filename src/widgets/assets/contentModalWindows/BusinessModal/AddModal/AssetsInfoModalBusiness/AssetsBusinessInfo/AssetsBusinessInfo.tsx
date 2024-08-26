// import React, { useContext, useEffect, useState } from "react"
// import { IAssetsBusiness } from "../../../../../../../app/types/actives/business/BusinessTypes.ts"
// import { IStep } from "../../../../../../../app/types/steps"
// import { Alert } from "../../../../../../Alert/Alert"
// import { AlertContext } from "../../../../../../../features/context/alert/AlertContext"
// import { AddModalContext } from "../../../../../../../features/context/assets/property/addModal/AddModalContext"
// import "../../../../../../DropDownList/dropDownList.css"

// import './assetsBusinessInfo.css'

// // const data = [
// //     {id: 1, content:'HTML'},
// //     {id: 2, content:'CSS'},
// //     {id: 3, content:'JS'},
// //     {id: 4, content:'TS'},
// //     {id: 5, content:'SQL'},
// //     {id: 6, content:'HTML'},
// //     {id: 7, content:'CSS'},
// //     {id: 8, content:'JS'},
// //     {id: 9, content:'TS'},
// //     {id: 10, content:'SQL'},
// //     {id: 11, content:'HTML'},
// //     {id: 12, content:'CSS'},
// //     {id: 13, content:'JS'},
// //     {id: 14, content:'TS'},
// //     {id: 15, content:'SQL'},   
// // ]

// interface IContext {
//     stepsArr: IStep[],
//     dataArr: IAssetsBusiness,
//     nextStep: () => void,
//     earlierStep: () => void, 
// }

// export function AssetsBusinessInfo() {
//     const [visibleBusinessLogo] = useState(false) //setVisibleBusinessLogo
//     const {alert} = useContext(AlertContext)
//     const { dataArr } = useContext(AddModalContext) as IContext
//     const [valueName, setValueName] = useState('')
//     const [valueAddress, setValueAddress] = useState('')
//     const [textAlertName, setTextAlertName] = useState('')
    
//     useEffect(()=>{
//         setValueName(dataArr.name)
//         setValueAddress(dataArr.address)
//     },[])

//     const changeName = (event: React.FormEvent<HTMLInputElement>) => {
//         const maxLength = 35
//         let length = event.currentTarget.value.length
//         setValueName(event.currentTarget.value)
//         if(length<maxLength) {
//             setTextAlertName('')
//             dataArr.name = event.currentTarget.value
//         }
//         else {
//             dataArr.name = ''
//             setTextAlertName(`допустимое количество символов превышено на ${length - maxLength}`)
//         }
//     }

//     const changeAddress = (event: React.FormEvent<HTMLInputElement>) => {
//         setValueAddress(event.currentTarget.value)
//         dataArr.address = event.currentTarget.value
//     }

//     return (
//         <>
//         <div className="assets-business-info__container">
//             <div className="business-add-modal__item">
//                 <div className="business-add-modal__label" style={{fontSize: '25px', width: '100%', marginBottom: '25px'}}>Логотип бизнеса</div>
//                 {visibleBusinessLogo && 
//                 <div className="bisness-logo-choice">
//                     <h2 className="bisness-logo-choice__title">Выберете логотип бизнеса или загрузите свой</h2>
//                     <div className="bisness-logo-choice__list">

//                     </div>
//                     <div className="bisness-logo-choice__footer"></div>
//                 </div>}
//                 <div className="assets-business-info__container-btn">
//                     <span><b>Выбрать из имеющихся</b> <button className="assets-business-info__photo-btn">Выбрать</button></span>
//                     <span><b>Загрузить свой</b> <input type="file"/></span>
//                 </div>
//             </div>
//             <div className="assets-business-info__item">
//                 <div className="assets-business-info__label">Название бизнеса</div>
//                 <input type="text" value={valueName} onChange={changeName}/>
//                 {textAlertName!=='' && <Alert text={textAlertName} type={'warning'}/>}
//             </div>
//             <div className="assets-business-info__item">
//                 <div className="assets-business-info__label">Адрес бизнеса</div>
//                 <input type="text" value={valueAddress} onChange={changeAddress}/>
//                 {/* {textAlertAddress!=='' && <Alert text={textAlertAddress} type={'warning'}/>} */}
//             </div>
//         </div>
//         {alert.visible && alert.type==='Error' && <Alert text={alert.text} type={alert.type}/>}
//         </>
//     )
// }