import { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Buttons/Button.tsx";
import { observer } from "mobx-react-lite";


interface IEllipses {
    classNameContainer: string
    classNameDots: string
    classNameEditLink: string
    classNameRemoveButton: string
    classNameActions: string
    setShow: (bool: boolean) => void
}

export const Ellipses: FC<IEllipses> = observer((
    {
        classNameContainer,
        classNameDots,
        classNameEditLink,
        classNameRemoveButton,
        classNameActions,
        setShow
    }) => {

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
                    onClick={()=>setShow(true)}
                    name='Удалить'
                    textButton='Удалить'
                />
            </div>
        </div>
    )
})