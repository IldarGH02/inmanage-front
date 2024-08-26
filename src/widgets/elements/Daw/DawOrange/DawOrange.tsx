import "./dawOrange.css"

interface IDaw {
    dawActive: boolean,
    onChangeDaw: ()=>void
}

export function DawOrange({dawActive, onChangeDaw}: IDaw) {
    // const [checkboxValue, setCheckboxValue] = useState(false)
    // const [classTitle, setClassTitle] = useState(!dawActive?'daw__item-title':'daw__item-title--active')

    return (
        <span className="daw-orange">
            <label className="daw-orange__item-label-btn">
                <input type="checkbox" checked={dawActive} onChange={()=>{
                    // setCheckboxValue(!checkboxValue)
                    onChangeDaw()
                }}/>
                <span></span>
            </label>
        </span>
    )
}