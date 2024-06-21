import {useLocation, useNavigate} from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { CategoriesAssetsState } from '../features/context/categories/assets/CategoriesAssetsState'; 
import { CategoriesLiabilitiesState } from '../features/context/categories/liabilities/CategoriesLiabilitiesState'; 
import { CategoriesPlannerState } from '../features/context/categories/planner/CategoriesPlannerState';
import { ModalState } from '../features/context/modalProperty/ModalState'; 
import { PlannerDateState } from '../features/context/planner/plannerData/PlannerDateState'; 
import { MainPage } from '../pages/index';

import "./index.scss"
import { useEffect } from 'react';
import { useGetLocalStorage, useGetSessionStorage, useSetSessionStorage } from '../features/hooks/storage';
import { useAuth } from '../features/hooks/auth/auth';

export const App = observer(() => {
    const auth = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const tokens = useGetLocalStorage('tokens')
        tokens ? navigate('/balance') : navigate('/login')

        navigate(JSON.parse(useGetSessionStorage('route')))

        const path = window.location.pathname

        useSetSessionStorage('route', path)
            navigate(JSON.parse(useGetSessionStorage('route')))
    }, [auth, navigate])

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
