
import "./inventoryPropertyPage.css"

import { Background } from "../../../../widgets/elements/Background/Background";
import { InventoryForm } from "../../../../widgets/forms/liabilities/InventoryForm/InventoryForm";

import liabilitiesBckg from '../../../../shared/assets/img/liabilities/liabilitiesBckg.png'

export function InventoryPropertyPage() {

    return (
        <>
        <Background imgBckg={liabilitiesBckg}/>
        <div className="add-property-page">
            <div className="add-property-page__container" >
                <div className="add-property-page__header">
                    <div className="add-property-page__title">Инвентаризация</div>
                </div>
                <div className="add-property-page__content">
                    <InventoryForm/>
                </div>
            </div>
        </div>
        </>
    )
}
