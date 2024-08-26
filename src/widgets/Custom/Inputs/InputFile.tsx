import { observer } from "mobx-react-lite"
import { ChangeEventHandler, FC } from "react"

interface IInputFile {
    onChange: ChangeEventHandler<HTMLInputElement>
    value: string
}

export const InputFile: FC<IInputFile> = observer(({onChange, value}) => {
    return (
        <input 
            type="file" 
            accept="image/png, image/jpeg" 
            className="input__file" 
            onChange={onChange}
            placeholder="Прикрепить фото"
            value={value}
        />
    )
})