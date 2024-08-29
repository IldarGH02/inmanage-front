import { FormEvent, useContext } from "react"
import { Form } from "../../../Custom/Forms/Form"
import { LoanSwitcher } from "../../../../entities/Actives/Loans/LoanSwitcher/LoanSwitcher"
import { Context } from "../../../../main"
import { DepositTab } from "../../../../entities/Actives/Loans/DepositTab/DepositTab"
import { LoansTab } from "../../../../entities/Actives/Loans/LoansTab/LoansTab"
import { observer } from "mobx-react-lite"
import "./CreateLoanForm.scss"
import { Button } from "../../../../shared/ui/Buttons/Button"

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
            <div className="loan__form-actions">
                <Button
                    onClick={loansStore.handleCloseForm}
                    className="loan__form-cancel"
                    textButton='Отмена'
                    type="button"
                    name="cancel"
                />
                <Button
                    // onClick={}
                    className="loan__form-submit"
                    textButton='Подтвердить'
                    type="submit"
                    name="submit"
                />
            </div>
        </Form>
    )
})