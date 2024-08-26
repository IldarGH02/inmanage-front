import {Button} from "../../../../shared/ui/Buttons/Button.tsx";
import {FC} from "react";

interface IChangeJobOther {
    handleChooseJob: React.MouseEventHandler<HTMLButtonElement>;
    handleChooseOther: React.MouseEventHandler<HTMLButtonElement>;
    activeJob: string
    activeOther: string
}

export const ChangeJobOther: FC<IChangeJobOther> = (
    {
        handleChooseJob,
        handleChooseOther,
        activeJob,
        activeOther
    }) => {
    return (
        <div className="categories__choose-job_other">
            <Button
                className={`categories__choose-button_job choose_button ${activeJob}`}
                onClick={handleChooseJob}
                textButton="Работа"
                name="Работа"
            />
            <Button
                className={`categories__choose-button_other choose_button ${activeOther}`}
                onClick={handleChooseOther}
                textButton="Другое"
                name="Другое"
            />
        </div>
    )
}