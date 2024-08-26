import { useState } from "react";
import "./categories.css"

interface ICategories {
    categories: string[], 
    onChangeCategory: (i:number) => void ,
    categoryActive: number
}

export function Categories({categories, onChangeCategory, categoryActive}: ICategories) {
    const [activeCategor, setActiveCategor] = useState(categoryActive)

    const changeCategory = (index: number) => {
        setActiveCategor(index)
        onChangeCategory(index)
    }

    return (
        <div className="categories">
            <ul>
                {categories.map((name, i) => {
                    return <li className={activeCategor === i ? 'active' : ''} onClick={()=>changeCategory(i)} key={i}>{name}</li>
                })}
            </ul>
        </div>
    )
}
