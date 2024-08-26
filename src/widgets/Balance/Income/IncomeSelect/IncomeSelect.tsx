import { FC } from "react"
import { IncomeOption } from "./IncomeOption"

interface IIncomeSelect {
    types: string[]
    classNameSelect: string
    classNameOption: string
    labelClassName: string
}

export const IncomeSelect: FC<IIncomeSelect> = ({types, labelClassName, classNameSelect, classNameOption}) => {
    return (
        <label className={labelClassName}>
            Тип занятости
            <select className={classNameSelect}>
                {types.map((type) => {
                    return <IncomeOption classNameOption={classNameOption} type={type} key={type}/>
                })}
            </select>
        </label>
    )
}