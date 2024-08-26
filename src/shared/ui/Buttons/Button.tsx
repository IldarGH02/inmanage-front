import React, { FC, ReactNode } from "react"

interface IButton {
    className: string
    type?: "submit" | "reset" | "button" | undefined
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    textButton: string | ReactNode
    name: string
    disabled?: boolean
}

export const Button: FC<IButton> = (
    {
        className,
        type,
        onClick,
        textButton,
        name,
        disabled
    }) => {
    return (
        <button 
            className={className}
            type={type}
            onClick={onClick}
            name={name}
            disabled={disabled}
        >
            {textButton}
        </button>
    )
}