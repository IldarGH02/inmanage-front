import { useEffect, useState } from "react"
import "./editTransportPage.css"

import { Background } from "../../../../widgets/elements/Background/Background";
import { SpinnerLoader } from "../../../../widgets/elements/SpinnerLoader/SpinnerLoader";
import { useTypedSelector } from "../../../../features/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { IAssetsTransport } from "../../../../app/types/assets/IAssets";
import { useParams } from "react-router-dom";
import { getAssets, hideLoader, showLoader } from "../../../../app/store/actions/assets/assetsActions";
import { actionTypes } from "../../../../app/store/types/types";
import { EditTransportForm } from "../../../../widgets/forms/assets/transport/EditTransportForm/EditTransportForm";

import assetsBckg from '../../../../shared/assets/img/assets/assetsBckg.png'

export function EditTransportPage() {
    const state = useTypedSelector(state => state.assetsReducer)
    const dispatch = useDispatch()
    const [transport, setTransport] = useState<IAssetsTransport|null>(null)
    const {id} = useParams()

    useEffect(()=>{
        if(state.assets === null) {
            dispatch(showLoader(actionTypes.SHOW_LOADER))
            const res = getAssets(actionTypes.GET_ASSETS)
            res.then(e => {
                dispatch(e!)
                const transportTmp = e!.payload.transports!.transport!.find(el=>el.id===Number(id))!
                setTransport(transportTmp)
            })
            .catch((e) => {
                dispatch(hideLoader(actionTypes.HIDE_LOADER))
                console.log(e)
            })
        } else {
            const transportTmp = state.assets.transports!.transport!.find((el:any)=>el.id===Number(id))!
            setTransport(transportTmp)
        }
    },[])

    return (
        <>
        <Background imgBckg={assetsBckg}/>
        <SpinnerLoader loading={state.loading} />
        <div className="edit-transport-page">
            <div className="edit-transport-page__container" >
                <div className="edit-transport-page__header">
                    <div className="edit-transport-page__title">Редактирование транспорта</div>
                </div>
                <div className="edit-transport-page__content">
                    {transport!==null && 
                        <EditTransportForm transport={transport}/>
                    }
                </div>
            </div>
        </div>
        </>
    )
}
