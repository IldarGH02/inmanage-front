import {Button} from "../../../../shared/ui/Buttons/Button.tsx";
import {FC} from "react";

interface IChangeJobOther {
    handleChoose: React.MouseEventHandler<HTMLButtonElement>;
    active: string
}

export const ChangeJobOtherNew: FC<IChangeJobOther> = (
    {
        handleChoose,
        active
    }) => {
    return (
        <div className="categories__choose-job_other">
            <Button
                className={`categories__choose-button_job choose_button ${active}`}
                onClick={handleChoose}
                textButton="Работа"
                name="Работа"
            />
            <Button
                className={`categories__choose-button_other choose_button ${active}`}
                onClick={handleChoose}
                textButton="Другое"
                name="Другое"
            />
        </div>
    )
}