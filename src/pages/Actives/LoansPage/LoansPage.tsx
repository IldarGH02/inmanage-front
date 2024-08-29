import { useContext, useEffect } from "react";
import {FinanceTable} from "../../../widgets/elements/FinanceTable/FinanceTable.tsx";
import { Context } from "../../../main.tsx";
import { OverlayModal } from "../../../shared/ui/Overlay/OverlayModal.tsx";
import { LoanItems } from "../../../widgets/Actives/Loans/LoanItems.tsx";
import { LoansModal } from "../../../widgets/Modals/LoansModal/LoansModal.tsx";
import { observer } from "mobx-react-lite";
import "./LoansPage.scss";
import { DepositsItems } from "../../../widgets/Actives/Deposits/DepositsItems.tsx";
import { Spinner } from "react-bootstrap";

export const LoansPage = observer(() => {
    const { activesStore, loansStore } = useContext(Context)

    useEffect(() => {
        const r = activesStore.fetchActives()
        activesStore.setLoading(true)
        r.then(res => {
            if(res.status >= 200 && res.status < 300) {
                activesStore.setActives(res.data)
                activesStore.setLoading(false)
                loansStore.loan = false;

                if(res.data.deposits?.deposits && res.data.loans?.loans) {
                    const loans = res.data.loans?.loans
                    const deposits = res.data.deposits?.deposits
                    
                    loansStore.loansList = loans;
                    loansStore.depositList = deposits     
                }
            }
        })
    }, [activesStore, loansStore])

    return (
        <>
            <div className="loans__page">
                <div className="container" >
                    <h1 className="loans__page-title">Вклады / займы</h1>
                    <FinanceTable 
                        setShow={loansStore.setShow}
                        income={activesStore.actives && activesStore.actives.loans ? activesStore.actives.properties.total_income : 0}
                        expenses={activesStore.actives && activesStore.actives.loans ? activesStore.actives.loans.total_expenses : 0}
                        profit={activesStore.actives && activesStore.actives.loans ? activesStore.actives.loans.total_funds : 0} 
                        common_title={"Стоимость: "} 
                        income_title={"Прибыль: "}                        
                    />
                    {activesStore.actives?.loans!.loans.length === 0 && activesStore.actives?.deposits!.deposits.length === 0 &&
                        <div className="deposit-page__list-empty">
                            Вкладов / займов нет...
                        </div>
                    }
                    { 
                    ( 
                        activesStore.actives?.loans && 
                        activesStore.actives?.deposits &&
                        !activesStore.loading
                    ) ?
                    (
                        <div className="loans__page-items">
                            <LoanItems 
                                items={activesStore.actives?.loans.loans} 
                            /> 
                            <DepositsItems
                                items={activesStore.actives?.deposits.deposits}
                            />
                        </div>
                    ) : 
                    <div style={{
                        width: '100%',
                        height: '350px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Spinner 
                            style={{
                                width: '10rem',
                                height: '10rem',
                            }}
                            variant="primary"
                        />
                    </div> 
                    }
                </div>
            </div>
            <OverlayModal showModalClass={loansStore.show ? 'modal--active' : ''}>
                <LoansModal/>      
            </OverlayModal>
        </>
    )
})