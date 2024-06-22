import { FC } from "react"
import { IncomeJob } from "../../../entities/Balance/IncomeBalance/IncomeJob/IncomeJob"
import { ExpenseList } from "../../../app/types/balance/IBalance"

interface IProjectCategory {
    setCommentJob: (text: string) => void,
    data: ExpenseList,
    handleClick: (id: number) => void,
}

export const IncomeProjectCategories: FC<IProjectCategory> = ({setCommentJob, handleClick, data}) => {
    return (
        <div className="income__project-categories">
            <h3 className="income__category-title project-title">С какого проекта?</h3>
                <IncomeJob 
                    setTextArea={()=>null} 
                    data={data} 
                    onClickPosition={handleClick} 
                    // onAddPosition={addPositionProject}
                />
        </div>
    )
}