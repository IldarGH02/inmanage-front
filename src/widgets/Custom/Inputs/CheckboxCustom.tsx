import { Checkbox } from "@mui/material"
import { ChangeEvent, FC } from "react"
import "./CheckBoxCustom.scss"
import { observer } from "mobx-react-lite"

interface CheckboxCustom {
    checkboxName: string
    setChecked: (bool: boolean) => void
}

export const CheckboxCustom: FC<CheckboxCustom> = observer((
    {
        checkboxName,
        setChecked,
    }) => {

    const handleChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked
        setChecked(checked)
    }
    
    return (
        <div className={`checkbox__container`}>
            <h4 className="checkbox__name">
                {checkboxName}
            </h4>
            <Checkbox
                className="checkbox__input"
                onChange={handleChangeChecked}
            />
        </div>
    )
})