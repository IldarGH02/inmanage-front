import { useEffect, useState } from "react"
import { Background } from "../../../../widgets/elements/Background/Background";
import { AddBusinessForm } from "../../../../widgets/forms/assets/business/AddBusinessForm/AddBusinessForm";
import { AddBusinessBalanceForm } from "../../../../widgets/forms/assets/business/AddBusinessBalanceForm/AddBusinessBalanceForm";
import { SpinnerLoader } from "../../../../widgets/elements/SpinnerLoader/SpinnerLoader";
import { useTypedSelector } from "../../../../features/hooks/useTypedSelector"; 
import { useDispatch } from "react-redux";
import { getAssets, hideLoader, showLoader } from "../../../../app/store/actions/assets/assetsActions";
import { actionTypes } from "../../../../app/store/types/types";

import assetsBckg from '../../../../shared/assets/img/assets/assetsBckg.png'

import "./addBusinessPage.css"

export function AddBusinessPage() {
    const state = useTypedSelector(state => state.assetsReducer)
    const dispatch = useDispatch()
    const [balanceVisible, setBalanceVisible] = useState(false)

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
        <div className="add-business-page">
            <div className="add-business-page__container" >
                <div className="add-business-page__header">
                    <div className="add-business-page__title">Бизнес</div>
                </div>
                <div className="add-business-page__content">
                    {!balanceVisible && 
                        <AddBusinessForm onBalanceClick={()=>setBalanceVisible(true)}/>                      
                    }
                    {balanceVisible && 
                        <AddBusinessBalanceForm onClose={()=>setBalanceVisible(false)}/>
                    }
                </div>
            </div>
        </div>
        </>
    )
}
