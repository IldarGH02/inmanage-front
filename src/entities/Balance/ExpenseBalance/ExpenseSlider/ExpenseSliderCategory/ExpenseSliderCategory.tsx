import React, { useEffect } from "react";
import "./expenseSliderCategory.css";
import { ExpenseSlider } from "../ExpenseSlider";
import { IExpenseSlider, IExpenseSliderCategory } from "../../../../../app/types/balance/IBalance";
import { useTypedSelector } from "../../../../../features/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { getAssets, showLoader as showLoaderAssets } from "../../../../../app/store/actions/assets/assetsActions";
import { actionTypes } from "../../../../../app/store/types/types"; 
import { getLiabilities, showLoader } from "../../../../../app/store/actions/liabilities/liabilitiesActions";

import property from '../../../../../../shared/assets/img/balance/addExpense/propertyB.png'
import transport from '../../../../../../shared/assets/img/balance/addExpense/transportB.png'
import business from '../../../../../../shared/assets/img/balance/addExpense/businessB.png'
import jewelry from '../../../../../../shared/assets/img/balance/addExpense/jewelryB.png'
import securities from '../../../../../../shared/assets/img/balance/addExpense/securitiesB.png'
import loans from '../../../../../../shared/assets/img/balance/addExpense/loansB.png'

const arrAssets: IExpenseSlider[] = [
    {
        id: 1,
        name: 'Недвижимость',
        img: property
    },
    {
        id: 2,
        name: 'Транспорт',
        img: transport
    },
    {
        id: 3,
        name: 'Бизнес',
        img: business
    },
    {
        id: 4,
        name: 'Ценные бумаги',
        img: securities
    },
    {
        id: 5,
        name: 'Драгоценности',
        img: jewelry
    },
    {
        id: 6,
        name: 'Вклады и займы',
        img: loans
    },
]

const arrLiabilities: IExpenseSlider[] = [
    {
        id: 1,
        name: 'Недвижимость',
        img: property
    },
    {
        id: 2,
        name: 'Транспорт',
        img: transport
    },
    {
        id: 3,
        name: 'Вклады и займы',
        img: loans
    },
]

interface IExpenseSliderCategoryProps {
    assets: boolean,
    onClickItem: (data: IExpenseSliderCategory[])=>void
}

export function ExpenseSliderCategory({assets}: IExpenseSliderCategoryProps) {
    const stateAssets = useTypedSelector(state => state.assetsReducer)
    const stateLiabilities = useTypedSelector(state => state.liabilitiesReducer)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(stateAssets.assets === null) {
            dispatch(showLoaderAssets(actionTypes.SHOW_LOADER))
            const res = getAssets(actionTypes.GET_ASSETS)
            res.then(e => {
                dispatch(e!);
                }
            )
            .catch((e) => {
                console.log(e)
            })
        }
        if(stateLiabilities.liabilities === null) {
            dispatch(showLoader(actionTypes.SHOW_LOADER))
            const res = getLiabilities(actionTypes.GET_ASSETS)
            res.then(e => {
                dispatch(e!);
                }
            )
            .catch((e) => {
                console.log(e)
            })
        }
    },[])

    // const clickItem = (id: number) => {
    //     let arr: IExpenseSliderCategory[] = []
    //     if(assets) {
    //         switch (id) {
    //             case 1: {
    //                 arr = stateAssets.assets!.properties!.properties.map(el=>{
    //                     return {
    //                         id: el.id!,
    //                         name: el.name,
    //                         img: loans
    //                     }
    //                 })
    //                 break;
    //             }
                   
    //             case 2: {
    //                 arr = stateAssets.assets!.transports!.transport.map(el=>{
    //                     return {
    //                         id: el.id!,
    //                         name: el.mark + ' ' + el.model,
    //                         img: el.images[0] ? el.images[0].image:loans
    //                     }
    //                 })
    //                 break;
    //             }

    //             case 3: {
    //                 arr = stateAssets.assets!.businesses!.businesses.map(el=>{
    //                     return {
    //                         id: el.id!,
    //                         name: el.name,
    //                         img: loans
    //                     }
    //                 })
    //                 break;
    //             }

    //             case 4: {
    //                 arr = stateAssets.assets!.properties!.properties.map(el=>{
    //                     return {
    //                         id: el.id!,
    //                         name: el.name,
    //                         img: loans
    //                     }
    //                 })
    //                 break;
    //             }

    //             case 5: {
    //                 arr = stateAssets.assets!.properties!.properties.map(el=>{
    //                     return {
    //                         id: el.id!,
    //                         name: el.name,
    //                         img: loans
    //                     }
    //                 })
    //                 break;
    //             }

    //             case 6: {
    //                 arr = stateAssets.assets!.properties!.properties.map(el=>{
    //                     return {
    //                         id: el.id!,
    //                         name: el.name,
    //                         img: loans
    //                     }
    //                 })
    //                 break;
    //             }
                    
    //             default:
    //                 break;
    //         }
    //     } else {
    //         switch (id) {
    //             case 1: {
    //                 arr = stateLiabilities.liabilities!.properties!.properties.map(el=>{
    //                     return {
    //                         id: el.id!,
    //                         name: el.name,
    //                         img: loans
    //                     }
    //                 })
    //                 break;
    //             }
                   
    //             case 2: {
    //                 arr = stateLiabilities.liabilities!.transports!.transport.map(el=>{
    //                     return {
    //                         id: el.id!,
    //                         name: el.mark + ' ' + el.model,
    //                         img: el.images[0].image
    //                     }
    //                 })
    //                 break;
    //             }

    //             case 3: {
    //                 arr = stateLiabilities.liabilities!.loans!.loans.map(el=>{
    //                     return {
    //                         id: el.id!,
    //                         name: el.name,
    //                         img: loans
    //                     }
    //                 })
    //                 break;
    //             }
                    
    //             default:
    //                 break;
    //         }
    //     }
    //     onClickItem(arr)
    // }

    return (
        <ExpenseSlider data={assets?arrAssets:arrLiabilities} idItems="category-slider" onClickItem={() => {}}/>
    )
}
