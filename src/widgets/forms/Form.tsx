import React, {FC, FormEventHandler} from "react";

interface IForm {
    children?: React.ReactNode;
    onSubmit: FormEventHandler;
    className: string
}

export const Form: FC<IForm> = ({children, onSubmit, className}) => {
    return (
        <form
            onSubmit={onSubmit}
            className={className}
            encType="application/json"
        >
            {children}
        </form>
    )
}