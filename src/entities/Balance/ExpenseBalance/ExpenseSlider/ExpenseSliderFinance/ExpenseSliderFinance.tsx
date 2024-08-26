// import { useEffect, useState } from "react";
// import "./expenseSliderFinance.css";
// import { ExpenseSlider } from "../ExpenseSlider";
// import { Card, IExpenseSlider } from "../../../../../app/types/balance/IBalance";

// import cash from '../../../../../shared/assets/img/balance/addExpense/cashB.png'

// interface IExpenseSliderFinance {
//     favoriteCards: Card[],
//     showAddCardModal: ()=>void,
//     onClickItem: (id: number|null)=>void
// }

// export function ExpenseSliderFinance({favoriteCards, onClickItem, showAddCardModal}: IExpenseSliderFinance) {
//     const [arrFinance, setArrFinance] = useState<IExpenseSlider[]>([])

//     useEffect(()=>{
//         const arrFinanceTmp = favoriteCards.map(el=>{
//             return {
//                 id: el.id!,
//                 name: el.name,
//                 img: cash,
//                 sum: el.loan?((el.limit && el.limit>0)?el.limit-el.remainder:el.remainder):el.remainder,
//             }
//         })
//         setArrFinance(arrFinanceTmp)
//     }, [favoriteCards])

//     const clickItem = (id?: number|null) => {
//         if(id===null||id) {
//             onClickItem(id)
//         } else {
//             showAddCardModal()
//         }
//     }

//     return (
//         <ExpenseSlider data={arrFinance} idItems="finance-slider" onClickItem={clickItem}/>
//     )
// }