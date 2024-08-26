import { ChangeEventHandler, FC } from "react"
import { TextField } from "@mui/material"
import "./InputText.scss"

interface InputTextParams {
    placeholder: string
    value: string
    onChange: ChangeEventHandler<HTMLInputElement>
    type: string
}

export const InputText: FC<InputTextParams> = (
    {
        placeholder,
        value,
        type,
        onChange
    }) => {

    return (
        <TextField
            label={placeholder}
            type={type}
            value={value}
            onChange={onChange}
            className='input__text'
        />
    )
}