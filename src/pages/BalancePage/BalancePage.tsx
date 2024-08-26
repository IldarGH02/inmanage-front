import {useContext, useEffect, useState} from "react";

import { observer } from 'mobx-react-lite'
import { TotalBalance } from "../../entities/Balance/TotalBalance/TotalBalance";
import { CardsBalance } from "../../entities/Balance/CardsBalance/CardsBalance";
import { PaymentsBalance } from "../../entities/Balance/PaymentsBalance/PaymentsBalance";
import { BalanceInfo } from "../../shared/ui/BalanceUi/BalanceInfo";
// import { IncomeModal } from "../../widgets/Modals/IncomeModal/IncomeModal.tsx";
import { OverlayModal } from "../../shared/ui/Overlay/OverlayModal.tsx";
import {Context} from "../../main.tsx";
import {CardsModal} from "../../widgets/Modals/CardsModal/CardsModal.tsx";
import {SpinnerLoader} from "../../widgets/elements/SpinnerLoader/SpinnerLoader.tsx";

export const BalancePage = observer(() => {
    const [showIncome, setShowIncome] = useState<boolean>(false)
    const [showCards, setShowCards] = useState<boolean>(false)
    const store = useContext(Context).balanceStore;

    const handleShowIncome = () => {
        setShowIncome(true)
    }

    const handleShowCards = () => {
        setShowCards(true)
    }

    // const handleCloseModal = () => {
    //     setShowIncome(false)
    // }

    const handleCloseCards = () => {
        setShowCards(false)
    }

    useEffect(() => {
        const response = store.fetchBalance()
        store.setLoading(true)
        response.then(res => {
            if(res.status >= 200 && res.status < 300) {
                store.setLoading(false)
                store.setBalance(res.data)
                store.setCardList(res.data.card_list)
            }
        })
        if(!showCards) {
            const response = store.fetchBalance()
            store.setLoading(true)
            response.then(res => {
                if(res.status >= 200 && res.status < 300) {
                    store.setLoading(false)
                    store.setBalance(res.data)
                    store.setCardList(res.data.card_list)
                }
            })
        }
    }, [showCards, store])

    return (
        <>
            <SpinnerLoader loading={store.loading}/>
            <section className="balance__page">
                <div className="container">
                    <div className="balance__page-content">
                        <div className="balance__page-finance">
                            <TotalBalance 
                                sum={store.balance ? store.balance?.card_funds : 0}
                                income={store.balance ? store.balance?.total_income : 0}
                                expense={store.balance ? store.balance?.total_expenses : 0}
                            />
                            <div className="balance__income-expense">
                                <BalanceInfo
                                    className="balance__income"
                                    classNameElement="income"
                                    classNameTitle="income__title"
                                    balanceText="Доход"
                                    classNameContainer="income__container"
                                    classNameSum="income__sum"
                                    classNameValuta="income__valuta"
                                    sum={store.balance ? store.balance?.card_income : 0}
                                    handleShow={handleShowIncome}
                                />
                                <BalanceInfo
                                    className="balance__expense"
                                    classNameElement="expense"
                                    classNameTitle="expense__title"
                                    balanceText="Расход"
                                    classNameContainer="expense__container"
                                    classNameSum="expense__sum"
                                    classNameValuta="expense__valuta"
                                    sum={store.balance ? store.balance?.card_expenses : 0}
                                    handleShow={handleShowIncome}
                                />
                            </div>                            
                        </div>
                        <div className="balance__page-cards">
                            <div className="balance__card-info">
                                <CardsBalance 
                                    sum={store.balance ? store.balance.card_funds : 0} 
                                    cards={store.balance ? store.balance.card_list : []}
                                    handleShow={handleShowCards}
                                />
                            </div>
                            <div className="balance__payments">
                                <PaymentsBalance/>
                            </div>
                        </div>
                    </div>                
                </div>
                
            </section>   
            <OverlayModal showModalClass={showIncome ? 'modal--active' : ''}>
               <></>  {/* <IncomeModal handleCloseModal={handleCloseModal} classNameActive={showIncome ? 'income--active' : ''}/> */}
            </OverlayModal>
            <OverlayModal showModalClass={showCards ? 'modal--active' : ''}>
                <CardsModal active={'active'} handleClose={handleCloseCards}/>
            </OverlayModal>
        </>
    )
})