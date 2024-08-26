
import { Daw } from "../../../../elements/Daw/daw"

export function SubtodoItem() {
    const changeDaw = ()=> {
        // setDawActive(!dawActive)
        // onChangeItem(data.id!)
    }

    return (
        <div className="subtodo-item">
            <div className="subtodo-item__title">Сходить за молоком</div>
            <div className="subtodo-item__daw">
                <Daw onChangeDaw={changeDaw} dawActive={false}/>
            </div>
        </div>
    )
}