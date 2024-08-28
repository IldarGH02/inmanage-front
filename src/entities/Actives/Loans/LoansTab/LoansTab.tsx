import { useContext } from "react"
import { InputText } from "../../../../shared/ui/input/InputText"
import { Context } from "../../../../main"
import { InputSum } from "../../../../widgets/Custom/Inputs/InputSum"
import { InputPercent } from "../../../../widgets/Custom/Inputs/InputPercent"
import { Select } from "../../../../widgets/Custom/Select"
import { InputDate } from "../../../../shared/ui/input/InputDate"
import "./LoansTab.scss"

export const LoansTab = () => {
    const { loansStore } = useContext(Context)

    return (
        <div className="loans__tab">
            <InputText
                onChange={loansStore.handleChangeLoanName}
                type="text"
                placeholder="Наименование"
                value={loansStore.loanName}
            />
            <Select
                selected={'' || null}
                options={[]}
                onChange={loansStore.handleChangeWriteoffAccount}
                classNameContainer={`dropdown__container`}
                classNameSelect='dropdown__select'
                classNameList='dropdown__list'
                placeholder="Счёт списания"
                errorMessage=""
            />
            <InputSum
                setValue={loansStore.handleChangeLoanSum}
                setError={() => {}}
                value={loansStore.loanSum}
                type="text"
                placeholder="Сумма займа"
                currency=""
                classNameCurrency="" 
            />
            <Select
                selected={'' || null}
                options={[]}
                onChange={loansStore.handleChangeLoanPeriod}
                classNameContainer={`dropdown__container`}
                classNameSelect='dropdown__select'
                classNameList='dropdown__list'
                placeholder="Периодичность"
                errorMessage=""
            />
            <InputSum
                setValue={loansStore.handleChangeLoanTerm}
                setError={() => {}}
                value={loansStore.loanTerm}
                type="text"
                placeholder="Срок займа"
                currency="мес."
                classNameCurrency="" 
            />
            <InputDate
                onChange={loansStore.handleChangeLoanDate}
                value={loansStore.loanDate}
                placeholder="Дата займа"
            />
            <InputPercent
                setPercentValue={loansStore.handleChangeLoanPercent}
                setPercentError={() => {}}
                value={loansStore.loanPercent}
                placeholder="Процентная ставка"
                type="text"
                currency="%"
                classNameCurrency=""
            />
        </div>
    )
}