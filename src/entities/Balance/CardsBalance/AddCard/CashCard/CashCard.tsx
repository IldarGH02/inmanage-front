import { useEffect, useState } from "react"
import "./cashCard.css"
// import { IAssetsTransport } from "../../../../../app/types/actives/transport/ITransport"
import { InputText } from "../../../../../shared/ui/input/InputText/InputTextTest"
import { InputSum } from "../../../../../shared/ui/input/InputSum/InputSumTest"

// interface ICashCard {
//     onChangeBtnVisible: (flag: boolean) => void,
//     onChangeValues: (obj: IAssetsTransport) => void,
//     data: IAssetsTransport
// }

export function CashCard() {
    const [valueName, setValueName] = useState('')
    const [alertName, setAlertName] = useState('')
    const [valueSum, setValueSum] = useState('')
    const [alertSum, setAlertSum] = useState('')

    useEffect(()=>{
        // setValueName(data.vin)
        // setValueSum(data.use)
        console.log(alertName)
        console.log(alertSum)
    },[])

    // useEffect(()=>{
    //     data.use = valueUse
    //     data.vin = valueVIN
    //     data.name = modelSelector
    //     data.brand = brandSelector
    //     onChangeValues(data)
    //     if(alertUse==='' && valueVIN!=='' && alertVIN==='' && brandSelector!=='' && modelSelector!=='') {
    //         onChangeBtnVisible(true)
    //     }
    //     else {
    //         onChangeBtnVisible(false)
    //     }
    // },[valueName,valueSum])

    return (
        <div className="cash-card">
            <div className="property-add__item">
                <div className="property-add__name">Наименование<b>*</b></div>
                <InputText length={30} value={valueName} attentionFlag={false} setValue={setValueName} setAlert={setAlertName}/>
            </div>
            <div className="property-add__item">
                <div className="property-add__name">Количество средств<b>*</b></div>
                <InputSum length={10} value={valueSum} setValue={setValueSum} setAlert={setAlertSum}/>
            </div>
        </div>
    )
}