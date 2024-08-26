import { FC } from "react"
import { ImageButtonAdd } from "./ImageBattonAdd"

interface IButtonAdd {
    classNameContainer: string // expense-slider-item-btn
    classNameTitle: string // expense-slider-item-btn__title
    classNameButton: string // expense-slider-item-btn__add
    handleClickItem: (id?: number|null)=>void | React.MouseEvent<HTMLButtonElement>,
}

export const ButtonAdd: FC<IButtonAdd> = ({
    classNameButton,
    classNameContainer,
    classNameTitle,
    handleClickItem
}) => {

    return (
        <div className={classNameContainer}>
            <h3 className={classNameTitle}>Добавить</h3>
            <button onClick={()=>handleClickItem()} className={classNameButton}>{<ImageButtonAdd/>}</button>
        </div>
    )
}