import { Route } from "react-router-dom";
import { BalancePage } from '../../pages/BalancePage/BalancePage';
import { CardsPage } from '../../pages/BalancePage/CardsPage/CardsPage';
import CardAddPage from '../../pages/BalancePage/CardsPage/CardAddPage/CardAddPage';
import { IncomePage } from "../../pages/BalancePage/IncomePage/IncomePage"; 
import { AddExpensePage } from "../../pages/BalancePage/ExpensePage/AddExpensePage";
import { PaymentsPage } from "../../pages/BalancePage/PaymentsPage/PaymentsPage";

export const balanceRouter = 
                <Route path='/'>
                    <Route path = "balance" element={<BalancePage/>}/>
                    <Route path = "balance">
                        <Route path = "add-income" element={<IncomePage/>}/>
                        <Route path = "add-expense" element={<AddExpensePage/>}/>
                        <Route path = "payments" element={<PaymentsPage/>}/>
                        <Route path = "cards" element={<CardsPage/>}/>
                        <Route path = "cards">
                            <Route path = "add" element={<CardAddPage/>}/> 
                        </Route>
                    </Route>   
                </Route>


