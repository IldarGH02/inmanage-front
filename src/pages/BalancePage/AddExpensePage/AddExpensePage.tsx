import { useEffect, useState } from "react"
import "./addExpensePage.css"
import { ExpenseCategories } from "../../../entities/Balance/ExpenseBalance/ExpenseCategories/ExpenseCategories"
import { InputExpenseSum } from "../../../entities/Balance/ExpenseBalance/InputSum/InputSum"
import { ExpenseSliderFinance } from "../../../entities/Balance/ExpenseBalance/ExpenseSlider/ExpenseSliderFinance/ExpenseSliderFinance"
import { ICard, IExpenseBalance, IExpenseSliderCategory } from "../../../app/types/balance/IBalance"
import { ExpenseDropDownList } from "../../../entities/Balance/ExpenseBalance/ExpenseDropDownList/ExpenseDropDownList"
import "../../../widgets/elements/buttons/CancelBtn/cancelBtn.css";
import { Background } from "../../../widgets/elements/Background/Background"
import { Link, useNavigate } from "react-router-dom"
import { useTypedSelector } from "../../../features/hooks/useTypedSelector"
import { useDispatch } from "react-redux"
import { addExpenseAssetsLiabilities, addFavoriteCard, addPersonalExpense, getBalance, getPersonalExpenseCategories, hideLoader, showLoader } from "../../../app/store/actions/balance/balanceActions"
import { actionTypesBalance } from "../../../app/store/types/balanceTypes"
import { ExpenseCategoriesList } from "../../../entities/Balance/ExpenseBalance/ExpenseSlider/ExpenseCategoriesList/ExpenseCategoriesList"
import { Modal } from "../../../widgets/elements/Modal/Modal"
import { SelectCardModal } from "../../../widgets/elements/Modal/balance/SelectCardModal/SelectCardModal"
import { actionTypes } from "../../../app/store/types/types"
import { updateAssetsExpense } from "../../../app/store/actions/assets/assetsActions"
import { IAssetsBusiness, IAssetsProperty, IAssetsTransport } from "../../../app/types/assets/IAssets"
import { updateLiabilitiesExpense } from "../../../app/store/actions/liabilities/liabilitiesActions"
import { actionTypesLiabilities } from "../../../app/store/types/liabilitiesTypes"
import { PersonalExpensesBlock } from "../../../entities/Balance/ExpenseBalance/PersonalExpensesBlock/PersonalExpensesBlock"
import { PersonalExpensesBlockBig } from "../../../entities/Balance/ExpenseBalance/PersonalExpensesBlock/PersonalExpensesBlockBig"
import { Substrate } from "../../../widgets/elements/Modal/balance/Substrate/Substrate"
import { loadIconsData } from "../../../entities/Balance/ExpenseBalance/PersonalExpensesBlock/iconData"
import { SpinnerLoader } from "../../../widgets/elements/SpinnerLoader/SpinnerLoader"

import walletBckg from '../../../shared/assets/img/balance/walletBckg.png'

// const arrBlock: IExpenseListBlock[] = [
//     {
//         id: 1,
//         name: 'Развлечения',
//         active: false
//     },
//     {
//         id: 2,
//         name: 'Автомобиль',
//         active: false
//     },
//     {
//         id: 3,
//         name: 'Кошка',
//         active: false
//     },
//     {
//         id: 4,
//         name: 'Интернет + ТВ',
//         active: false
//     },
//     {
//         id: 5,
//         name: 'Аренда помещения',
//         active: false
//     },
// ]

interface IIconBalance {
    id: number,
    src: string
}

