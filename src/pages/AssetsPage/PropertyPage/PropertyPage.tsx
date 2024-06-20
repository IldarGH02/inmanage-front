import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./propertyPage.css"
import { FinanceTable } from "../../../widgets/elements/FinanceTable/FinanceTable";
import { useTypedSelector } from "../../../features/hooks/useTypedSelector"; 
import { getAssets, hideLoader, showLoader } from "../../../app/store/actions/assets/assetsActions";
import { useDispatch } from "react-redux";
import { actionTypes } from "../../../app/store/types/types";
import { Background } from "../../../widgets/elements/Background/Background";
import { SpinnerLoader } from "../../../widgets/elements/SpinnerLoader/SpinnerLoader";
import { ItemAssets } from "../../../widgets/assets/ItemAssets/ItemAssets";

import assetsBckg from '../../../shared/assets/img/assets/assetsBckg.png'
import propertyImg from '../../../shared/assets/img/assets/home.png'

export function PropertyPage() {
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
        <div className="property-page">
            <div className="property-page__container" >
                <div className="property-page__title">Недвижимость</div>
                <div className="property-page__finances">
                    <FinanceTable 
                        link="add"
                        income={state.assets && state.assets.properties ? state.assets.properties.total_income : 0} 
                        expenses={state.assets && state.assets.properties ? state.assets.properties.total_expenses : 0} 
                        profit={state.assets && state.assets.properties ? state.assets.properties.total_funds : 0}
                    />
                </div>
                {/* <div className="property-page__list">
                    {state.assets?.properties!.properties.length === 0 && 
                        <div className="property-page__list-empty">
                            Недвижимости нет
                        </div>
                    }
                    <div className="property-page__list-container">
                        {state.assets?.properties!.properties.map((el)=>{
                            return (
                                <Link className="property-page__item" to={`${el.id}`}  key={el.id}>
                                    <PropertyItem data={el}/>
                                </Link> 
                            )
                        })}
                    </div>
                </div> */}
                <div className="property-page__list-container">
                    {state.assets?.properties!.properties.length === 0 && 
                        <div className="property-page__list-empty">
                            Транспорта нет
                        </div>
                    }
                    <div className="property-page__list">
                        {state.assets?.properties!.properties.map((el:any)=>{
                            return (
                                <Link className="property-page__item" to={`${el.id}`} key={el.id}>
                                    <ItemAssets 
                                        title={el.name} 
                                        img={propertyImg}
                                        actualPrice={el.actual_price}
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