import { FC } from "react";
import { IncomeSubCategories } from "../../widgets/Balance/Income/IncomeCategories/IncomeCategories.tsx";
// import { Other } from "./Other.tsx";
import { observer } from "mobx-react-lite";
import { ExpenseList } from "../../app/types/balance/IBalance.ts";

interface IJobCreateBlock {
    choose: boolean,
    data: ExpenseList
}

export const JobCreateBlock: FC<IJobCreateBlock> = observer((
    {
        choose,
        data
    }) => {
    return (
        <>
            {
                choose ?
                    <IncomeSubCategories
                        data={data}
                        fromTitle={`С какой работы?`}
                        classNameCategory={`income__job-categories`}
                        classNameTitle={`С какой работы?`}
                        handleClick={() => {}}
                    /> : <></>
                    // <Other
                    //     handleClick={() => {}}
                    //     setValue={() => ''}
                    // />
            }
        </>
    )
})