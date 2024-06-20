import React, { useEffect } from "react"
import "../../../AssetsPage/PropertyPage/AddPropertyPage/addPropertyPage.css";

import { Background } from "../../../../widgets/elements/Background/Background";
import { AddPropertyForm } from "../../../../widgets/forms/liabilities/property/AddPropertyForm/AddPropertyForm";
import { useTypedSelector } from "../../../../features/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { getLiabilities, hideLoader, showLoader } from "../../../../app/store/actions/liabilities/liabilitiesActions";
import { actionTypesLiabilities } from "../../../../app/store/types/liabilitiesTypes";
import { SpinnerLoader } from "../../../../widgets/elements/SpinnerLoader/SpinnerLoader";

import liabilitiesBckg from '../../../../shared/assets/img/liabilities/liabilitiesBckg.png'

export function AddPropertyPage() {
    const state = useTypedSelector(state => state.liabilitiesReducer)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(state.liabilities === null) {
            dispatch(showLoader(actionTypesLiabilities.SHOW_LOADER_LIABILITIES))
            const res = getLiabilities(actionTypesLiabilities.GET_LIABILITIES)
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
        <div className="add-property-page">
            <div className="add-property-page__container" >
                <div className="add-property-page__header">
                    <div className="add-property-page__title">Недвижимость</div>
                </div>
                <div className="add-property-page__content">
                    <AddPropertyForm/>
                </div>
            </div>
        </div>
        </>
    )
}
