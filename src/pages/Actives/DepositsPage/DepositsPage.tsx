import { useContext, useState } from "react";
import "./depositsPage.css"
import {FinanceTable} from "../../../widgets/elements/FinanceTable/FinanceTable.tsx";
import { Context } from "../../../main.tsx";
import { OverlayModal } from "../../../shared/ui/Overlay/OverlayModal.tsx";
import { LoanItems } from "../../../widgets/Actives/Loans/LoanItems.tsx";
import { LoansModal } from "../../../widgets/Modals/LoansModal/LoansModal.tsx";

export function DepositsPage() {
    const { activesStore } = useContext(Context)
    const [show, setShow] = useState(false)

    return (
        <>
            <div className="deposit-page">
                <div className="container" >
                    <h1 className="deposit-page__title">Вклады / займы</h1>
                    <FinanceTable 
                        setShow={setShow}
                        income={activesStore.actives && activesStore.actives.loans ? activesStore.actives.properties.total_income : 0}
                        expenses={activesStore.actives && activesStore.actives.loans ? activesStore.actives.loans.total_expenses : 0}
                        profit={activesStore.actives && activesStore.actives.loans ? activesStore.actives.loans.total_funds : 0} 
                        common_title={""} 
                        income_title={""} 
                        expenses_title={""}                        
                    />
                    {activesStore.actives?.loans!.loans.length === 0 &&
                        <div className="deposit-page__list-empty">
                            Вкладов / займов нет...
                        </div>
                    }
                    { 
                        activesStore.actives?.loans && 
                        <LoanItems 
                            items={activesStore.actives?.loans.loans} 
                            loading={activesStore.loading}
                        />
                    }
                </div>
            </div>
            <OverlayModal showModalClass={show ? 'modal--active' : ''}>
                    <LoansModal/>      
            </OverlayModal>
        </>
    )
}