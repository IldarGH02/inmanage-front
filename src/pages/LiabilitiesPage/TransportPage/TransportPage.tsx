import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./transportPage.css"
import { FinanceTable } from "../../../widgets/elements/FinanceTable/FinanceTable";
import { useTypedSelector } from "../../../features/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { getLiabilities, hideLoader, showLoader } from "../../../app/store/actions/liabilities/liabilitiesActions";
import { Background } from "../../../widgets/elements/Background/Background";
import { actionTypesLiabilities } from "../../../app/store/types/liabilitiesTypes";
import { ItemLiabilities } from "../../../widgets/liabilities/ItemLiabilities/ItemLiabilities";
import { SpinnerLoader } from "../../../widgets/elements/SpinnerLoader/SpinnerLoader";

import transportImg from '../../../shared/assets/img/assets/transportItem.png'
import liabilitiesBckg from '../../../shared/assets/img/liabilities/liabilitiesBckg.png'

export function TransportPage() {
    const state = useTypedSelector(state => state.liabilitiesReducer)
    const dispatch = useDispatch()

    useEffect(()=>{
        console.log(state.liabilities)
        if(state.liabilities === null) {
            dispatch(showLoader(actionTypesLiabilities.SHOW_LOADER_LIABILITIES))
            const res = getLiabilities(actionTypesLiabilities.GET_LIABILITIES)
            res.then(e => {
                dispatch(e!);
                }
            )
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
        <div className="transport-page">
            <div className="transport-page__container" >
                <div className="transport-page__title">Транспорт</div>
                <div className="transport-page__finances">
                    <FinanceTable 
                        link="add"
                        price={state.liabilities && state.liabilities.transports ? state.liabilities.transports.total_funds : 0.0} 
                        expenses={state.liabilities && state.liabilities.transports ? state.liabilities.transports.total_expenses : 0}
                        remainder={0}
                    />
                </div>
                <div className="transport-page__list-container">
                    {state.liabilities?.transports!.transport.length === 0 && 
                        <div className="transport-page__list-empty">
                            Транспорта нет
                        </div>
                    }
                    <div className="transport-page__list">
                        {state.liabilities?.transports!.transport.map((el:any)=>{
                            return (
                                <Link className="transport-page__item" to={`${el.id}`} key={el.id}>
                                    <ItemLiabilities 
                                        title={el.mark + ' ' + el.model} 
                                        img={transportImg} 
                                        actualPrice={el.average_market_price} 
                                        expenses={el.month_expense} 
                                        remainder={0}/>
                                    {/* <TransportItem data={el}/> */}
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
