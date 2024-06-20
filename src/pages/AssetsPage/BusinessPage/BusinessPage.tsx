import { useEffect } from "react";
import "./businessPage.css"
import { FinanceTable } from "../../../widgets/elements/FinanceTable/FinanceTable"; 
import { useTypedSelector } from "../../../features/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { getAssets, hideLoader, showLoader } from "../../../app/store/actions/assets/assetsActions";
import { actionTypes } from "../../../app/store/types/types";

export function BusinessPage() {
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
        <div className="business-page">
            <div className="business-page__container" >
                <div className="business-page__title">Бизнес</div>
                <div className="business-page__finances">
                    <FinanceTable 
                        link="add"
                        income={state.assets && state.assets.businesses ? state.assets.businesses.total_income : 0} 
                        expenses={state.assets && state.assets.businesses ? state.assets.businesses.total_expenses : 0} 
                        profit={state.assets && state.assets.businesses ? state.assets.businesses.total_funds : 0}
                    />
                </div>
                <div className="business-page__list-container">
                    {state.assets?.businesses!.businesses.length === 0 && 
                        <div className="business-page__list-empty">
                            Безнеса нет
                        </div>
                    }
                    <div className="business-page__list">
                        {/* {state.assets?.businesses!.businesses.map((el)=>{
                            return (
                                <Link className="business-page__item" to={`${el.id}`} key={el.id}>
                                    <ItemAssets 
                                        title={el.name} 
                                        img={businessImg}
                                        actualPrice={0}
                                        income={el.total_income}
                                        profit={el.average_profit} 
                                    />
                                </Link>
                            )
                        })} */}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
