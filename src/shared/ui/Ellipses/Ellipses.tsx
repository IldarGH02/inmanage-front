import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Buttons/Button.tsx";
import { observer } from "mobx-react-lite";
import { Context } from "../../../main.tsx";


interface IEllipses {
    classNameContainer: string
    classNameDots: string
    classNameEditLink: string
    classNameRemoveButton: string
    classNameActions: string
}

export const Ellipses: FC<IEllipses> = observer((
    {
        classNameContainer,
        classNameDots,
        classNameEditLink,
        classNameRemoveButton,
        classNameActions
    }) => {

    const { transportStore } = useContext(Context).rootStore

    return (
        <div className={classNameContainer}>
            <span
                className={classNameDots}
            >
                ...
            </span>

            <div className={classNameActions}>
                <Link
                    to="edit"
                    className={classNameEditLink}
                >
                    Редактировать
                </Link>
                <Button
                    className={classNameRemoveButton}
                    onClick={() => transportStore.setShowDelete(true)}
                    name='Удалить'
                    textButton='Удалить'
                />
            </div>
        </div>
    )
})