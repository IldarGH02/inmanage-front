import { useEffect } from "react";
import "./depositsPage.css"
import { useDispatch } from "react-redux";
import { FinanceTable } from "../../../widgets/elements/FinanceTable/FinanceTable";
import { getAssets, showLoader } from "../../../app/store/actions/assets/assetsActions";
import { useTypedSelector } from "../../../features/hooks/useTypedSelector"; 
import { actionTypes } from "../../../app/store/types/types";
import { Background } from "../../../widgets/elements/Background/Background";
import { Link } from "react-router-dom";
import { ItemAssets } from "../../../widgets/assets/ItemAssets/ItemAssets";

import assetsBckg from '../../../shared/assets/img/assets/assetsBckg.png'
import loanImg from '../../../shared/assets/img/assets/loanItem.png'

export function DepositsPage() {
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
                console.log(e)
            })
        }
    },[])

    return (
        <>
        <Background imgBckg={assetsBckg}/>
        <div className="deposit-page">
            <div className="deposit-page__container" >
                <div className="deposit-page__title">Вклады / займы</div>
                <div className="deposit-page__finances">
                    <FinanceTable 
                        link="add"
                        income={0} 
                        expenses={0} 
                        profit={0}
                        // income={state.assets && state.assets.properties ? state.assets.properties.total_income : 0} 
                        // expenses={state.assets && state.assets.properties ? state.assets.properties.total_expenses : 0} 
                        // profit={state.assets && state.assets.properties ? state.assets.properties.total_funds : 0}
                    />
                </div>
                <div className="deposit-page__list">
                    {state.assets?.deposits!.deposits.length === 0 && 
                        <div className="deposit-page__list-empty">
                            Вкладов / займов нет...
                        </div>
                    }
                    <div className="deposit-page__list-container">
                        {state.assets?.deposits!.deposits.map((el:any)=>{
                            return (
                                <Link className="property-page__item" to={`${el.id}`} key={el.id}>
                                    <ItemAssets 
                                        title={'Вклад'} 
                                        img={loanImg}
                                        actualPrice={el.sum}
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