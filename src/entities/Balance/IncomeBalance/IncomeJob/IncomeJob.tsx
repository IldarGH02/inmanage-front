import React, { useState } from "react";
import "./incomeJob.css";
import { InputBalanceAddItem } from "../../InputBalanceAddItem/InputBalanceAddItem";
import { IExpenseListBlock } from "../../../../app/types/balance/IBalance";
import { DawIncomeBalance } from "../../../../widgets/elements/Daw/DawIncomeBalance/DawIncomeBalance"; 

interface IIncomeJob {
    data: IExpenseListBlock[],
    setTextArea: (text: string)=>void,
    onAddPosition: (name: string) => void,
    onClickPosition: (id: number) => void
}

export function IncomeJob({data, setTextArea, onAddPosition, onClickPosition}: IIncomeJob) {
    const [text, setText] = useState('')
    const [errorVisible, setErrorVisible] = useState(false)
    
    const changeDaw = (id: number)=> {
        onClickPosition(id)
    }

    return (
        <div className="income-job">
            <div className="income-job__list">
                {data.length===0 && 
                    <div className="income-job__list-empty">Список пуст</div>
                } 
                {data.length!==0 && data.map(el=>{
                    return (
                        <div className="income-job-item" key={el.id}>
                            <div className="income-job-item__title">{el.name}</div>
                            <div className="income-job-item__daw">
                                <DawIncomeBalance color="rgb(200, 200, 200)" onChangeDaw={()=>changeDaw(el.id)} dawActive={el.active}/>
                            </div>
                        </div>
                    )
                })}
            </div>
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