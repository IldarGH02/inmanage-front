
import "./addValuablePage.css"

import { Background } from "../../../../widgets/elements/Background/Background";
import { AddValuablesForm } from "../../../../widgets/forms/assets/valuables/AddValuablesForm/AddValuablesForm";

import assetsBckg from '../../../../shared/assets/img/assets/assetsBckg.png'

export function AddValuablePage() {
    return (
        <>
        <Background imgBckg={assetsBckg}/>
        <div className="add-valuable-page">
            <div className="add-valuable-page__container" >
                <div className="add-valuable-page__header">
                    <div className="add-valuable-page__title">Драгоценности</div>
                </div>
                <div className="add-valuable-page__content">
                    <AddValuablesForm/>                      
                </div>
            </div>
        </div>
        </>
    )
}
