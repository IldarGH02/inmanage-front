import React from "react";
import "./expensesAddBlock.css";
import { IExpenseListBlock } from "../../../../app/types/balance/IBalance";
import { InputBalanceAddItem } from "../../InputBalanceAddItem/InputBalanceAddItem";

interface IExpensesAddBlock {
    data: IExpenseListBlock[],
    onAddPosition: (val: string) => void,
    onRemovePosition: (id: number) => void,
    onClickPosition: (id: number) => void
}

export function ExpensesAddBlock({data, onAddPosition, onRemovePosition, onClickPosition}: IExpensesAddBlock) {

    return (
        <div className="expenses-add-block">
            <InputBalanceAddItem onAddItem={onAddPosition} placeholder="Добавить новое"/>
            <div className="expenses-add-block__list">
                {data.map(el=>{
                    return (
                        <div className="expenses-add-block-item" key={el.id}>
                            <div className={`expenses-add-block-item__title${el.active?'--active':''}`} onClick={()=>onClickPosition(el.id)}>{el.name}</div>
                            {!el.active && 
                                <button className="expenses-add-block-item__remove-btn" onClick={()=>onRemovePosition(el.id)}>&#8212;</button>
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
