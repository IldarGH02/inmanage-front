import React, { FC } from "react";
import { observer } from "mobx-react-lite";
import { ExpenseList } from "../../../../app/types/balance/IBalance.ts";
import { JobItems } from "../../JobItems/JobItems.tsx";
import { IncomeForm } from "../IncomeForm/IncomeForm.tsx";

interface IIncomeCategories {
    data: ExpenseList,
    fromTitle: string,
    valueCategory: string,
    valueComment: string
    classNameCategory: string,
    classNameTitle: string,
    placeholder: string
    handleCreate: React.MouseEventHandler<HTMLButtonElement>,
    handleChangeValue: React.ChangeEventHandler<HTMLInputElement>,
    handleChangeComment: React.ChangeEventHandler<HTMLInputElement>,
    handleChangeCheckbox: React.ChangeEventHandler<HTMLInputElement>,
    handleChooseItem: React.MouseEventHandler<HTMLLIElement>
}

export const IncomeCategories: FC<IIncomeCategories> = observer((
    {
        data,
        fromTitle,

        valueCategory,
        valueComment,
        classNameCategory,
        classNameTitle,
        placeholder,


        handleCreate,
        handleChangeValue,
        handleChangeComment,
        handleChangeCheckbox,
        handleChooseItem
    }) => {

    return (
        <div className={classNameCategory}>
            <h3 className={classNameTitle}>{fromTitle}</h3>
            <JobItems
                handleChangeCheckbox={handleChangeCheckbox}
                handleChooseItem={handleChooseItem}
                items={data}
            />
            <IncomeForm
                placeholder={placeholder}
                handleClickCreateWork={handleCreate}
                handleChange={handleChangeValue}
                value={valueCategory}
                textValue={valueComment}
                handleChangeComment={handleChangeComment}
            />
        </div>
    )
})