import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./transportPage.css"
import { FinanceTable } from "../../../widgets/elements/FinanceTable/FinanceTable";
import { useTypedSelector } from "../../../features/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { getAssets, hideLoader, showLoader } from "../../../app/store/actions/assets/assetsActions";
import { actionTypes } from "../../../app/store/types/types";
import { Background } from "../../../widgets/elements/Background/Background";
import { SpinnerLoader } from "../../../widgets/elements/SpinnerLoader/SpinnerLoader";
import { ItemAssets } from "../../../widgets/assets/ItemAssets/ItemAssets";

import assetsBckg from '../../../shared/assets/img/assets/assetsBckg.png'
import transportImg from '../../../shared/assets/img/assets/transportItem.png'

export function TransportPage() {
    const state = useTypedSelector(state => state.assetsReducer)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(state.assets === null) {
            dispatch(showLoader(actionTypes.SHOW_LOADER))
            const res = getAssets(actionTypes.GET_ASSETS)
            res.then(e => {
                console.log(e)
                dispatch(e!);
                }
            )
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
        <div className="transport-page">
            <div className="transport-page__container" >
                <div className="transport-page__title">Транспорт</div>
                <div className="transport-page__finances">
                    <FinanceTable 
                        link="add"
                        income={state.assets && state.assets.transports ? state.assets.transports.total_income : 0} 
                        expenses={state.assets && state.assets.transports ? state.assets.transports.total_expenses : 0} 
                        profit={state.assets && state.assets.transports ? state.assets.transports.total_funds : 0}
                    />
                </div>
                <div className="transport-page__list-container">
                    {state.assets?.transports!.transport.length === 0 && 
                        <div className="transport-page__list-empty">
                            Транспорта нет
                        </div>
                    }
                    <div className="transport-page__list">
                        {state.assets?.transports!.transport.map((el:any)=>{
                            return (
                                <Link className="transport-page__item" to={`${el.id}`} key={el.id}>
                                    <ItemAssets 
                                        title={el.mark + ' ' +el.model} 
                                        img={transportImg}
                                        actualPrice={el.average_market_price}
                                        income={el.total_income}
                                        profit={el.average_profit} 
                                    />
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
