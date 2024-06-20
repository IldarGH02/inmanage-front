import { useEffect, useState } from "react"
import "./editPropertyPage.css"
import "../../../../widgets/elements/buttons/CancelBtn/cancelBtn.css";
import { Background } from "../../../../widgets/elements/Background/Background";
import { SpinnerLoader } from "../../../../widgets/elements/SpinnerLoader/SpinnerLoader";
import { useTypedSelector } from "../../../../features/hooks/useTypedSelector";
import { EditPropertyForm } from "../../../../widgets/forms/assets/property/EditPropertyForm/EditPropertyForm";
import { useDispatch } from "react-redux";
import { IAssetsProperty } from "../../../../app/types/assets/IAssets";
import { useParams } from "react-router-dom";
import { getAssets, hideLoader, showLoader } from "../../../../app/store/actions/assets/assetsActions";
import { actionTypes } from "../../../../app/store/types/types";

import assetsBckg from '../../../../shared/assets/img/assets/assetsBckg.png'

export function EditPropertyPage() {
    const state = useTypedSelector(state => state.assetsReducer)
    const dispatch = useDispatch()
    const [property, setProperty] = useState<IAssetsProperty|null>(null)
    const {id} = useParams()

    useEffect(()=>{
        if(state.assets === null) {
            dispatch(showLoader(actionTypes.SHOW_LOADER))
            const res = getAssets(actionTypes.GET_ASSETS)
            res.then(e => {
                dispatch(e!)
                const propertyTmp = e!.payload.properties!.properties!.find(el=>el.id===Number(id))!
                setProperty(propertyTmp)
            })
            .catch((e) => {
                dispatch(hideLoader(actionTypes.HIDE_LOADER))
                console.log(e)
            })
        } else {
            const propertyTmp = state.assets.properties!.properties!.find((el:any)=>el.id===Number(id))!
            setProperty(propertyTmp)
        }
    },[])

    return (
        <>
        <Background imgBckg={assetsBckg}/>
        <SpinnerLoader loading={state.loading} />
        <div className="edit-property-page">
            <div className="edit-property-page__container" >
                <div className="edit-property-page__header">
                    <div className="edit-property-page__title">Редактирование недвижимости</div>
                </div>
                <div className="edit-property-page__content">
                    {property && 
                        <EditPropertyForm property={property}/>
                    }
                </div>
            </div>
        </div>
        </>
    )
}
