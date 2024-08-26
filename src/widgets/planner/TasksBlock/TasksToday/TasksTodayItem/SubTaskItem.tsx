import { Daw } from "../../../../elements/Daw/daw"
import { useDispatch } from "react-redux"
import { IListItem } from "../../../../../app/types/planner/IPlanner"
import { actionTypes } from "../../../../../app/store/types/types"
import { editDawInnerTask } from "../../../../../app/store/actions/diaryActions"

interface ISubTaskItem {
    data: IListItem, 
    id: number
}

export function SubTaskItem({data, id}: ISubTaskItem) {
    const dispatch = useDispatch()
    
    const changeDaw = ()=> {
        const res = editDawInnerTask(actionTypes.EDIT_DAW_INNER_TASK, id, data.id!)
        res.then(e => {
            // console.log(e)
            dispatch(e!);
        })
        .catch((e) => {
            console.log(e)
        })
    }

    return (
        <div className={`subtask-item${data.done?'--active':''}`}>
            <div className="subtask-item__title">Сходить за молоком</div>
            <div className="subtask-item__daw">
                <Daw onChangeDaw={changeDaw} dawActive={data.done}/>
            </div>
        </div>
    )
}