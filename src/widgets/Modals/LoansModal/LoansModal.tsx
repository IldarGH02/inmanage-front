import { useContext } from "react"
import { SpinnerLoader } from "../../elements/SpinnerLoader/SpinnerLoader"
import { Context } from "../../../main"
import { CreateLoanForm } from "../../forms/actives/deposit/CreateLoanForm"
import { observer } from "mobx-react-lite"
import "./LoansModal.scss"

export const LoansModal = observer(() => {
    const { activesStore } = useContext(Context)

    return (
        <>
            <SpinnerLoader loading={activesStore.loading} />
            <div className="loans__modal">
                <div className="loans__modal-content">
                    {/* <h2 className="loans__modal-title">Вклады / займы</h2> */}
                    <CreateLoanForm/>
                </div>
            </div>
        </>
    )
})