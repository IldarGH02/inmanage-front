import React, { useEffect } from "react"
import "./borrowsPage.css"
import { Link } from "react-router-dom"
import { FinanceTable } from "../../../widgets/elements/FinanceTable/FinanceTable"
import { useTypedSelector } from "../../../features/hooks/useTypedSelector"
import { useDispatch } from "react-redux"
import { getLiabilities, showLoader } from "../../../app/store/actions/liabilities/liabilitiesActions"
import { Background } from "../../../widgets/elements/Background/Background"
import { actionTypesLiabilities } from "../../../app/store/types/liabilitiesTypes"
import { ItemLiabilities } from "../../../widgets/liabilities/ItemLiabilities/ItemLiabilities"

import liabilitiesBckg from '../../../shared/assets/img/liabilities/liabilitiesBckg.png'
import loanItem from '../../../shared/assets/img/liabilities/loanItem.png'

export function BorrowsPage() {
    const state = useTypedSelector(state => state.liabilitiesReducer)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(state.liabilities === null) {
            dispatch(showLoader(actionTypesLiabilities.SHOW_LOADER_LIABILITIES))
            const res = getLiabilities(actionTypesLiabilities.GET_LIABILITIES)
            res.then(e => {
                // console.log(e)
                dispatch(e!);
                }
            )
            .catch((e) => {
                console.log(e)
            })
        }
    },[])

    return (
        <>
        <Background imgBckg={liabilitiesBckg}/>
        <div className="borrows-page">
            <div className="borrows-page__container" >
                <div className="borrows-page__title">Займы</div>
                <div className="borrows-page__finances">
                    <FinanceTable 
                        link="add"
                        price={state.liabilities && state.liabilities.loans ? state.liabilities.loans.total_funds : 0} 
                        expenses={state.liabilities && state.liabilities.loans ? state.liabilities.loans.total_expenses : 0} 
                        remainder={0}
                    />
                </div>
                <div className="borrows-page__list">
                    {state.liabilities?.borrows?.borrows.length === 0 && 
                        <div className="borrows-page__list-empty">
                            Займов нет
                        </div>
                    }
                    <div className="borrows-page__list-container">
                        {state.liabilities?.borrows?.borrows.map((el)=>{
                            return (
                                <Link className="property-page__item" to={`${el.id}`}  key={el.id}>
                                    <ItemLiabilities
                                        title={el.name}
                                        img={loanItem}
                                        actualPrice={0}
                                        expenses={el.total_expense}
                                        remainder={el.remainder}/>
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
