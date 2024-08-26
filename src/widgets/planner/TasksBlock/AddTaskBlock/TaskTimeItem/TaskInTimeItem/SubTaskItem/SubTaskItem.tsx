import { Daw } from "../../../../../../elements/Daw/daw"
import { IListItem } from "../../../../../../../app/types/planner/IPlanner"
import { useDispatch } from "react-redux"
import { editDawInnerTask } from "../../../../../../../app/store/actions/diaryActions"
import { actionTypes } from "../../../../../../../app/store/types/types"

interface ISubTaskItem {
    color: string,
    data: IListItem, 
    id: number
}

export function SubTaskItem({color, data, id}: ISubTaskItem | any) {
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
        <div style={{color: data.done?'rgb(203, 203, 205)':color}} className="subtask-item">
            <div className="subtask-item__title">{data.text}</div>
            <div className="subtask-item__daw">
                <Daw onChangeDaw={changeDaw} dawActive={data.done} color={color}/>
            </div>
        </div>
    )
}