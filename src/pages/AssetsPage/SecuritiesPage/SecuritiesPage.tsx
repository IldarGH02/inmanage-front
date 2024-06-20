import { useEffect } from "react";
import "./securitiesPage.css"
import { FinanceTable } from "../../../widgets/elements/FinanceTable/FinanceTable";
import { useTypedSelector } from "../../../features/hooks/useTypedSelector";
import { getAssets, hideLoader, showLoader } from "../../../app/store/actions/assets/assetsActions";
import { useDispatch } from "react-redux";
import { actionTypes } from "../../../app/store/types/types";
import { Background } from "../../../widgets/elements/Background/Background";
import { SpinnerLoader } from "../../../widgets/elements/SpinnerLoader/SpinnerLoader";
import { Link } from "react-router-dom";
import { ItemAssets } from "../../../widgets/assets/ItemAssets/ItemAssets";

import assetsBckg from '../../../shared/assets/img/assets/assetsBckg.png'
import transportImg from '../../../shared/assets/img/assets/transportItem.png'

export function SecuritiesPage() {
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
        <div className="securities-page">
            <div className="securities-page__container" >
                <div className="securities-page__title">Ценные бумаги</div>
                <div className="securities-page__finances">
                    <FinanceTable 
                        link="add"
                        income={0} 
                        expenses={0} 
                        profit={state.assets && state.assets.securities ? state.assets.securities.total_funds : 0}
                        // income={state.assets && state.assets.properties ? state.assets.properties.total_income : 0} 
                        // expenses={state.assets && state.assets.properties ? state.assets.properties.total_expenses : 0} 
                        // profit={state.assets && state.assets.properties ? state.assets.properties.total_funds : 0}
                    />
                </div>
                <div className="securities-page__list-container">
                    {state.assets?.securities!.securities.length === 0 && 
                        <div className="securities-page__list-empty">
                            Ценных бумаг нет...
                        </div>
                    }
                    <div className="securities-page__list">
                        {state.assets?.securities!.securities.map((el:any)=>{
                            return (
                                <Link className="transport-page__item" to={`${el.id}`} key={el.id}>
                                    <ItemAssets 
                                        title={el.name} 
                                        img={transportImg}
                                        actualPrice={el.market_price}
                                        income={0}
                                        profit={0} 
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