import "./reportsPage.css"
import { ReportExpenses } from "../../widgets/reports/ReportExpenses/ReportExpenses";
import { Background } from "../../widgets/elements/Background/Background";
import { ReportIncome } from "../../widgets/reports/ReportIncome/ReportIncome";


import walletBckg from '../../shared/assets/img/balance/walletBckg.png'

export function ReportsPage() {

    return (
        <>
        <Background imgBckg={walletBckg}/>
        <div className="reports-page" >
            <div className="reports-page__container">
                <div className="reports-page__items">
                    <div className="reports-page__item">
                        <ReportExpenses/>
                    </div>
                    <div className="reports-page__item">
                        <ReportExpenses/>
                    </div>
                    <div className="reports-page__item">
                        
                        <ReportIncome/>
                    </div>
                    <div className="reports-page__item">
                        <ReportExpenses/>
                    </div>
                </div>
                <button className="reports-page__add-btn">+</button>
            </div>
        </div>
        </>
    )
}