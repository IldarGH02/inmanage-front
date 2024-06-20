import React, { useState } from "react";
import "./expenseCategories.css"

interface ICategories {
    categories: string[], 
    onChangeCategory: (i:number) => void ,
    categoryActive: number
}

export function ExpenseCategories({categories, onChangeCategory, categoryActive}: ICategories) {
    const [activeCategor, setActiveCategor] = useState(categoryActive)

    const changeCategory = (index: number) => {
        setActiveCategor(index)
        onChangeCategory(index)
    }

    return (
        <div className="expense-categories">
            <ul>
                {categories.map((name, i) => {
                    return <li className={activeCategor === i ? 'active' : ''} onClick={()=>changeCategory(i)} key={i}>{name}</li>
                })}
            </ul>
        </div>
    )
}
