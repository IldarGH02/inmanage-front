import { FC } from "react";
import { observer } from "mobx-react-lite";
import { ExpenseList } from "../../../../app/types/balance/IBalance.ts";
import { JobSliderContainer } from "../../../../entities/ui/JobSlider/JobSliderContainer.tsx";

interface IIncomeSubCategories {
    data: ExpenseList,
    fromTitle: string,
    classNameCategory: string,
    classNameTitle: string,
    handleClick: (id?: number|null)=>void,
}

export const IncomeSubCategories: FC<IIncomeSubCategories> = observer((
    {
        data,
        fromTitle,
        classNameCategory,
        classNameTitle,
        handleClick
    }) => {

    return (
        <div className={classNameCategory}>
            <h3 className={classNameTitle}>{fromTitle}</h3>
            <JobSliderContainer
                items={data}
                handleClick={handleClick}
            />
        </div>
    )
})