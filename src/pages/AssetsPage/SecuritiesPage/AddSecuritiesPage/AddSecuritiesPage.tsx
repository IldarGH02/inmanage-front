import { useEffect } from "react";
import "./addSecuritiesPage.css"
import { useTypedSelector } from "../../../../features/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { getAssets, hideLoader, showLoader } from "../../../../app/store/actions/assets/assetsActions";
import { actionTypes } from "../../../../app/store/types/types";
import { Background } from "../../../../widgets/elements/Background/Background";
import { AddSecuritiesForm } from "../../../../widgets/forms/assets/securities/AddSecuritiesForm/AddSecuritiesForm";
import { SpinnerLoader } from "../../../../widgets/elements/SpinnerLoader/SpinnerLoader";

import assetsBckg from '../../../../shared/assets/img/assets/assetsBckg.png'

export function AddSecuritiesPage() {
    const state = useTypedSelector(state => state.assetsReducer)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(state.assets === null) {
            dispatch(showLoader(actionTypes.SHOW_LOADER))
            const res = getAssets(actionTypes.GET_ASSETS)
            res.then(e => {
                dispatch(e!);
            })
            .catch((e) => {
                dispatch(hideLoader(actionTypes.HIDE_LOADER))
                console.log(e)
            })
        }
    },[])
    
    return (
        <>
        <Background imgBckg={assetsBckg}/>
        <SpinnerLoader loading={state.loading} />
        <div className="add-securities-page">
            <div className="add-securities-page__container" >
                {/* <div className="add-securities-page__header">
                    <div className="add-securities-page__title">Ценные бумаги</div>
                </div> */}
                <div className="add-securities-page__content">
                    <AddSecuritiesForm/>                      
                </div>
            </div>
        </div>
        </>
    )
}
