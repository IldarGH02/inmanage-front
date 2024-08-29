import { Route } from "react-router-dom";
import { LoansPage } from "../../pages/Actives/LoansPage/LoansPage.tsx";
import { JewelryPage } from "../../pages/Actives/JewerlyPage/JewerlyPage.tsx";
import { AddSecuritiesPage } from "../../pages/Actives/SecuritiesPage/AddSecuritiesPage/AddSecuritiesPage";
import { SecuritiesPage } from "../../pages/Actives/SecuritiesPage/SecuritiesPage";
import { BusinessDetail } from "../../pages/Actives/BusinessPage/BusinessDetail/BusinessDetail.tsx";
import { BusinessPage } from "../../pages/Actives/BusinessPage/BusinessPage";
import { TransportPage } from "../../pages/Actives/TransportPage/TransportPage";
import { ImmovablesDetail } from "../../pages/Actives/ImmovablePage/ImmovablesDetail/ImmovablesDetail.tsx"; 
import { ImmovablePage } from "../../pages/Actives/ImmovablePage/ImmovablePage.tsx"; 
import { InventoryPage as  BusinessInventoryPage} from '../../pages/Actives/BusinessPage/InventoryPage/InventoryPage';
// import { InventoryPropertyPage } from "../../pages/Actives/ImmovablePage/InventoryPage/InventoryPropertyPage.tsx"; 
import { ActivesPage } from "../../pages/Actives/ActivesPage.tsx";
import { TransportDetail } from "../../pages/Actives/TransportPage/TransportDetail/TransportDetail.tsx";
// import { EditPropertyPage } from "../../pages/Actives/ImmovablePage/EditPropertyPage/EditPropertyPage.tsx"; 
// import { EditTransportPage } from "../../pages/Actives/TransportPage/EditTransportPage/EditTransportPage";
import { SecuritiesDetailPage } from "../../pages/Actives/SecuritiesPage/SecuritiesDetail/SecuritiesDetailPage.tsx";
import { JewelryDetailPage } from "../../pages/Actives/JewerlyPage/JewerlyDetail/JewelryDetailPage.tsx";
import { DepositDetailPage } from "../../pages/Actives/LoansPage/CommonDetail/DepositDetail/DepositDetailPage.tsx";
import { LoansDetailPage } from "../../pages/Actives/LoansPage/CommonDetail/LoansDetail/LoansDetailPage.tsx";
import { CommonDetail } from "../../pages/Actives/LoansPage/CommonDetail/CommonDetail.tsx";

const assetsRouter =
    <Route path='/'>
        <Route path = "assets" element={<ActivesPage/>}/>
        <Route path = "assets">
            <Route path = "property" element={<ImmovablePage/>}/>
            <Route path = "property">
                <Route path = ":id" element={<ImmovablesDetail/>}/>
                <Route path = ":id">
                    {/* <Route path = "inventory" element={<InventoryPropertyPage/>}/> */}
                    {/* <Route path = "edit" element={<EditPropertyPage/>}/> */}
                </Route>
            </Route>

            <Route path = "transport" element={<TransportPage/>}/>
            <Route path = "transport">
                <Route path = ":id" element={<TransportDetail/>}/>
                <Route path = ":id">
                    {/* <Route path = "edit" element={<EditTransportPage/>}/> */}
                </Route>
            </Route>

            <Route path = "business" element={<BusinessPage/>}/>
            <Route path = "business">
                {/* <Route path = "add" element={<BusinessAddPage/>}/> */}
                <Route path = ":id" element={<BusinessDetail/>}/>
                <Route path = ":id">
                    <Route path = "inventory" element={<BusinessInventoryPage/>}/>
                </Route>
            </Route>

            <Route path = "securities" element={<SecuritiesPage/>}/>
            <Route path = "securities">
                <Route path = ":id" element={<SecuritiesDetailPage/>}/>
                <Route path = "add" element={<AddSecuritiesPage/>}/>
            </Route>

            
            <Route path = "jewelry" element={<JewelryPage/>}/>
            <Route path = "jewelry">
            <Route path = ":id" element={<JewelryDetailPage/>}/>
                <Route path = ":id">
                    {/* <Route path = "edit" element={<EditTransportPage/>}/> */}
                </Route>
            </Route>
            
            <Route path = "loan" element={<LoansPage/>}/>
            <Route path = "loan">
                <Route path = ":id" element={
                    <CommonDetail/>
                }/>
            </Route>
        </Route>
    </Route>
     

export default assetsRouter
