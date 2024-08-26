import {ChangeEventHandler, FC, KeyboardEventHandler} from "react";

interface InputSchema {
    placeholder: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
    value: string | number,
    type: string,
    onKeyUp?: KeyboardEventHandler<HTMLInputElement>,
    className: string
}

export const Input: FC<InputSchema> = (
    {
        placeholder,
        onChange,
        type,
        value,
        onKeyUp,
        className
    }) => {
        
    return (
        <input
            placeholder={placeholder}
            onChange={onChange}
            type={type}
            value={value}
            onKeyUp={onKeyUp}
            className={className}
        />
    )
}