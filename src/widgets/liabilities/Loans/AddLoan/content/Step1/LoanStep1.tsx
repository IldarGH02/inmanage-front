import { useEffect, useState } from "react"
import "./loanStep1.css"
import { InputText } from "../../../../../../shared/ui/input/InputText/InputTextTest"

interface IPropertyStep1 {
    onChangeBtnVisible: (flag: boolean) => void,
    onChangeValues: (obj: any) => void,
    data: any
}

export function LoanStep1({onChangeBtnVisible, onChangeValues, data}:IPropertyStep1) {
    const [valueName, setValueName] = useState('')
    const [alertName, setAlertName] = useState('')
    // const [valueAdress, setValueAdress] = useState('')
    // const [alertAdress, setAlertAdress] = useState('')
    // const [valueOwner, setValueOwner] = useState('')
    // const [alertOwner, setAlertOwner] = useState('')

    useEffect(()=>{
        setValueName(data.name)
    },[])

    // useEffect(()=>{
    //     let obj = {
    //         name: valueName,
    //         address: valueAdress,
    //         owner: valueOwner
    //     }
    //     return ()=> {
    //         onChangeValues(obj)
    //         console.log(obj)
    //     }
    // },[])

    useEffect(()=>{
        data.name = valueName
        // data.address = valueAdress
        // data.owner = valueOwner
        onChangeValues(data)
        if(valueName!=='' && alertName==='') {
            onChangeBtnVisible(true)
            // data.name = valueName
            // data.address = valueAdress
            // data.owner = valueOwner
            // onChangeValues(data)
        }
        else {
            onChangeBtnVisible(false)
        }
    },[valueName])
    
    return (
        <div className="property-add">
            <div className="property-add__item">
                <div className="property-add__name">Название<b>*</b></div>
                <InputText length={30} value={valueName} attentionFlag={true} setValue={setValueName} setAlert={setAlertName}/>
            </div>
        </div>
    )
}