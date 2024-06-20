import { IStep, Status } from "../../../../app/types/steps"


let steps: IStep[] = [
    {
        header: "Шаг 1",
        id: 1,
        status: Status.done
    },
    {
        header: "Шаг 2",
        id: 2,
        status: Status.active
    },
    {
        header: "Шаг 3",
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