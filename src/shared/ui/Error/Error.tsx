import {observer} from "mobx-react-lite";
import {FC} from "react";

interface IError {
    message: string;
}

export const Error: FC<IError> = observer(({message}) => {
    return <p className='error_text'>{message}</p>
})