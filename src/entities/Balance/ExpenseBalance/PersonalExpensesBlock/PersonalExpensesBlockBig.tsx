// import React, { useEffect, useState } from "react";
// import "./personalExpensesBlockBig.css";
// // import { Modal } from "../../../../widgets/modalWindow/Modal"; 
// // import { SelectIconModal } from "../../../../widgets/elements/Modal/balance/SelectIconModal/SelectIconModal"; 
// import { IExpensePersonalIcons } from "../../../../app/types/balance/IBalance";
// import { useDispatch } from "react-redux";
// import { addPersonalExpenseCategory, showLoader } from "../../../../app/store/actions/balance/balanceActions";
// import { actionTypesBalance } from "../../../../app/store/types/balanceTypes";

// interface IIconBalance {
//     id: number,
//     src: string
// }

// interface IPersonalExpensesBlockBig {
//     allIconsData: IIconBalance[],
//     idActiveIcon: number|null,
//     iconsData: IExpensePersonalIcons[],
//     setIdActiveIcon: (id: number)=>void
// }

// export function PersonalExpensesBlockBig({allIconsData, idActiveIcon, iconsData, setIdActiveIcon}: IPersonalExpensesBlockBig) {
//     const dispatch = useDispatch()
//     const [icons, setIcons] = useState<IExpensePersonalIcons[]>([])
//     const [allIcons, setAllIcons] = useState<IIconBalance[]>([])
//     const [selectIconModalVisible, setSelectIconModalVisible] = useState(false)

//     useEffect(()=>{
//         console.log(selectIconModalVisible)
//         let arrIcons = [...iconsData]
//         let arr = [...allIconsData]
//         arr.push({
//             id: -1,
//             src: "string"
//         } as IIconBalance)
//         arrIcons.push({
//             id: -1,
//             icon_id: -1,
//             title: "string"
//         } as IExpensePersonalIcons)
//         setAllIcons(arr)
//         setIcons(arrIcons)
//     }, [])

//     // useEffect(()=>{
//     //     if(idActiveIcon) {

//     //     } else {
//     //         set
//     //     }
//     // }, [idActiveIcon])

//     const closeSelectIconModal = (newIcon?: IExpensePersonalIcons) => {
//         if(newIcon) {
//             dispatch(showLoader(actionTypesBalance.SHOW_LOADER))
//             const res = addPersonalExpenseCategory(actionTypesBalance.ADD_EXPENSE_PERSONAL_CATEGORY, newIcon)
//             res.then(e => {
//                 // setIconsList(e!.payload.icons)
//                 dispatch(e!)
//             })
//             .catch((e) => {
//                 console.log(e)
//             })
//         }
//         setSelectIconModalVisible(false)
//     }

//     closeSelectIconModal()

//     return (
//         <>
//         {/* {selectIconModalVisible &&
//             <Modal onClose={()=>setSelectIconModalVisible(false)}>
//                 <SelectIconModal data={allIcons} onClose={closeSelectIconModal}/>
//             </Modal>
//         } */}
//         <div className="personal-expenses-block-big">
//             <div className="personal-expenses-block-big__list">
//                 {icons.map((el)=>{
//                     if(el.id===-1) {
//                         return (
//                             <div className="personal-expenses-block-big__icon-add" key={el.id} onClick={()=>setSelectIconModalVisible(true)}>
//                                 <button className="personal-expenses-block-big__icon-add-btn">+</button>
//                                 <div className="personal-expenses-block-big__icon-add-title">Добавить</div>
//                             </div>
//                         )
//                     }
//                     return (
//                         <div className="personal-expenses-block-big__icon" onClick={()=>setIdActiveIcon(el.icon_id!)} key={el.id}>
//                             <div className={`personal-expenses-block-big__icon-wrapper${idActiveIcon===el.icon_id?'--active':''}`}>
//                                 <img className="personal-expenses-block-big__icon-img" src={allIcons[el.icon_id-1].src} alt="" />
//                             </div>
//                             <div className={`personal-expenses-block-big__icon-title${idActiveIcon===el.id?'--active':''}`}>{el.title}</div>
//                         </div>
//                     )
//                 })}
                
//             </div>
//         </div>
//         </>
//     )
// }