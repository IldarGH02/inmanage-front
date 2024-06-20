import { IStep, Status } from "../../../../app/types/steps"


let steps: IStep[] = [
    {
        header: "Информация о транспорте",
        id: 1,
        status: Status.done
    },
    {
        header: "Информация о владельце",
        id: 2,
        status: Status.active
    },
    {
        header: "Цена покупки",
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