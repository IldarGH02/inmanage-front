import React, { FC } from "react"
import { observer } from "mobx-react-lite"

interface IAuthForm {
    className: string,
    id: string,
    children: React.ReactNode
}

export const AuthForm: FC<IAuthForm> = observer(({className, id, children}) => { 
    return (
        <form action='#' id={id} className={className} onSubmit={(e:React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
            {children}
        </form>
    )
})