import { observer } from "mobx-react-lite"
import { ChangeEventHandler, FC } from "react"
import "./InputComment.scss"

interface IInputComment {
    placeholder: string
    onChange: ChangeEventHandler<HTMLTextAreaElement>
    value: string
}

export const InputComment: FC<IInputComment> = observer((
    {
        placeholder,
        onChange,
        value
    }) => {
    return (
        <textarea placeholder={placeholder} className="input__comment" onChange={onChange} value={value}/>
    )
})