import { FC } from "react"
import { InputSum } from "../../../widgets/Custom/Inputs/InputSum"
import { InputPercent } from "../../../widgets/Custom/Inputs/InputPercent"
import './CreditParams.scss';
import { InputDate } from "../../../shared/ui/input/InputDate"
import { DateTime } from "luxon"

interface CreditParams {
    setDownPaymentsValue: (value: string) => void
    setDownPaymentError: (value: string) => void
    setMothlyPaymentValue: (value: string) => void
    setMothlyPaymentError: (value: string) => void
    setDateValue: (value: DateTime) => void
    setLoanTermsValue: (value: string) => void
    setLoanTermsError: (value: string) => void
    setPercentValue: (value: string) => void
    setPercentError: (value: string) => void
    downPaymentsValue: string
    monthlyPaymentValue: string
    dateValue: DateTime | null
    loanTermsValue: string
    percentValue: string
}

export const CreditParams: FC<CreditParams> = (
    {
        setDownPaymentsValue,
        downPaymentsValue,
        setMothlyPaymentValue,
        setMothlyPaymentError,
        monthlyPaymentValue,
        setDateValue,
        dateValue,
        setLoanTermsValue,
        loanTermsValue,
        setLoanTermsError,
        setPercentValue,
        setPercentError,
        percentValue
    }) => {
    
    return (
        <div className="credit">
            <InputSum
                setError={setDownPaymentsValue}
                setValue={setDownPaymentsValue}
                value={downPaymentsValue} 
                type="text" 
                currency="₽" 
                placeholder="Первый взнос"
                classNameCurrency="price__sum-currency"         
            />
            <InputSum
                setError={setMothlyPaymentError}
                setValue={setMothlyPaymentValue}
                value={monthlyPaymentValue}
                type="text"
                currency="₽"
                placeholder="Ежемесячный платёж"
                classNameCurrency="price__sum-currency"
            />
            <InputDate 
                onChange={setDateValue} 
                value={dateValue} 
                placeholder="Дата первого платежа"
            />
            {/* <InputText
                type="date"
                setValue={setDateValue}
                value={dateValue}
                className=""
                placeholder="Дата первого платежа"
            /> */}
            <InputSum
                setValue={setLoanTermsValue}
                setError={setLoanTermsError}
                classNameCurrency="price__sum-currency"
                currency={`${loanTermsValue ? '.мес' : ''}`}
                placeholder="Срок кредитования"
                type="text"
                value={loanTermsValue}
            />
            <InputPercent
                setPercentValue={setPercentValue}
                setPercentError={setPercentError}
                classNameCurrency="price__sum-currency"
                currency={`${percentValue ? '%' : ''}`}
                placeholder="Процентная ставка"
                type="text"
                value={percentValue}
            />
        </div>
    )
}