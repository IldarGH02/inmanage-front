import React from "react"
import "./dawIncomeBalance.css"

interface IDaw {
    dawActive: boolean,
    onChangeDaw: ()=>void,
    color?: string
}

export function DawIncomeBalance({dawActive, onChangeDaw, color = 'rgb(105, 205, 30)'}: IDaw) {
    // const [checkboxValue, setCheckboxValue] = useState(dawActive)
    // const [classTitle, setClassTitle] = useState(!dawActive?'daw__item-title':'daw__item-title--active')

    return (
        <span className="daw-income-balance">
            <label className="daw-income-balance__item-label-btn">
                <input type="checkbox" checked={dawActive} onChange={()=>{
                    // setCheckboxValue(!checkboxValue)
                    onChangeDaw()
                }}/>
                <span style={{
                    border: `3px solid ${color}`,
                }}></span>
            </label>
        </span>
    )
}