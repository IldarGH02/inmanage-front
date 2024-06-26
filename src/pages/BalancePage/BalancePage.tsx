import { useState } from "react";

import BalanceStore from "../../app/store/balanse/balanceStore.ts";
import { observer } from 'mobx-react-lite'
import { Link } from "react-router-dom";
import { TotalBalance } from "../../entities/Balance/TotalBalance/TotalBalance";
// import { IncomeBalance } from "../../entities/Balance/IncomeBalance/IncomeBalance";
// import { ExpenseBalance } from "../../entities/Balance/ExpenseBalance/ExpenseBalance";
import { CardsBalance } from "../../entities/Balance/CardsBalance/CardsBalance";
import { PaymentsBalance } from "../../entities/Balance/PaymentsBalance/PaymentsBalance";
import { BalanceInfo } from "../../shared/ui/BalanceUi/BalanceInfo";

export const BalancePage = observer(() => {
    const [store] = useState(() => 
        new BalanceStore()
    )

    return (
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
                                path="add-income"
                                classNameLink="balance__income-link"
                                classNameElement="income"
                                classNameTitle="income__title"
                                balanceText="Доход"
                                classNameContainer="income__container"
                                classNameSum="income__sum"
                                classNameValuta="income__valuta"
                                sum={store.balance ? store.balance?.card_income : 0}
                            />
                            <BalanceInfo
                                path="add-expense"
                                classNameLink="balance__expense-link"
                                classNameElement="expense"
                                classNameTitle="expense__title"
                                balanceText="Расход"
                                classNameContainer="expense__container"
                                classNameSum="expense__sum"
                                classNameValuta="expense__valuta"
                                sum={store.balance ? store.balance?.card_expenses : 0}
                            />
                        </div>
                        
                    </div>
                    <div className="balance__page-cards">
                        <Link 
                            className="balance__card-info" 
                            to='cards'
                        >
                            <CardsBalance 
                                sum={store.balance ? store.balance.card_funds : 0} 
                                cards={store.balance ? store.balance.card_list : []}
                            />
                        </Link>
                        <Link 
                            className="balance__payments" 
                            to="payments"
                        >
                            <PaymentsBalance/>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
})