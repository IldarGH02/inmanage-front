import React from "react"
import "./daw.css"

interface IDaw {
    dawActive: boolean,
    onChangeDaw: ()=>void,
    color?: string
}

export function Daw({dawActive, onChangeDaw, color = 'rgb(105, 205, 30)'}: IDaw) {
    // const [checkboxValue, setCheckboxValue] = useState(dawActive)
    // const [classTitle, setClassTitle] = useState(!dawActive?'daw__item-title':'daw__item-title--active')

    return (
        <span className="daw">
            <label className="daw__item-label-btn">
                <input type="checkbox" checked={dawActive} onChange={()=>{
                    // setCheckboxValue(!checkboxValue)
                    onChangeDaw()
                }}/>
                <span style={{
                    border: `2px solid ${!dawActive?color:'rgb(200, 200, 200)'}`,
                    // backgroundColor: color
                }}></span>
            </label>
        </span>
    )
}