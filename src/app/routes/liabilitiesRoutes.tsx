import { Suspense } from "react";
import { Route } from "react-router-dom";
import { PropertyPage } from '../../pages/LiabilitiesPage/PropertyPage/PropertyPage';
import { TransportPage  } from '../../pages/LiabilitiesPage/TransportPage/TransportPage';
import { TransportItemPage } from '../../pages/LiabilitiesPage/TransportPage/TransportItemPage/TransportItemPage';
import { LoanItemPage } from '../../pages/LiabilitiesPage/LoanPage/LoanItemPage/LoanItemPage';
import { LoanPage } from '../../pages/LiabilitiesPage/LoanPage/LoanPage';
import { PropertyItemPage } from "../../pages/LiabilitiesPage/PropertyPage/PropertyItemPage/PropertyItemPage";
import { AddPropertyPage } from "../../pages/LiabilitiesPage/PropertyPage/AddPropertyPage/AddPropertyPage";
import { InventoryPropertyPage } from "../../pages/LiabilitiesPage/PropertyPage/InventoryPage/InventoryPropertyPage";
import { AddTransportPage } from "../../pages/LiabilitiesPage/TransportPage/AddTransportPage/AddTransportPage";
import { LazyLiabilitiesPage } from "../../pages/LiabilitiesPage/LiabilitiesPage.lazy";
import { EditPropertyPage } from "../../pages/LiabilitiesPage/PropertyPage/EditPropertyPage/EditPropertyPage";
import { EditTransportPage } from "../../pages/LiabilitiesPage/TransportPage/EditTransportPage/EditTransportPage";
import { BorrowsPage } from "../../pages/LiabilitiesPage/BorrowsPage/BorrowsPage";
import { BorrowsItemPage } from "../../pages/LiabilitiesPage/BorrowsPage/BorrowsItemPage/BorrowsItemPage";
import { AddBorrowsPage } from "../../pages/LiabilitiesPage/BorrowsPage/AddBorrowsPage/AddBorrowsPage";
import { AddLoanPage } from "../../pages/LiabilitiesPage/LoanPage/AddLoanPage/AddLoanPage";

const liabilitiesRouter = 
    <Route path='/'>
        <Route path = "liabilities" element={<Suspense fallback={'Loading...'}><LazyLiabilitiesPage/></Suspense> }/>
        <Route path = "liabilities">
            <Route path = "property" element={<PropertyPage/>}/>
            <Route path = "property">
                <Route path = "add" element={<AddPropertyPage/>}/>
                <Route path = ":id" element={<PropertyItemPage/>}/>
                <Route path = ":id">
                    <Route path = "inventory" element={<InventoryPropertyPage/>}/>
                    <Route path = "edit" element={<EditPropertyPage/>}/>
                </Route>   
            </Route>

            <Route path = "transport" element={<TransportPage/>}/>
            <Route path = "transport">
                <Route path = "add" element={<AddTransportPage/>}/>
                <Route path = ":id" element={<TransportItemPage/>}/>
                <Route path = ":id">
                    <Route path = "edit" element={<EditTransportPage/>}/>
                </Route> 
            </Route>

            

            <Route path = "loan" element={<LoanPage/>}/>
            <Route path = "loan">
                <Route path = "add" element={<AddLoanPage/>}/>
                <Route path = ":id" element={<LoanItemPage/>}/>
            </Route>

            <Route path = "borrow" element={<BorrowsPage/>}/>
            <Route path = "borrow">
                <Route path = "add" element={<AddBorrowsPage/>}/>
                <Route path = ":id" element={<BorrowsItemPage/>}/>
            </Route>
        </Route>
    </Route>

export default liabilitiesRouter
