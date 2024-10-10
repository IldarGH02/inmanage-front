import { useContext } from "react"
import { Context } from "../../../main"
import { SpinnerLoader } from "../../elements/SpinnerLoader/SpinnerLoader"
import { CreateSecuritiesForm } from "../../forms/actives/securities/CreateSecurititesForm"
import "./SecuritiesModal.scss";

export const SecuritiesModal = () => {
    const { activesStore } = useContext(Context).rootStore

    return (
        <>
            <SpinnerLoader loading={activesStore.loading} />
            <div className="securities__modal">
                <h2 className="securities__modal-title">Ценные бумаги</h2>
                <CreateSecuritiesForm/>
            </div>
        </>
    )
}