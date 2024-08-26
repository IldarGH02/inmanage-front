import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { CategoriesAssetsState } from '../features/context/categories/assets/CategoriesAssetsState'; 
import { CategoriesLiabilitiesState } from '../features/context/categories/liabilities/CategoriesLiabilitiesState'; 
import { CategoriesPlannerState } from '../features/context/categories/planner/CategoriesPlannerState';
import { ModalState } from '../features/context/modalProperty/ModalState'; 
import { PlannerDateState } from '../features/context/planner/plannerData/PlannerDateState'; 
import { MainPage } from '../pages/index';

import "./index.scss"
import { useEffect} from 'react';
import { getLocalStorage, setSessionStorage } from '../features/hooks/storage';

export const App = observer(() => {
    const navigate = useNavigate()

    useEffect(() => {
        const tokens = getLocalStorage('tokens')
        if(!tokens) {
            navigate('/login')
        }
        const path = window.location.pathname
        setSessionStorage('route', path)
    }, [navigate])

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
