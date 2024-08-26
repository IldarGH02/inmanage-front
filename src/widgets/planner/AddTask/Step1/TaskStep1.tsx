import { useEffect, useState } from "react"
import "./taskStep1.css"
import { InputText } from "../../../../shared/ui/input/InputText/InputTextTest" 
import { ITodoDTO } from "../../../../app/types/dto/planner/projects/IProject"
import { InputTextArea } from "../../../../shared/ui/input/InputTextArea/InputTextArea" 

interface ITaskStep1 {
    onChangeBtnVisible: (flag: boolean) => void,
    onChangeValues: (obj: ITodoDTO) => void,
    data: ITodoDTO
}

export function TaskStep1({onChangeBtnVisible, onChangeValues, data}:ITaskStep1) {
    const [valueName, setValueName] = useState('')
    const [alertName, setAlertName] = useState('')
    const [valueDesc, setValueDesc] = useState('')
    const [alertDesc, setAlertDesc] = useState('')

    useEffect(()=>{
        setValueName(data.title)
        setValueDesc(data.description)
    },[])

    useEffect(()=>{
        data.title = valueName
        data.description = valueDesc
        onChangeValues(data)
        if(valueName!=='' && alertName==='' && alertDesc==='') {
            onChangeBtnVisible(true)
        }
        else {
            onChangeBtnVisible(false)
        }
    },[valueName,valueDesc])
    
    return (
        <div className="property-add">
            <div className="property-add__item">
                <div className="property-add__name">Название<b>*</b></div>
                <InputText length={30} value={valueName} attentionFlag={true} setValue={setValueName} setAlert={setAlertName}/>
            </div>
            <div className="property-add__item">
                <div className="property-add__name">Описание</div>
                <InputTextArea length={200} value={valueDesc} attentionFlag={true} setValue={setValueDesc} setAlert={setAlertDesc}/>
            </div>
        </div>
    )
}