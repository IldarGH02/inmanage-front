import { FC, MouseEventHandler } from "react"
import { Button } from "../../../shared/ui/Buttons/Button"
import { observer } from "mobx-react-lite"
import "./DeletePopup.scss"

interface IDeleteProps {
    over: boolean
    onMouseOut: MouseEventHandler<HTMLDivElement>
    onMouseOver: MouseEventHandler<HTMLDivElement>
    handleRemove: MouseEventHandler<HTMLButtonElement>
}

export const DeletePopup: FC<IDeleteProps> = observer(({over, onMouseOut, onMouseOver, handleRemove}) => {

    return (
        <div className={`delete__popup ${over ? 'active' : ''}`} onMouseOut={onMouseOut} onMouseOver={onMouseOver}>
            <h3 className="delete__popup-title">Удаление</h3>
            <Button
                onClick={handleRemove}
                className="delete__popup-button"
                textButton="Удалить"
                name="delete"
            />
        </div>
    )
})