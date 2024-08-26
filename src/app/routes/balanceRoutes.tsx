import { Route } from "react-router-dom";
import { BalancePage } from '../../pages/BalancePage/BalancePage';
import CardAddPage from '../../pages/BalancePage/CardsPage/CardAddPage/CardAddPage';
// import { AddExpensePage } from "../../pages/BalancePage/ExpensePage/AddExpensePage";
import { PaymentsPage } from "../../pages/BalancePage/PaymentsPage/PaymentsPage";

export const balanceRouter = 
                <Route path='/'>
                    <Route path = "balance" element={<BalancePage/>}/>
                    <Route path = "balance">
                        {/* <Route path = "add-expense" element={<AddExpensePage/>}/> */}
                        <Route path = "payments" element={<PaymentsPage/>}/>
                        <Route path = "add" element={<CardAddPage/>}/>
                    </Route>
                </Route>

