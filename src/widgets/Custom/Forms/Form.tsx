import {FC, FormEventHandler} from "react";
import {observer} from "mobx-react-lite";

type Form = {
    children: React.ReactNode;
    className: string;
    handleSubmit: FormEventHandler
}

export const Form: FC<Form> = observer((
    {
        children,
        className,
        handleSubmit
    }) => {

    return (
        <form className={className} onSubmit={handleSubmit}>
            {children}
        </form>
    )
})