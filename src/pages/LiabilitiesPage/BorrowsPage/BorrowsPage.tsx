import { useContext } from "react"
import "./borrowsPage.css"
import { Link } from "react-router-dom"
import { FinanceTable } from "../../../widgets/elements/FinanceTable/FinanceTable"
import { Background } from "../../../widgets/elements/Background/Background"
import { ItemLiabilities } from "../../../widgets/liabilities/ItemLiabilities/ItemLiabilities"

import liabilitiesBckg from '../../../shared/assets/img/liabilities/liabilitiesBckg.png'
import loanItem from '../../../shared/assets/img/liabilities/loanItem.png'
import { Context } from "../../../main"

export function BorrowsPage() {
    const store = useContext(Context).liabilitiesStore

    return (
        <>
        <Background imgBckg={liabilitiesBckg}/>
        <div className="borrows-page">
            <div className="borrows-page__container" >
                <div className="borrows-page__title">Займы</div>
                <div className="borrows-page__finances">
                    <FinanceTable
                        setShow={() => { } }
                        price={store.liabilities && store.liabilities.loans ? store.liabilities.loans.total_funds : 0}
                        expenses={store.liabilities && store.liabilities.loans ? store.liabilities.loans.total_expenses : 0}
                        remainder={0} 
                        common_title={""} 
                        income_title={""} 
                        expenses_title={""}                    
                    />
                </div>
                <div className="borrows-page__list">
                    {store.liabilities?.borrows?.borrows.length === 0 && 
                        <div className="borrows-page__list-empty">
                            Займов нет
                        </div>
                    }
                    <div className="borrows-page__list-container">
                        {store.liabilities?.borrows?.borrows.map((el)=>{
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
