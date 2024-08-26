import { FC } from "react"

interface IIncomeOption {
    type: string
    classNameOption: string
}

export const IncomeOption: FC<IIncomeOption> = ({type, classNameOption}) => {
    return (
        <option className={classNameOption}>{type}</option>
    )
}