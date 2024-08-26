import { FC } from "react";

interface IAuthButton {
    className: string,
    text: string,
    onClick: () => void,
    type?: "submit" | "reset" | "button" | undefined
    disabled?: boolean
}

export const AuthButton: FC<IAuthButton> = ({className, text, onClick, type, disabled}) => {
    return (
        <button className={className} onClick={onClick} type={type} disabled={disabled}>{text}</button>
    )
}