import { Button } from "../../../../../shared/ui/Buttons/Button"

export const RemoveBlock = () => {
    return (
        <div className="remove__block">
            <h3 className="remove__block-title">Вы действительно хотите удалить?</h3>
            <Button
                onClick={() => {}}
                textButton="Удалить"
                className=""
                type="button"
                name='remove'
            />
        </div>
    )
}