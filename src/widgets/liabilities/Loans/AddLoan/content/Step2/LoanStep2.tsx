import { useEffect, useState } from "react"
import "./loanStep2.css"
import { InputSum } from "../../../../../../shared/ui/input/InputSum/InputSumTest"
import { InputPercent } from "../../../../../../shared/ui/input/inputPercent/InputPercent"
import { InputTimeCredit } from "../../../../../../shared/ui/input/inputTimeCredit/InputTimeCredit"

interface ILoanStep2 {
    onChangeBtnVisible: (flag: boolean) => void,
    onChangeValues: (obj: any) => void,
    data: any
}

export function LoanStep2({onChangeBtnVisible, onChangeValues, data}:ILoanStep2) {
    const [valueSumCredit, setValueSumCredit] = useState(discharge(String(data.sum)))
    const [valueTimeCredit, setValueTimeCredit] = useState(discharge(String(data.loan_term)))
    const [valuePercentCredit, setValuePercentCredit] = useState(Number.isInteger(data.percentage)?String(data.percentage)+'.00':String(data.percentage))
    const [valueMaintenanceCost, setValueMaintenanceCost] = useState<string>(discharge(String(data.maintenance_cost)))

    const [textAlertSumCredit, setTextAlertSumCredit] = useState('')
    const [textAlertMaintenanceCost, setTextAlertMaintenanceCost] = useState('')
    const [textAlertTimeCredit, setTextAlertTimeCredit] = useState('')

    // const [visibleCredit, setVisibleCredit] = useState(data.credit_indicator!)


    ////////////
    function discharge(str:string): string {
        return str.replace(/[^0-9.]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }
    ////////////

    useEffect(()=>{
        // console.log(Number.isNaN(valuePriceBuy))
        // if(Number.isNaN(valuePriceBuy)) {
            let dataTmp = data
            dataTmp.sum = Number(valueSumCredit.replace(/ /g,''))
            dataTmp.maintenance_cost = Number(valueMaintenanceCost.replace(/ /g,''))
            dataTmp.loan_term = Number(valueTimeCredit.replace(/ /g,''))
            dataTmp.percentage = Number(valuePercentCredit)
            onChangeValues(dataTmp)
            if(valueMaintenanceCost!=='' && valueSumCredit!=='' && valueSumCredit!=='0' && valueTimeCredit!=='' && valueTimeCredit!=='0' && textAlertSumCredit==='' && textAlertMaintenanceCost==='' && textAlertTimeCredit==='') {
                onChangeBtnVisible(true)
            }
            else {
                onChangeBtnVisible(false)
            }
        // }
        
    },[valueMaintenanceCost,valueTimeCredit,valuePercentCredit,valueSumCredit])
    
    return (
        <div className="property-add">
            <div className="property-add__item">
                <div className="property-add__name">Сумма кредита/займа<b>*</b></div>
                <InputSum length={10} value={valueSumCredit} setValue={setValueSumCredit} setAlert={setTextAlertSumCredit}/>
            </div>
            <div className="property-add__item">
                <div className="property-add__credit-block">
                    <div className="credit-block">
                        <div className="credit-block__item-container">
                            <div className="credit-block__item">
                                <div className="credit-block__label">Срок кредитования<b>*</b></div> 
                                {/* <input type="text" value={valueTimeCredit} onChange={changeTimeCredit}  onKeyUp={()=>setValueTimeCredit(discharge(valueTimeCredit))}></input> <b>мес.</b> */}
                                <InputTimeCredit value={valueTimeCredit} setValue={setValueTimeCredit} setAlert={setTextAlertTimeCredit}/>
                            </div>
                            <div className="credit-block__item">
                                <div className="credit-block__label">Процентная ставка<b>*</b></div> 
                                <InputPercent value={valuePercentCredit} setValue={setValuePercentCredit}/>
                            </div>
                        </div>
                        <div className="credit-block__item">
                            <div className="credit-block__label">Стоимость обслуживания<b>*</b></div> 
                            <InputSum length={10} value={valueMaintenanceCost} setValue={setValueMaintenanceCost} setAlert={setTextAlertMaintenanceCost}/>
                        </div>
                    </div>
                </div>     
            </div>
            
            
        </div>
    )
}