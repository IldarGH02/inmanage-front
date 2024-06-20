import React, { useEffect } from "react"
import "./addBorrowsPage.css"

import { Background } from "../../../../widgets/elements/Background/Background";
import { SpinnerLoader } from "../../../../widgets/elements/SpinnerLoader/SpinnerLoader";
import { useTypedSelector } from "../../../../features/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { getAssets, hideLoader, showLoader } from "../../../../app/store/actions/assets/assetsActions";
import { actionTypesLiabilities } from "../../../../app/store/types/liabilitiesTypes";
import { AddBorrowsForm } from "../../../../widgets/forms/liabilities/borrows/AddBorrowsForm/AddBorrowsForm";

import liabilitiesBckg from '../../../../shared/assets/img/liabilities/liabilitiesBckg.png'

export function AddBorrowsPage() {
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
        <div className="add-borrows-page">
            <div className="add-borrows-page__container" >
                <div className="add-borrows-page__header">
                    <div className="add-borrows-page__title">Займы</div>
                </div>
                <div className="add-borrows-page__content">
                    <AddBorrowsForm/>
                </div>
            </div>
        </div>
        </>
    )
}
