
import { useContext } from "react"
import { InputText } from "../../../../shared/ui/input/InputText"
import { InputSum } from "../../../../widgets/Custom/Inputs/InputSum"
import { Context } from "../../../../main"
import "./DepositTab.scss"

export const DepositTab = () => {
    const { loansStore } = useContext(Context)

    return (
        <div className="deposit__tab">
            <InputText
                onChange={loansStore.handleChangeDepositName}
                value={loansStore.depositName}
                type="text"
                placeholder="Наименование"
            />
            <InputSum
                setValue={loansStore.handleChangeDepositSum}
                setError={() => {}}
                value={loansStore.depositSum}
                type="text"
                placeholder="Сумма вклада"
                currency=""
                classNameCurrency=""
            />
            <InputSum
                setValue={loansStore.handleChangeDepositTerm}
                setError={() => {}}
                value={loansStore.depositTerm}
                type="text"
                placeholder="Срок вклада"
                currency="мес."
                classNameCurrency=""
            />
            <InputSum
                setValue={loansStore.handleChangeDepositPercent}
                setError={() => {}}
                value={loansStore.depositPercent}
                type="text"
                placeholder="Процентная ставка"
                currency="%"
                classNameCurrency=""
            />
        </div>
    )
}