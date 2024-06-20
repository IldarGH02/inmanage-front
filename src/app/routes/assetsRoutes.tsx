import { Suspense } from "react";
import { Route } from "react-router-dom";
import { DepositsPage } from "../../pages/AssetsPage/DepositsPage/DepositsPage"; 
import { AddValuablePage } from "../../pages/AssetsPage/ValuablePage/AddValuablePage/AddValuablePage";
import { ValuablePage } from "../../pages/AssetsPage/ValuablePage/ValuablePage";
import { AddSecuritiesPage } from "../../pages/AssetsPage/SecuritiesPage/AddSecuritiesPage/AddSecuritiesPage";
import { SecuritiesPage } from "../../pages/AssetsPage/SecuritiesPage/SecuritiesPage";
import { BusinessItemPage } from "../../pages/AssetsPage/BusinessPage/BusinessItemPage/BusinessItemPage";
import { AddBusinessPage } from "../../pages/AssetsPage/BusinessPage/AddBusinessPage/AddBusinessPage";
import { BusinessPage } from "../../pages/AssetsPage/BusinessPage/BusinessPage";
import { TransportPage } from "../../pages/AssetsPage/TransportPage/TransportPage";
import { PropertyItemPage } from "../../pages/AssetsPage/PropertyPage/PropertyItemPage/PropertyItemPage";
import { PropertyPage } from "../../pages/AssetsPage/PropertyPage/PropertyPage";
import { InventoryPage as  BusinessInventoryPage} from '../../pages/AssetsPage/BusinessPage/InventoryPage/InventoryPage';
import { InventoryPropertyPage } from "../../pages/AssetsPage/PropertyPage/InventoryPage/InventoryPropertyPage";
import { LazyAssetsPage } from "../../pages/AssetsPage/AssetsPage.lazy";
import { AddPropertyPage } from "../../pages/AssetsPage/PropertyPage/AddPropertyPage/AddPropertyPage";
import { AddTransportPage } from "../../pages/AssetsPage/TransportPage/AddTransportPage/AddTransportPage";
import { TransportItemPage } from "../../pages/AssetsPage/TransportPage/TransportItemPage/TransportItemPage";
import { EditPropertyPage } from "../../pages/AssetsPage/PropertyPage/EditPropertyPage/EditPropertyPage";
import { EditTransportPage } from "../../pages/AssetsPage/TransportPage/EditTransportPage/EditTransportPage";
import { AddDepositPage } from "../../pages/AssetsPage/DepositsPage/AddDepositsPage/AddDepositPage";
import AssetsPage from "../../pages/AssetsPage/AssetsPage";

// const assetsRouter = 
//     <Route path='/'>
//         <Route path = "assets" element={<Suspense fallback={'Loading...'}><LazyAssetsPage/></Suspense> }/>
//         <Route path = "assets">
//             <Route path = "property" element={<PropertyPage/>}/>
//             <Route path = "property">
//                 <Route path = "add" element={<AddPropertyPage/>}/>                
//                 <Route path = ":id" element={<PropertyItemPage/>}/>
//                 <Route path = ":id">
//                     <Route path = "inventory" element={<InventoryPropertyPage/>}/>
//                     <Route path = "edit" element={<EditPropertyPage/>}/>
//                 </Route>   
//             </Route>

//             <Route path = "transport" element={<TransportPage/>}/>
//             <Route path = "transport">
//                 <Route path = "add" element={<AddTransportPage/>}/>
//                 <Route path = ":id" element={<TransportItemPage/>}/>
//                 <Route path = ":id">
//                     <Route path = "edit" element={<EditTransportPage/>}/>
//                 </Route> 
//             </Route>

//             <Route path = "business" element={<BusinessPage/>}/>
//             <Route path = "business">
//                 <Route path = "add" element={<AddBusinessPage/>}/>
//                 {/* <Route path = "add" element={<BusinessAddPage/>}/> */}
//                 <Route path = ":id" element={<BusinessItemPage/>}/>
//                 <Route path = ":id">
//                     <Route path = "inventory" element={<BusinessInventoryPage/>}/>
//                 </Route>   
//             </Route>

//             <Route path = "securities" element={<SecuritiesPage/>}/>
//             <Route path = "securities">
//                 <Route path = "add" element={<AddSecuritiesPage/>}/>
//             </Route>

//             <Route path = "valuables" element={<ValuablePage/>}/>
            
//             <Route path = "valuables">
//                 <Route path = "add" element={<AddValuablePage/>}/>
//             </Route>
            
//             <Route path = "deposits" element={<DepositsPage/>}/>

//             <Route path = "deposits">
//                 <Route path = "add" element={<AddDepositPage/>}/>
//             </Route>
//         </Route>
//     </Route>
     

// export default assetsRouter

const assetsRouter = 
            <Route path="/" element={<AssetsPage/>}>
                <Route path = "assets" element={<Suspense fallback={'Loading...'}><LazyAssetsPage/></Suspense> }/>
                    <Route path = "assets">
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

                    <Route path = "business" element={<BusinessPage/>}/>
                    <Route path = "business">
                        <Route path = "add" element={<AddBusinessPage/>}/>
                        {/* <Route path = "add" element={<BusinessAddPage/>}/> */}
                        <Route path = ":id" element={<BusinessItemPage/>}/>
                        <Route path = ":id">
                            <Route path = "inventory" element={<BusinessInventoryPage/>}/>
                        </Route>   
                    </Route>

                    <Route path = "securities" element={<SecuritiesPage/>}/>
                    <Route path = "securities">
                        <Route path = "add" element={<AddSecuritiesPage/>}/>
                    </Route>

                    <Route path = "valuables" element={<ValuablePage/>}/>
                    
                    <Route path = "valuables">
                        <Route path = "add" element={<AddValuablePage/>}/>
                    </Route>
                    
                    <Route path = "deposits" element={<DepositsPage/>}/>

                    <Route path = "deposits">
                        <Route path = "add" element={<AddDepositPage/>}/>
                    </Route>
                </Route>
            </Route>


export default assetsRouter