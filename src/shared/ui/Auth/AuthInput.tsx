import React, { FC, Ref } from "react";

interface IAuthInput {
    className: string,
    placeholder: string,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value: string | undefined,
    type: string
    ref?: Ref<HTMLInputElement>
    required?: boolean
    pattern?: string

}

export const AuthInput: FC<IAuthInput> = (
    {   
        className, 
        placeholder, 
        handleChange, 
        value, 
        type, 
        required, 
        pattern,
        ref
    }) => {
    return (
        <input 
            className={className} 
            placeholder={placeholder} 
            onChange={handleChange} 
            value={value}
            type={type}
            ref={ref}
            required={required}
            pattern={pattern}
        />
    )
}