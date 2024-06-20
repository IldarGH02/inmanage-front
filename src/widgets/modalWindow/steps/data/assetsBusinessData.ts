import { IStep, Status } from "../../../../app/types/steps"


let steps: IStep[] = [
    {
        header: "Заголовок бизнеса",
        id: 1,
        status: Status.done
    },
    {
        header: "Характеристика бизнеса",
        id: 2,
        status: Status.active
    },
    {
        header: "Стартовые инвестиции",
        id: 3,
        status: Status.inactive
    },
    // {
    //     header: "Finish",
    //     id: 4,
    //     status: Status.inactive
    // }
]

export { steps }