export function AddExpensePage() {
    const state = useTypedSelector(state => state.balanceReducer)
    const dispatch = useDispatch()
    // const [listBlock, setListBlock] = useState<IExpenseListBlock[]>(arrBlock)
    const categories = ['Личные', 'Активы', 'Пассивы']
    const [category, setCategory] = useState(0)
    const [valueDDListAssets, setValueDDListAssets] = useState('')
    const [valueDDListLiabilities, setValueDDListLiabilities] = useState('')
    const [nextBtnVisible, setNextBtnVisible] = useState(false)
    const [valueSum, setValueSum] = useState('')
    const [alertSum, setAlertSum] = useState('')

    const [modalVisible, setModalVisible] = useState(false)
    const [idCard, setIdCard] = useState<number|null>(null)
    const [idDDListAssets, setIdDDListAssets] = useState<number|null>(null)
    const [idDDListLiabilities, setIdDDListLiabilities] = useState<number|null>(null)
    const [activeCategoryAssets, setActiveCategoryAssets] = useState<number|null>(null) 
    const [activeCategoryLiabilities, setActiveCategoryLiabilities] = useState<number|null>(null) 

    const [cardList, setCardList] = useState<ICard[]>([])
    // const [iconsList, setIconsList] = useState<IExpensePersonalIcons[]>([])

    const navigate = useNavigate()

    const [positionOfCategoryAssets, setPositionOfCategoryAssets] = useState<IExpenseSliderCategory[]>([])
    const [positionOfCategoryLiabilities, setPositionOfCategoryLiabilities] = useState<IExpenseSliderCategory[]>([])
    const [substrateVisible, setSubstrateVisible] = useState(false)

    const [allIcons] = useState<IIconBalance[]>(loadIconsData())
    const [idActiveIcon, setIdActiveIcon] = useState<number|null>(null)
    const [titleActiveIcon, setTitleActiveIcon] = useState('')
    
    useEffect(()=>{
        if(state.balance === null) {
            dispatch(showLoader(actionTypesBalance.SHOW_LOADER))
            const res = getBalance(actionTypesBalance.GET_BALANCE)
            res.then(e => {
                dispatch(e!)
                let cardListTmp: ICard[] = [];
                let favoriteCardsId = (e!.payload.favorite_cards as number[]);
                (e!.payload.card_list as ICard[]).forEach(el=>{
                    if(favoriteCardsId.includes(el.id!)) {
                        cardListTmp.push(el)
                    }
                })
                setCardList(cardListTmp)
            })
            .catch((e) => {
                dispatch(hideLoader(actionTypes.HIDE_LOADER))
                console.log(e)
            })
        } else {
            let cardListTmp: ICard[] = [];
            let favoriteCardsId = (state.balance.favourite_cards as number[])
            console.log(favoriteCardsId);
            (state.balance.card_list as ICard[]).forEach(el=>{
                if(favoriteCardsId.includes(el.id!)) {
                    cardListTmp.push(el)
                }
            })
            setCardList(cardListTmp)
        }
    }, [])

    useEffect(()=>{
        if(state.personalCategories===null) {
            dispatch(showLoader(actionTypesBalance.SHOW_LOADER))
            const res = getPersonalExpenseCategories(actionTypesBalance.GET_PERSONAL_EXPENSE_CATEGORIES)
            res.then(e => {
                // setIconsList(e!.payload.icons)
                dispatch(e!)
            })
            .catch((e) => {
                dispatch(hideLoader(actionTypes.HIDE_LOADER))
                console.log(e)
            })
        }
    }, [])

    useEffect(()=>{
        setValueDDListAssets('')
        setIdDDListAssets(null)
    }, [positionOfCategoryAssets, activeCategoryAssets])

    useEffect(()=>{
        setIdDDListLiabilities(null)
        setValueDDListLiabilities('')
    }, [positionOfCategoryLiabilities, activeCategoryLiabilities])

    // const addPosition = (str: string) => {
    //     let newId = 1
    //     listBlock.forEach(el=>{
    //         if(newId<=el.id) {
    //             newId = el.id + 1 
    //         }
    //     })
    //     let listBlockTmp = [...listBlock]
    //     listBlockTmp.push({
    //         id: newId,
    //         name: str,
    //         active: false
    //     })
    //     setListBlock(listBlockTmp)
    // }

    // const clickPosition = (id: number) => {    
    //     let listBlockTmp = listBlock.map(el=>{
    //         if(id===el.id) {
    //             el.active = !el.active
    //         }
    //         return el
    //     })
    //     setListBlock(listBlockTmp)
    // }

    // const removePosition = (id: number) => {
    //     const newList = listBlock.filter(el=>{
    //         if(el.id!==id) {
    //             return el
    //         }
    //     })
    //     setListBlock(newList)
    // }

    const closeSelectCardModal = (id?: number) => {
        if(id) {
            dispatch(showLoader(actionTypesBalance.SHOW_LOADER))
            let newFavoriteCards: number[] = Array.from(new Set([...state.balance.favourite_cards, id]))

            const res = addFavoriteCard(actionTypesBalance.ADD_FAVORITE_CARD, newFavoriteCards)
            res.then(e => {
                let newCards: ICard[] = e!.payload.balance.card_list
                setCardList(newCards)
                dispatch(e!)
                
            })
            .catch((e) => {
                console.log(e)
            })
            .finally(()=>{
                console.log(state.balance.favourite_cards)
                dispatch(hideLoader(actionTypes.HIDE_LOADER))
                setModalVisible(false)
            })
        } else {
            setModalVisible(false)
        }
    }

    useEffect(()=>{
        let flag = false
        if(category===0 && alertSum==='' && idCard && valueSum!==''&&valueSum!=='0'&&idActiveIcon!==-1) { //личные
            flag = true
        }
        if(category===1 && activeCategoryAssets && idDDListAssets && idCard&&valueSum!==''&&valueSum!=='0' && alertSum==='') { //активы
            flag = true
        }
        if(category===2 && activeCategoryLiabilities && idDDListLiabilities && idCard&&valueSum!==''&&valueSum!=='0' && alertSum==='') { //пассивы
            flag = true
        }
        setNextBtnVisible(flag)
        
    }, [valueSum, activeCategoryAssets, idActiveIcon, idDDListAssets, idDDListLiabilities, idCard, activeCategoryLiabilities, category])

    const onAddExpense = () => {
        if(nextBtnVisible) {
            
            if(category===0) { //личные
                let objExpense: IExpenseBalance = {
                    funds: Number(valueSum.replace(/ /g,'')),
                    comment: null,
                    writeoff_account: idCard!,
                    category: {
                        icon_id: idActiveIcon,
                        title: titleActiveIcon
                    }
                } 
                dispatch(showLoader(actionTypesBalance.SHOW_LOADER))
                const res = addPersonalExpense(actionTypesBalance.ADD_EXPENSE_PERSONAL, idCard!, objExpense)
                res.then(e=>{   
                    dispatch(e!)
                    // dispatch(addExpenseAssetsLiabilities(actionTypesBalance.ADD_EXPENSE_ASSETS, e.))
                    navigate('/balance')
                })
                res.catch((e) => {
                    dispatch(hideLoader(actionTypes.HIDE_LOADER))
                    console.log(e)
                })
            }
            const objExpense: IExpenseBalance = {
                funds: Number(valueSum.replace(/ /g,'')),
                comment: null,
                writeoff_account: idCard!
            }
            if(category===1) { //активы
                type typeAssets = 'properties' | 'transport' | 'business'
                let typeAssets: typeAssets = 'properties'
                
                
                switch (activeCategoryAssets as number) {
                    
                    case 1: {
                        typeAssets = 'properties'
                        dispatch(showLoader(actionTypes.SHOW_LOADER))
                        const res = updateAssetsExpense(actionTypes.ADD_EXPENSE, typeAssets, idDDListAssets!, [objExpense])
                        res.then(e=>{   
                            console.log('e', e)
                            dispatch(e!)
                            dispatch(addExpenseAssetsLiabilities(actionTypesBalance.ADD_EXPENSE_ASSETS_LIABILITIES, (e!.payload.asset as IAssetsProperty).expenses[(e!.payload.asset as IAssetsProperty).expenses.length-1]))
                            navigate('/balance')
                        })
                        res.catch((e) => {
                            dispatch(hideLoader(actionTypes.HIDE_LOADER))
                            console.log(e)
                        })
                        break;
                    }
                    case 2: {
                        typeAssets = 'transport'
                        dispatch(showLoader(actionTypes.SHOW_LOADER))
                        const res = updateAssetsExpense(actionTypes.ADD_EXPENSE, typeAssets, idDDListAssets!, [objExpense])
                        res.then(e=>{   
                            dispatch(e!)
                            dispatch(addExpenseAssetsLiabilities(actionTypesBalance.ADD_EXPENSE_ASSETS_LIABILITIES, (e!.payload.asset as IAssetsTransport).expenses[(e!.payload.asset as IAssetsTransport).expenses.length-1]))
                            navigate('/balance')
                        })
                        res.catch((e) => {
                            dispatch(hideLoader(actionTypes.HIDE_LOADER))
                            console.log(e)
                        })
                        break;
                    }
        
                    case 3: {
                        typeAssets = 'business'
                        dispatch(showLoader(actionTypes.SHOW_LOADER))
                        const res = updateAssetsExpense(actionTypes.ADD_EXPENSE, typeAssets, idDDListAssets!, [objExpense])
                        res.then(e=>{   
                            dispatch(e!)
                            dispatch(addExpenseAssetsLiabilities(actionTypesBalance.ADD_EXPENSE_ASSETS_LIABILITIES, (e!.payload.asset as IAssetsBusiness).expenses[(e!.payload.asset as IAssetsBusiness).expenses.length-1]))
                            navigate('/balance')
                        })
                        res.catch((e) => {
                            dispatch(hideLoader(actionTypes.HIDE_LOADER))
                            console.log(e)
                        })
                        break;
                    }
        
                    case 4: {
                        typeAssets = 'properties'
                        break;
                    }
        
                    case 5: {
                        typeAssets = 'properties'
                        break;
                    }
        
                    case 6: {
                        typeAssets = 'properties'
                        break;
                    }
                        
                    default:
                        break;
                }
            }
            if(category===2) { //пассивы
                type typeLiabilities = 'properties' | 'transport'
                let typeAssets: typeLiabilities = 'properties'
                switch (activeCategoryLiabilities as number) {
                    
                    case 1: {
                        typeAssets = 'properties'
                        dispatch(showLoader(actionTypes.SHOW_LOADER))
                        const res = updateLiabilitiesExpense(actionTypesLiabilities.ADD_EXPENSE, typeAssets, idDDListLiabilities!, [objExpense])
                        res.then(e=>{
                            console.log(e)   
                            dispatch(e!)
                            dispatch(addExpenseAssetsLiabilities(actionTypesBalance.ADD_EXPENSE_ASSETS_LIABILITIES, (e!.payload.asset as IAssetsProperty).expenses[(e!.payload.asset as IAssetsProperty).expenses.length-1]))
                            navigate('/balance')
                        })
                        res.catch((e) => {
                            dispatch(hideLoader(actionTypes.HIDE_LOADER))
                            console.log(e)
                        })
                        break;
                    }
                    case 2: {
                        typeAssets = 'transport'
                        dispatch(showLoader(actionTypes.SHOW_LOADER))
                        const res = updateLiabilitiesExpense(actionTypesLiabilities.ADD_EXPENSE, typeAssets, idDDListLiabilities!, [objExpense])
                        res.then(e=>{   
                            dispatch(e!)
                            dispatch(addExpenseAssetsLiabilities(actionTypesBalance.ADD_EXPENSE_ASSETS_LIABILITIES, (e!.payload.asset as IAssetsTransport).expenses[(e!.payload.asset as IAssetsProperty).expenses.length-1]))
                            navigate('/balance')
                        })
                        res.catch((e) => {
                            dispatch(hideLoader(actionTypes.HIDE_LOADER))
                            console.log(e)
                        })
                        break;
                    }
        
                    case 3: {
                        // typeAssets = 'business'
                        // dispatch(showLoader(actionTypes.SHOW_LOADER))
                        // const res = updateAssets(actionTypes.ADD_INCOME, typeAssets, idDDList!, [objIncome])
                        // res.then(e=>{   
                        //     dispatch(e!)
                        //     dispatch(addIncomeAssets(actionTypesBalance.ADD_INCOME_ASSETS, (e!.payload.asset as IAssetsBusiness).income[(e!.payload.asset as IAssetsProperty).income.length-1]))
                        //     navigate('/balance')
                        // })
                        // res.catch((e) => {
                        //     console.log(e)
                        // })
                        break;
                    }

                    case 4: {
                        // typeAssets = 'business'
                        // dispatch(showLoader(actionTypes.SHOW_LOADER))
                        // const res = updateAssets(actionTypes.ADD_INCOME, typeAssets, idDDList!, [objIncome])
                        // res.then(e=>{   
                        //     dispatch(e!)
                        //     dispatch(addIncomeAssets(actionTypesBalance.ADD_INCOME_ASSETS, (e!.payload.asset as IAssetsBusiness).income[(e!.payload.asset as IAssetsProperty).income.length-1]))
                        //     navigate('/balance')
                        // })
                        // res.catch((e) => {
                        //     console.log(e)
                        // })
                        break;
                    }
                            
                    default:
                        break;
                }
            }
            
        }
    }

    return (
        <>
        <Background imgBckg={walletBckg}/>
        {modalVisible && state.balance && 
            <Modal onClose={()=>setModalVisible(false)}>
                <SelectCardModal data={state.balance.card_list} onClose={closeSelectCardModal}/>
            </Modal>
        }
        {substrateVisible && 
            <Substrate onClose={()=>setSubstrateVisible(false)}/>
        }

        <SpinnerLoader loading={state.loading} />
        <div className="add-expense-page">
            <div className="add-expense-page__container" >
                <div className="add-expense-page__header">
                    <div className="add-expense-page__title">Новая операция</div>
                </div>
                <div className="add-expense-page__content">
                    <div className="add-expense-page__finance-block-wrapper">
                        <div className="add-expense-page__finance-block">
                            <div className="add-expense-page__categories">
                                <ExpenseCategories categories={categories} onChangeCategory={setCategory} categoryActive={category}/>
                            </div>
                            <div className="add-expense-page__sum">
                                <InputExpenseSum length={10} value={valueSum} setValue={setValueSum} setAlert={setAlertSum}/>
                            </div>
                            <div className="add-expense-page__block-title">Откуда потратили?</div>
                            <ExpenseSliderFinance onClickItem={setIdCard} favoriteCards={cardList} showAddCardModal={()=>setModalVisible(true)}/>
                        </div>
                    </div>
                    {substrateVisible ? 
                        <div className="add-expense-page__personal-expenses-block">
                            <PersonalExpensesBlockBig allIconsData={allIcons} iconsData={state.personalCategories?state.personalCategories:[]} idActiveIcon={idActiveIcon} setIdActiveIcon={setIdActiveIcon}/>
                        </div>
                        :
                        <div className="add-expense-page__spend-block-wrapper">
                            <div className="add-expense-page__spend-block">
                                {category === 1 && 
                                    <>
                                        <div className="add-expense-page__block-title">Категория актива:</div>
                                        <ExpenseCategoriesList activeCategory={activeCategoryAssets} assets={true} onClickItem={setPositionOfCategoryAssets} onSetActiveCategory={setActiveCategoryAssets}/>
                                        {activeCategoryAssets && 
                                            <div className="add-expense-page__position">
                                                <div className="add-expense-page__block-title">Выберите позицию:</div>
                                                <div className="add-expense-page__ddlist">
                                                    <ExpenseDropDownList idContent="addExpense-addIncome-DDL-content" idTitle="addExpense-addIncome-DDL-title" data={positionOfCategoryAssets} setValue={(val: string, id: number)=>{
                                                        setValueDDListAssets(val)
                                                        setIdDDListAssets(id)
                                                    }} value={valueDDListAssets} placeholder={'Выберите актив'}/>
                                                </div>
                                                
                                            </div> 
                                        }
                                    </>
                                }
                                {category === 2 && 
                                    <>
                                        <div className="add-expense-page__block-title">Категория пассива:</div>
                                        <ExpenseCategoriesList activeCategory={activeCategoryLiabilities} onClickItem={setPositionOfCategoryLiabilities} onSetActiveCategory={setActiveCategoryLiabilities}/>
                                        {activeCategoryLiabilities && 
                                            <div className="add-expense-page__position">
                                                <div className="add-expense-page__block-title">Выберите позицию:</div>
                                                <div className="add-expense-page__ddlist">
                                                    <ExpenseDropDownList idContent="addExpense-addIncome-DDL-content" idTitle="addExpense-addIncome-DDL-title" data={positionOfCategoryLiabilities} setValue={(val: string, id: number)=>{
                                                        setValueDDListLiabilities(val)
                                                        setIdDDListLiabilities(id)
                                                    }} value={valueDDListLiabilities} placeholder={'Выберите пассив'}/>
                                                </div>
                                                
                                            </div> 
                                        }
                                    </>
                                }
                                
                                
                                {category === 0 && 
                                <>
                                    <div className="add-expense-page__block-title">На что потратили?</div>
                                    <PersonalExpensesBlock allIconsData={allIcons} iconsData={state.personalCategories} onBigBlockVisible={()=>setSubstrateVisible(true)} idActiveIcon={idActiveIcon} setIdActiveIcon={(id, title)=>{
                                        setIdActiveIcon(id)
                                        setTitleActiveIcon(title)
                                    }}/>
                                </>
                                }
                                
                            </div>
                        </div>
                            
                    }                   
                </div>
                <div className="add-expense-page__btns">
                    <Link to="/balance" className="cancel-btn add-expense-page__cancel-btn">Отменить</Link>
                    <div className={`add-expense-page__add-btn${nextBtnVisible?'--active':''}`} onClick={onAddExpense}>Подтвердить</div>
                </div>
            </div>
        </div>
        </>
    )
}
