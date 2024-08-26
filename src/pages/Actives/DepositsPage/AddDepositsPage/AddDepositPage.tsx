import { useContext } from "react"
import "./addDepositPage.css"
import "../../../../widgets/elements/buttons/CancelBtn/cancelBtn.css";
import { Background } from "../../../../widgets/elements/Background/Background";
import { SpinnerLoader } from "../../../../widgets/elements/SpinnerLoader/SpinnerLoader";
// import { AddDepositForm } from "../../../../widgets/forms/actives/deposit/AddDepositForm";

import assetsBckg from '../../../../shared/assets/img/assets/assetsBckg.png'
import { Context } from "../../../../main";

export function AddDepositPage() {
    const store = useContext(Context).activesStore

    return (
        <>
        <Background imgBckg={assetsBckg}/>
        <SpinnerLoader loading={store.loading} />
        <div className="add-deposit-page">
            <div className="add-deposit-page__container" >
                <div className="add-deposit-page__content">

                </div>
            </div>
        </div>
        </>
    )
}
