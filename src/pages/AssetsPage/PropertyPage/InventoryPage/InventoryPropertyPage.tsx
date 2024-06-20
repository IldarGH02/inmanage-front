import "./inventoryPropertyPage.css"
import "../../../../widgets/elements/buttons/CancelBtn/cancelBtn.css";
import { Background } from "../../../../widgets/elements/Background/Background";
import { InventoryForm } from "../../../../widgets/forms/assets/property/InventoryForm/InventoryForm";
import { SpinnerLoader } from "../../../../widgets/elements/SpinnerLoader/SpinnerLoader";
import { useTypedSelector } from "../../../../features/hooks/useTypedSelector"; 

import assetsBckg from '../../../../shared/assets/img/assets/assetsBckg.png'

export function InventoryPropertyPage() {
    const state = useTypedSelector(state => state.assetsReducer)

    // useEffect(()=>{
    //     if(state.assets === null) {
    //         dispatch(showLoader(actionTypes.SHOW_LOADER))
    //         const res = getAssets(actionTypes.GET_ASSETS)
    //         res.then(e => {
    //             dispatch(e!);
    //         })
    //         .catch((e) => {
    //             dispatch(hideLoader(actionTypes.HIDE_LOADER))
    //             console.log(e)
    //         })
    //     }
    // },[])

    return (
        <>
        <Background imgBckg={assetsBckg}/>
        <SpinnerLoader loading={state.loading} />
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
