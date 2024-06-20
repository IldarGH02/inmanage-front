import { useEffect } from "react"
import "./addTransportPage.css"
import { Background } from "../../../../widgets/elements/Background/Background";
import { AddTransportForm } from "../../../../widgets/forms/assets/transport/AddTransportForm/AddTransportForm";
import { SpinnerLoader } from "../../../../widgets/elements/SpinnerLoader/SpinnerLoader";
import { useTypedSelector } from "../../../../features/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { getAssets, hideLoader, showLoader } from "../../../../app/store/actions/assets/assetsActions";
import { actionTypes } from "../../../../app/store/types/types";

import assetsBckg from '../../../../shared/assets/img/assets/assetsBckg.png'

export function AddTransportPage() {
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
        <div className="add-transport-page">
            <div className="add-transport-page__container" >
                <div className="add-transport-page__header">
                    <div className="add-transport-page__title">Транспорт</div>
                </div>
                <div className="add-transport-page__content">
                    <AddTransportForm/>
                </div>
            </div>
        </div>
        </>
    )
}
