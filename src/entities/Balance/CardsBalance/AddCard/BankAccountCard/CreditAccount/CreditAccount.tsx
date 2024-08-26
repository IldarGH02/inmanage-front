import { useState } from 'react'
import "./creditAccount.css"
import { InputPercent } from '../../../../../../shared/ui/input/inputPercent/InputPercent'
import { InputDayCredit } from '../../../../../../shared/ui/input/inputTimeCredit/InputDayCredit'
import { InputSum } from '../../../../../../shared/ui/input/InputSum/InputSumTest'

export function CreditAccount() {
    // const [valuePercentCredit, setValuePercentCredit] = useState(Number.isInteger(data.percentage)?String(data.percentage)+'.00':String(data.percentage))
    const [valuePercent, setValuePercent] = useState('0.0')
    // const [valueTimeCredit, setValueTimeCredit] = useState(discharge(String(data.loan_term)))
    const [valueTimeCredit, setValueTimeCredit] = useState('')
    const [valueSumCreditLimit, setSumCreditLimit] = useState('')
    const [valueSum, setValueSum] = useState('')

    const [alertTimeCredit, setAlertTimeCredit] = useState('')
    const [alertSum, setAlertSum] = useState('')
    const [alertSumCreditLimit, setAlertSumCreditLimit] = useState('')

    console.log(alertTimeCredit)
    console.log(alertSum)
    console.log(alertSumCreditLimit)

    return (
        <div className="credit-account">
            <div className="property-add__item">
                <div className="property-add__name">Сумма кредитного лимита<b>*</b></div>
                <InputSum length={10} value={valueSumCreditLimit} setValue={setSumCreditLimit} setAlert={setAlertSumCreditLimit}/>
            </div>
            <div className="property-add__item">
                <div className="property-add__name">Текущее количество средств<b>*</b></div>
                <InputSum length={10} value={valueSum} setValue={setValueSum} setAlert={setAlertSum}/>
            </div>
            <div className="credit-block__item-container">
                <div className="credit-block__item">
                    <div className="credit-block__label">Срок кредитования<b>*</b></div> 
                    {/* <input type="text" value={valueTimeCredit} onChange={changeTimeCredit}  onKeyUp={()=>setValueTimeCredit(discharge(valueTimeCredit))}></input> <b>мес.</b> */}
                    <InputDayCredit value={valueTimeCredit} setValue={setValueTimeCredit} setAlert={setAlertTimeCredit}/>
                </div>
                <div className="credit-block__item">
                    <div className="credit-block__label">Процент за просрочку<b>*</b></div> 
                    <InputPercent value={valuePercent} setValue={setValuePercent}/>
                </div>
            </div>
        </div>
    )
}