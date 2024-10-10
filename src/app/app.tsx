import { observer } from 'mobx-react-lite'

import { CategoriesAssetsState } from '../features/context/categories/assets/CategoriesAssetsState'; 
import { CategoriesLiabilitiesState } from '../features/context/categories/liabilities/CategoriesLiabilitiesState'; 
import { CategoriesPlannerState } from '../features/context/categories/planner/CategoriesPlannerState';
import { ModalState } from '../features/context/modalProperty/ModalState'; 
import { PlannerDateState } from '../features/context/planner/plannerData/PlannerDateState'; 
import { MainPage } from '../pages/index';

import "./index.scss"

export const App = observer(() => {
    return (
        <PlannerDateState>
                <CategoriesAssetsState>
                    <CategoriesLiabilitiesState>
                        <CategoriesPlannerState>
                            <ModalState>
                                <MainPage/>
                            </ModalState> 
                        </CategoriesPlannerState>
                    </CategoriesLiabilitiesState>
                </CategoriesAssetsState> 
        </PlannerDateState>      
    )
})
