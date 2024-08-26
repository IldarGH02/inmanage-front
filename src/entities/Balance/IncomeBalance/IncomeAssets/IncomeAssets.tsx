// import React, { useEffect } from "react";
// import "./incomeAssets.css";
// import { IExpenseSlider, IExpenseSliderCategory } from "../../../../app/types/balance/IBalance";
// import { useTypedSelector } from "../../../../features/hooks/useTypedSelector";
// import { useDispatch } from "react-redux";
// import { getAssets, showLoader } from "../../../../app/store/actions/assets/assetsActions";
// import { actionTypes } from "../../../../app/store/types/types";
// import { SelectedItemSlider } from "../../SelectedItemSlider/SelectedItemSlider";

// import property from '../../../../shared/assets/img/balance/addExpense/propertyB.png'
// import transport from '../../../../shared/assets/img/balance/addExpense/transportB.png'
// import business from '../../../../shared/assets/img/balance/addExpense/businessB.png'
// import jewelry from '../../../../shared/assets/img/balance/addExpense/jewelryB.png'
// import securities from '../../../../shared/assets/img/balance/addExpense/securitiesB.png'
// import loans from '../../../../shared/assets/img/balance/addExpense/loansB.png'

// const arrAssets: IExpenseSlider[] = [
//     {
//         id: 1,
//         name: 'Недвижимость',
//         img: property
//     },
//     {
//         id: 2,
//         name: 'Транспорт',
//         img: transport
//     },
//     {
//         id: 3,
//         name: 'Бизнес',
//         img: business
//     },
//     {
//         id: 4,
//         name: 'Ценные бумаги',
//         img: securities
//     },
//     {
//         id: 5,
//         name: 'Драгоценности',
//         img: jewelry
//     },
//     {
//         id: 6,
//         name: 'Вклады и займы',
//         img: loans
//     },
// ]

// interface IIncomeAssets {
//     onClickItem: (data: IExpenseSliderCategory[]) => void,
//     activeCategory: number|null,
//     onSetActiveCategory: (key: number|null) => void
// }

// export function IncomeAssets({onClickItem, activeCategory, onSetActiveCategory}: IIncomeAssets) {
//     const stateAssets = useTypedSelector(state => state.assetsReducer)
//     const dispatch = useDispatch()

//     const clickItem = (id: number) => {
//         let arr: IExpenseSliderCategory[] = []
//         switch (id) {
//             case 1: {
//                 arr = stateAssets.assets!.properties!.properties.map(el=>{
//                     return {
//                         id: el.id!,
//                         name: el.name,
//                         img: loans
//                     }
//                 })
//                 break;
//             }
                
//             case 2: {
//                 arr = stateAssets.assets!.transports!.transport.map(el=>{
//                     return {
//                         id: el.id!,
//                         name: el.mark + ' ' + el.model,
//                         img: el.images[0] ? el.images[0].image:loans
//                     }
//                 })
//                 break;
//             }

//             case 3: {
//                 arr = stateAssets.assets!.businesses!.businesses.map(el=>{
//                     return {
//                         id: el.id!,
//                         name: el.name,
//                         img: loans
//                     }
//                 })
//                 break;
//             }

//             case 4: {
//                 arr = stateAssets.assets!.properties!.properties.map(el=>{
//                     return {
//                         id: el.id!,
//                         name: el.name,
//                         img: loans
//                     }
//                 })
//                 break;
//             }

//             case 5: {
//                 arr = stateAssets.assets!.properties!.properties.map(el=>{
//                     return {
//                         id: el.id!,
//                         name: el.name,
//                         img: loans
//                     }
//                 })
//                 break;
//             }

//             case 6: {
//                 arr = stateAssets.assets!.properties!.properties.map(el=>{
//                     return {
//                         id: el.id!,
//                         name: el.name,
//                         img: loans
//                     }
//                 })
//                 break;
//             }
                
//             default:
//                 break;
//         }
//         onClickItem(arr)
//         onSetActiveCategory(id)
//     }

//     useEffect(()=>{
//         if(stateAssets.assets === null) {
//             dispatch(showLoader(actionTypes.SHOW_LOADER))
//             const res = getAssets(actionTypes.GET_ASSETS)
//             res.then(e => {
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
//         {activeCategory && 
//             <SelectedItemSlider img={arrAssets[activeCategory-1].img} title={arrAssets[activeCategory-1].name} onClickItem={()=>{
//                 onClickItem([])
//                 onSetActiveCategory(null)
//             }}/>
//         }
//         {!activeCategory &&
//             <div className="income-assets">
//                 {arrAssets.map(el=>{
//                     return (
//                         <div className={`expense-slider-item${el.id===activeCategory?'--active':''}`} onClick={()=>clickItem(el.id)} key={el.id}>
//                             <div className="expense-slider-item__title">{el.name}</div>
//                             <img className="expense-slider-item__img" src={String(el.img)}/>                                           
//                             {el.sum && 
//                                 <div className="expense-slider-item__sum">{el.sum.toLocaleString()} ₽</div>
//                             }
//                         </div>
//                     ) 
//                 })}
//             </div>
//         }
//         </>
        
//     )
// }