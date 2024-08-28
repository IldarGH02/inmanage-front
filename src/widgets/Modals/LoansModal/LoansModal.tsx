import { useContext } from "react"
import { SpinnerLoader } from "../../elements/SpinnerLoader/SpinnerLoader"
import { Context } from "../../../main"
import { CreateLoanForm } from "../../forms/actives/deposit/CreateLoanForm"
import { observer } from "mobx-react-lite"

export const LoansModal = observer(() => {
    const { activesStore } = useContext(Context)

    return (
        <>
            <SpinnerLoader loading={activesStore.loading} />
            <div className="jewelry__modal">
                <h2 className="jewelry__modal-title">Вклады / займы</h2>
                <CreateLoanForm/>
            </div>
        </>
    )
})