import React, { useEffect } from "react"
import "./addLoanPage.css"

import { Background } from "../../../../widgets/elements/Background/Background";
import { SpinnerLoader } from "../../../../widgets/elements/SpinnerLoader/SpinnerLoader";
import { useTypedSelector } from "../../../../features/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { getAssets, hideLoader, showLoader } from "../../../../app/store/actions/assets/assetsActions";
import { actionTypesLiabilities } from "../../../../app/store/types/liabilitiesTypes";
import { AddLoanForm } from "../../../../widgets/forms/liabilities/loan/AddLoanForm/AddLoanForm";

import liabilitiesBckg from '../../../../shared/assets/img/liabilities/liabilitiesBckg.png'

export function AddLoanPage() {
    const state = useTypedSelector(state => state.liabilitiesReducer)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(state.liabilities === null) {
            dispatch(showLoader(actionTypesLiabilities.SHOW_LOADER_LIABILITIES))
            const res = getAssets(actionTypesLiabilities.GET_LIABILITIES)
            res.then(e => {
                dispatch(e!);
            })
            .catch((e) => {
                dispatch(hideLoader(actionTypesLiabilities.HIDE_LOADER_LIABILITIES))
                console.log(e)
            })
        }
    },[])

    return (
        <>
        <Background imgBckg={liabilitiesBckg}/>
        <SpinnerLoader loading={state.loading} />
        <div className="add-loan-page">
            <div className="add-loan-page__container" >
                <div className="add-loan-page__header">
                    <div className="add-loan-page__title">Кредиты</div>
                </div>
                <div className="add-loan-page__content">
                    <AddLoanForm/>
                </div>
            </div>
        </div>
        </>
    )
}
