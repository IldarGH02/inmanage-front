import { useEffect } from "react";
import { AlertState } from "../../features/context/alert2/AlertState"; 
import { ModalState } from "../../features/context/modalProperty/ModalState";
import "./liabilitiesPage.css"
import { General } from "../../widgets/assets/General/GeneralBalance/General";
import { AssetsCard } from "../../widgets/assets/General/AssetsCard/AssetsCard";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../features/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../app/store/actions/liabilities/liabilitiesActions";
import { getLiabilities } from "../../app/store/actions/liabilities/liabilitiesActions";
import { actionTypesLiabilities } from "../../app/store/types/liabilitiesTypes";
import { SpinnerLoader } from "../../widgets/elements/SpinnerLoader/SpinnerLoader";

import propertyImg from "../../shared/assets/img/assets/cards/property.png"
import transportImg from "../../shared/assets/img/assets/cards/transport.png"
import loansImg from "../../shared/assets/img/assets/cards/loans.png"
import loanIcon from "../../shared/assets/img/liabilities/loanIcon.png"

export default function LiabilitiesPage() {
    const state = useTypedSelector(state => state.liabilitiesReducer)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(state.liabilities === null) {
            dispatch(showLoader(actionTypesLiabilities.SHOW_LOADER_LIABILITIES))
            const res = getLiabilities(actionTypesLiabilities.GET_LIABILITIES)
            res.then(e => {
                console.log(e)
                dispatch(e!);
            })
            .catch((e) => {
                dispatch(hideLoader(actionTypesLiabilities.HIDE_LOADER_LIABILITIES))
                console.log(e)
            })        
        }
       
    },[])

    return (
        <>
        <AlertState>
        <ModalState>
        <SpinnerLoader loading={state.loading} />
        <div className="liabilities-page">
            <div className="liabilities-page__container" >
                <div className="liabilities-page__general-balance">
                    <General sum={state.liabilities ? state.liabilities?.total_funds : 0}/>
                </div>
                <div className="liabilities-page__cards-container">
                    <Link to="property">
                    <AssetsCard data={{
                        name: 'Недвижимость',
                        count:  state.liabilities ? (state.liabilities!.properties !== null ? state.liabilities?.properties.properties.length : 0 ) : 0,
                        sum: state.liabilities ? (state.liabilities!.properties !== null ? state.liabilities?.properties.total_funds : 0 ) : 0,
                        expenses: state.liabilities ? (state.liabilities!.properties !== null ? state.liabilities?.properties.total_expenses : 0 ) : 0,
                        img: propertyImg
                    }}/>
                    </Link>
                    <Link to="transport">
                    <AssetsCard data={{
                        name: 'Транспорт',
                        count:  state.liabilities ? (state.liabilities!.transports !== null ? state.liabilities?.transports.transport.length : 0 ) : 0,
                        sum: state.liabilities ? (state.liabilities!.transports !== null ? state.liabilities?.transports.total_funds : 0 ) : 0,
                        expenses: state.liabilities ? (state.liabilities!.transports !== null ? state.liabilities?.transports.total_expenses : 0 ) : 0,
                        img: transportImg
                    }}/>
                    </Link>
                    
                    <Link to="loan">
                    <AssetsCard data={{
                        name: 'Кредит',
                        count:  state.liabilities ? (state.liabilities!.loans !== null ? state.liabilities?.loans.loans.length : 0 ) : 0,
                        sum: state.liabilities ? (state.liabilities!.loans !== null ? state.liabilities?.loans.total_funds : 0 ) : 0,
                        expenses: state.liabilities ? (state.liabilities!.loans !== null ? state.liabilities?.loans.total_expenses : 0 ) : 0,
                        img: loansImg
                    }}/>
                    </Link>

                    <Link to="borrow">
                    <AssetsCard data={{
                        name: 'Займ',
                        count:  state.liabilities ? (state.liabilities!.loans !== null ? state.liabilities?.loans.loans.length : 0 ) : 0,
                        sum: state.liabilities ? (state.liabilities!.loans !== null ? state.liabilities?.loans.total_funds : 0 ) : 0,
                        expenses: state.liabilities ? (state.liabilities!.loans !== null ? state.liabilities?.loans.total_expenses : 0 ) : 0,
                        img: loanIcon
                    }}/>
                    </Link>
                </div>
            </div>
        </div>
        </ModalState>
        </AlertState>
        </>
    )
}