import { IStep, Status } from "../../../../app/types/steps";

export let registerSteps: IStep[] = [
    {
        header: "Шаг 1",
        id: 1,
        status: Status.active
    },
    {
        header: "Шаг 2",
        id: 2,
        status: Status.inactive
    },
    {
        header: "Шаг 3",
        id: 3,
        status: Status.inactive
    },
    {
        header: "Шаг 4",
        id: 4,
        status: Status.inactive
    }
]