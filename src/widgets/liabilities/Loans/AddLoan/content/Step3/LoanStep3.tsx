import { useEffect, useState } from "react"
// import "./loanStep3.css"
import Calendar from "../../../../../Calendar/Calendar"
import { InputSum } from "../../../../../../shared/ui/input/InputSum/InputSumTest"

interface ILoanStep3 {
    onChangeBtnVisible: (flag: boolean) => void, 
    onChangeValues: (obj: any)=>void, 
    data: any
}

export function LoanStep3({onChangeValues, onChangeBtnVisible, data}: ILoanStep3) {
    const [valueDate, setValueDate] = useState(data.date)
    const [insuranceVal, setInsuranceVal] = useState(data.insurance)
    const [valueSum, setValueSum] = useState(discharge(String(data.insurance_sum)))
    const [alertSum, setAlertSum] = useState('')

    useEffect(()=>{
        if((insuranceVal && valueSum!=='' && valueSum!=='0' && alertSum==='')||(!insuranceVal)) {
            onChangeBtnVisible(true)
        }
        else {
            onChangeBtnVisible(false)
        }
        data.date = valueDate
        data.insurance = insuranceVal
        data.insurance_sum = insuranceVal ? Number(valueSum.replace(/ /g,'')) : 0
        onChangeValues(data)
    },[insuranceVal, valueDate, valueSum])

    const clickDate = (date:string) => {
        setValueDate(date)
    }

    ////////////
    function discharge(str:string): string {
        return str.replace(/[^0-9.]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }
    ////////////
    
    return (
        <div className="property-add">
            <div className="property-add__item">
                <div className="property-add__name">Дата</div>
                <Calendar onCickCalendar={clickDate}/>
            </div>
            <div className="property-add__item">
                <div className="property-add__name">Наличие страховки</div>
                <div className="property-add__item-container">
                    <div className="property-add__rb">
                        <input type="radio" id="rb1" checked={!insuranceVal} onChange={()=>{
                            setInsuranceVal(false)
                        }}/>
                        <label htmlFor="rb1">нет</label>
                    </div>
                    <div className="property-add__rb">
                        <input type="radio" id="rb2" checked={insuranceVal} onChange={()=>{
                            setInsuranceVal(true)
                        }}/>
                        <label htmlFor="rb2">да</label>
                    </div>
                    {insuranceVal && 
                        <div className="property-add__item">
                            <div className="property-add__name">Стоимость страховки<b>*</b></div>
                            <InputSum length={10} value={valueSum} setValue={setValueSum} setAlert={setAlertSum}/>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}