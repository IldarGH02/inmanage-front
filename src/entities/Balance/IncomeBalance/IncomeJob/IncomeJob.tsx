import { useState } from "react";
import "./incomeJob.css";
import { InputBalanceAddItem } from "../../../../shared/ui/BalanceUi/Income/InputBalanceAddItem";
import { ExpenseList } from "../../../../app/types/balance/IBalance";
import { JobItems } from "../../../../widgets/Balance/JobItems/JobItems";

interface IIncomeJob {
    data: ExpenseList,
    setTextArea: (text: string)=>void,
    onAddPosition: (name: string) => void,
    onClickPosition: (id: number) => void
}
export function IncomeJob({data, setTextArea, onAddPosition, onClickPosition}: IIncomeJob) {
    const [text, setText] = useState('')
    const [errorVisible, setErrorVisible] = useState(false)

    return (
        <div className="income-job">
            <JobItems onClickPosition={onClickPosition} items={data}/>
            <InputBalanceAddItem onAddItem={onAddPosition} placeholder="Добавить новое место работы"/>
            <textarea value={text} onChange={(e)=>{
                setText(e.target.value)
                if(e.target.value.length>200) {
                    setErrorVisible(true)
                    setTextArea('')
                } else {
                    setTextArea(e.target.value)
                }
            }} className="income-job__comment" placeholder="Добавить комментарий"></textarea>
            <div className="income-job__attention">{errorVisible && 'Длина превышена'}</div>
        </div>
    )
}