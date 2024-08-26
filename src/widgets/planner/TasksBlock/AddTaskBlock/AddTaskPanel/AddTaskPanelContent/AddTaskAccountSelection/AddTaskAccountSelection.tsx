import { useEffect, useState } from "react";
import "./addTaskAccountSelection.css"
import { IExpenseSliderCategory } from "../../../../../../../app/types/balance/IBalance";
import { AccountSelection } from "./AccountSelection";
import { IPlannerTaskAdd } from "../../../../../../../app/types/planner/IPlanner";

interface IAddTaskAccountSelection {
    data: IPlannerTaskAdd,
    onChangeTaskAdd: (obj: IPlannerTaskAdd) => void 
}

export function AddTaskAccountSelection({data, onChangeTaskAdd}: IAddTaskAccountSelection) {
    const [valueDDList, setValueDDList] = useState('')
    const [positionOfCategory] = useState<IExpenseSliderCategory[]>([]) //setPositionOfCategory
    
    useEffect(()=>{
        const taskTmp = {...data}
        // if()
        onChangeTaskAdd(taskTmp)
    }, [valueDDList])

    return (
        <div className="add-task-account-selection">
            <div className="add-task-account-selection__title">Выбор счета:</div>
            <div className="add-task-account-selection__account-selection">
                <AccountSelection data={positionOfCategory} setValue={setValueDDList} value={valueDDList} placeholder={'Выберите счёт'}/>
            </div>
        </div>
    )
}