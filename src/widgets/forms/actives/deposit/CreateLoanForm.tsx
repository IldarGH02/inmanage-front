import { FormEvent, useContext } from "react"
import { Form } from "../../../Custom/Forms/Form"
import { LoanSwitcher } from "../../../../entities/Actives/Loans/LoanSwitcher/LoanSwitcher"
import { Context } from "../../../../main"
import { DepositTab } from "../../../../entities/Actives/Loans/DepositTab/DepositTab"
import { LoansTab } from "../../../../entities/Actives/Loans/LoansTab/LoansTab"
import { observer } from "mobx-react-lite"

export const CreateLoanForm = observer(() => {
    const { loansStore } = useContext(Context)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
    }

    return (
        <Form handleSubmit={handleSubmit} className="loan__form">
            <LoanSwitcher/>
            {
                loansStore.switchParam === 'Вклады' ?
                <DepositTab/> : <LoansTab/>
            }
        </Form>
    )
})