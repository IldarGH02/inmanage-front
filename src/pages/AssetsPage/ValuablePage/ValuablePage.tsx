import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./valuablePage.css"
import { FinanceTable } from "../../../widgets/elements/FinanceTable/FinanceTable";
import { useTypedSelector } from "../../../features/hooks/useTypedSelector";
import { getAssets, showLoader } from "../../../app/store/actions/assets/assetsActions";
import { useDispatch } from "react-redux";
import { actionTypes } from "../../../app/store/types/types";
import { Background } from "../../../widgets/elements/Background/Background";
import { ItemAssets } from "../../../widgets/assets/ItemAssets/ItemAssets";

import assetsBckg from '../../../shared/assets/img/assets/assetsBckg.png'
import propertyImg from '../../../shared/assets/img/assets/home.png'

export function ValuablePage() {
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
        <div className="valuable-page">
            <div className="valuable-page__container" >
                <div className="valuable-page__title">Драгоценности</div>
                <div className="valuable-page__finances">
                    <FinanceTable 
                        link="add"
                        price={state.assets?.jewelries?.total_funds} 
                        expenses={0} 
                        profit={0}
                    />
                </div>
                <div className="property-page__list-container">
                    {state.assets?.properties!.properties.length === 0 && 
                        <div className="property-page__list-empty">
                            Транспорта нет
                        </div>
                    }
                    <div className="property-page__list">
                        {state.assets?.jewelries?.jewelries!.map((el:any)=>{
                            return (
                                <Link className="property-page__item" to={`${el.id}`} key={el.id}>
                                    <ItemAssets 
                                        title={el.name} 
                                        img={propertyImg}
                                        actualPrice={el.estimated_cost}
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