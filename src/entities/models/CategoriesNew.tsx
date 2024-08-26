// import { CategoriesItems } from "../../widgets/Balance/Income/CategoriesItems/CategoriesItems.tsx";
// import { InputSum } from "../Balance/ExpenseBalance/InputSum/InputSum.tsx";
// import { ExpenseSliderFinance } from "../Balance/ExpenseBalance/ExpenseSlider/ExpenseSliderFinance/ExpenseSliderFinance.tsx";
// import { FC } from "react";
// import { Card } from "../../app/types/balance/IBalance.ts";
// import { observer } from "mobx-react-lite";
// import {ChooseJobOtherNew} from "../../widgets/Balance/Income/ChangeJobOther/ChangeJobOtherNew.tsx";

// interface ICategories {
// }

// export const Categories: FC<ICategories>  = observer((
//     {

//     }) => {
//     return (
//         <div className="income__modal-categories">
//             <div className="categories__choose">
//                 <CategoriesItems
//                     categories={categories}
//                     chooseCategory={chooseCategory}
//                     onChangeCategory={onChangeCategory}
//                     classNameCategories="balance__categories"
//                     onClick={onClick}
//                 />
//                 <InputSum
//                     value={value}
//                     length={length}
//                     setValue={setValue}
//                     setErrorInput={setErrorInput}
//                 />
//             </div>
//             <div className="categories__choose-account">
//                 <h2 className="income__finance-title">Куда зачислить?</h2>
//                 <ExpenseSliderFinance
//                     onClickItem={onClickItem}
//                     favoriteCards={favoriteCards}
//                     showAddCardModal={showAddCardModal}
//                 />
//             </div>
//             <ChooseJobOtherNew
//                 active={}
//                 handleChoose={() => {}}
//             />
//         </div>
//     )
// })