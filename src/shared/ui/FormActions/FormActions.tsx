import { FC, MouseEventHandler } from "react"
import { Button } from "../Buttons/Button"
import "./FormActions.scss"

interface IFormActions {
    onCancel: MouseEventHandler<HTMLButtonElement>
    onSubmit: MouseEventHandler<HTMLButtonElement>
}

export const FormActions: FC<IFormActions> = ({
    onCancel,
    onSubmit
}) => {
    return (
        <div className="form__actions">
            <Button
                className='form__actions-cancel'
                textButton='Отменить'
                name='cancel'
                type='button'
                onClick={onCancel}
            />
            <Button
                className='form__actions-submit'
                textButton='Подтвердить'
                name='submit'
                type='submit'
                onClick={onSubmit}
            />
        </div>
    )
}