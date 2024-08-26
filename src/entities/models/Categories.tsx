import { CategoriesItems } from "../../widgets/Balance/Income/CategoriesItems/CategoriesItems.tsx";
import { InputSum } from "../Balance/ExpenseBalance/InputSum/InputSum.tsx";
// import { ExpenseSliderFinance } from "../Balance/ExpenseBalance/ExpenseSlider/ExpenseSliderFinance/ExpenseSliderFinance.tsx";
import { FC } from "react";
import { Card } from "../../app/types/dto/DtoTypes.ts"; 
import { observer } from "mobx-react-lite";
import {ChangeJobOther} from "../../widgets/Balance/Income/ChangeJobOther/ChangeJobOther.tsx";

interface ICategories {
    value: string,
    length: number,
    choose: React.MouseEventHandler<HTMLButtonElement>,
    setValue: (str: string)=>void,
    setErrorInput: (str: string) => void,
    categories: string[],
    otherCategories: string[],
    onChangeCategory: (value: number) => void,
    chooseCategory: number,
    favoriteCards: Card[],
    showAddCardModal: ()=>void,
    onClickItem: (id: number|null)=>void
    activeJob: boolean
    activeOther: boolean
    onClick: React.MouseEventHandler<HTMLElement>
}

export const Categories: FC<ICategories>  = observer((
    {
        value,
        length,
        setValue,
        setErrorInput,
        categories,
        // otherCategories,
        onChangeCategory,
        choose,
        chooseCategory,
        // favoriteCards,
        // showAddCardModal,
        // onClickItem,
        activeJob,
        activeOther,
        onClick
    }) => {
    return (
        <div className="income__modal-categories">
            <div className="categories__choose">
                <CategoriesItems
                    categories={categories}
                    chooseCategory={chooseCategory}
                    onChangeCategory={onChangeCategory}
                    classNameCategories="balance__categories"
                    onClick={onClick}
                />
                <InputSum
                    value={value}
                    length={length}
                    setValue={setValue}
                    setErrorInput={setErrorInput}
                />
            </div>
            <div className="categories__choose-account">
                <h2 className="income__finance-title">Куда зачислить?</h2>
                {/* <ExpenseSliderFinance
                    onClickItem={onClickItem}
                    favoriteCards={favoriteCards}
                    showAddCardModal={showAddCardModal}
                /> */}
            </div>
            {chooseCategory === 0 && <ChangeJobOther
                handleChooseJob={choose}
                handleChooseOther={choose}
                activeJob={activeJob ? 'active' : ''}
                activeOther={activeOther ? 'active' : ''}
            />}
        </div>
    )
})