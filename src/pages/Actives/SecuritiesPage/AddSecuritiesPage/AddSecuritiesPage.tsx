import { useContext } from "react";
import "./addSecuritiesPage.css"
import { Background } from "../../../../widgets/elements/Background/Background";
// import { AddSecuritiesForm } from "../../../../widgets/forms/actives/securities/AddSecuritiesForm/AddSecuritiesForm";
import { SpinnerLoader } from "../../../../widgets/elements/SpinnerLoader/SpinnerLoader";

import assetsBckg from '../../../../shared/assets/img/assets/assetsBckg.png'
import { Context } from "../../../../main";

export function AddSecuritiesPage() {
    const store = useContext(Context).activesStore
    
    return (
        <>
        <Background imgBckg={assetsBckg}/>
        <SpinnerLoader loading={store.loading} />
        <div className="add-securities-page">
            <div className="container" >
                {/* <div className="add-securities-page__header">
                    <div className="add-securities-page__title">Ценные бумаги</div>
                </div> */}
                <div className="add-securities-page__content">
                    {/* <AddSecuritiesForm/>                       */}
                </div>
            </div>
        </div>
        </>
    )
}
