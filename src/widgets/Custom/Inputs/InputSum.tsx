import { ChangeEventHandler, FC } from "react";
import { observer } from "mobx-react-lite";
import { TextField } from "@mui/material";
import "./InputSum.scss"

type InputSum = {
    value: string,
    type: string,
    currency: string,
    placeholder: string,
    classNameCurrency: string,
    onChange: ChangeEventHandler<HTMLInputElement>
}

export const InputSum: FC<InputSum> = observer((
    {
        value,
        placeholder,
        classNameCurrency,
        currency,
        onChange
    }) => {

    return (
        <div className="input__sum-container">
            <TextField
                label={placeholder}
                value={value}
                type="text"
                className="input__sum"
                onChange={onChange}
            />
            {value && <span className={classNameCurrency}>{currency}</span>}
        </div>
    )
})