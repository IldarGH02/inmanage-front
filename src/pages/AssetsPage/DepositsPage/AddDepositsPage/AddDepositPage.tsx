import React, { useEffect } from "react"
import "./addDepositPage.css"
import "../../../../widgets/elements/buttons/CancelBtn/cancelBtn.css";
import { Background } from "../../../../widgets/elements/Background/Background";
import { SpinnerLoader } from "../../../../widgets/elements/SpinnerLoader/SpinnerLoader";
import { useTypedSelector } from "../../../../features/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { getAssets, hideLoader, showLoader } from "../../../../app/store/actions/assets/assetsActions";
import { actionTypes } from "../../../../app/store/types/types";
import { AddDepositForm } from "../../../../widgets/forms/assets/deposit/AddDepositForm";

import assetsBckg from '../../../../shared/assets/img/assets/assetsBckg.png'

export function AddDepositPage() {
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
        <div className="add-deposit-page">
            <div className="add-deposit-page__container" >
                <div className="add-deposit-page__content">
                    <AddDepositForm/>
                </div>
            </div>
        </div>
        </>
    )
}
