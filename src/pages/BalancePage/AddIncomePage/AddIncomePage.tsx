import { useEffect, useState } from "react"
import "./addIncomePage.css"
import { ExpenseCategories } from "../../../entities/Balance/ExpenseBalance/ExpenseCategories/ExpenseCategories"
import { InputExpenseSum } from "../../../entities/Balance/ExpenseBalance/InputSum/InputSum"
import { ExpenseSliderFinance } from "../../../entities/Balance/ExpenseBalance/ExpenseSlider/ExpenseSliderFinance/ExpenseSliderFinance"
import { ICard, IExpenseListBlock, IExpenseSliderCategory, IIncome, IIncomeBalance, IWork } from "../../../app/types/balance/IBalance"
import { ExpenseDropDownList } from "../../../entities/Balance/ExpenseBalance/ExpenseDropDownList/ExpenseDropDownList"
import "../../../widgets/elements/buttons/CancelBtn/cancelBtn.css";
import { Background } from "../../../widgets/elements/Background/Background"
import { Link, useNavigate } from "react-router-dom"
import { IncomeJob } from "../../../entities/Balance/IncomeBalance/IncomeJob/IncomeJob"
import { IncomeAssets } from "../../../entities/Balance/IncomeBalance/IncomeAssets/IncomeAssets"
import { useTypedSelector } from "../../../features/hooks/useTypedSelector"
import { useDispatch } from "react-redux"
import { addFavoriteCard, addIncome, addIncomeAssets, addWork, getBalance, getWorks, hideLoader, showLoader } from "../../../app/store/actions/balance/balanceActions"
import { actionTypesBalance } from "../../../app/store/types/balanceTypes"
import { SelectCardModal } from "../../../widgets/elements/Modal/balance/SelectCardModal/SelectCardModal"
import { Modal } from "../../../widgets/elements/Modal/Modal"
import { updateAssetsIncome } from "../../../app/store/actions/assets/assetsActions"
import { actionTypes } from "../../../app/store/types/types"
import { IAssetsBusiness, IAssetsProperty, IAssetsTransport } from "../../../app/types/assets/IAssets"
import { SpinnerLoader } from "../../../widgets/elements/SpinnerLoader/SpinnerLoader"

import walletBckg from '../../../shared/assets/img/balance/walletBckg.png'
import { observer } from "mobx-react-lite"
import BalanceStore from "../../../app/store/balanceStore"


let arrBlock: IExpenseListBlock[] = [
    {
        id: 1,
        name: 'Леруа Мерлен',
        active: false
    },
    {
        id: 2,
        name: 'Яндекс такси',
        active: false
    },
    
]


export const AddIncomePage = observer(() => {
    const [store] = useState(
        () => new BalanceStore()
    )

    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false)
    const [listJobBlock, setListJobBlock] = useState<IExpenseListBlock[]>([])
    const [listProjectBlock, setListProjectBlock] = useState<IExpenseListBlock[]>(arrBlock)
    const categories = ['Работа', 'Активы', 'Самозанятость']
    const [category, setCategory] = useState(0)
    const [valueDDList, setValueDDList] = useState('')
    const [idDDList, setIdDDList] = useState<number|null>(null)
    const [idCard, setIdCard] = useState<number|null>(null)
    const [nextBtnVisible, setNextBtnVisible] = useState(false)
    const [valueSum, setValueSum] = useState('')
    const [alertSum, setAlertSum] = useState('')

    const [cardList, setCardList] = useState<ICard[]>([])

    const [positionOfCategoryAssets, setPositionOfCategoryAssets] = useState<IExpenseSliderCategory[]>([])
    const [activeCategory, setActiveCategory] = useState<number|null>(null) 

    const [commentJob, setCommentJob] = useState('')

    const navigate = useNavigate()

    useEffect(()=>{
        if(store.balance === null) {
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
                dispatch(hideLoader(actionTypesBalance.HIDE_LOADER))
                console.log(e)
            })
        } else {
            let cardListTmp: ICard[] = [];
            let favoriteCardsId = (store.balance.favourite_cards as number[]);
            (store.balance.card_list as ICard[]).forEach(el=>{
                if(favoriteCardsId.includes(el.id!)) {
                    cardListTmp.push(el)
                }
            })
            setCardList(cardListTmp)
        }
    }, [])

    useEffect(()=>{
        if(!store.work) {
            dispatch(showLoader(actionTypesBalance.SHOW_LOADER))
            const res = getWorks(actionTypesBalance.GET_WORKS)
            res.then(e => {
                console.log(e.payload.work)
                dispatch(e!) 
                setListJobBlock(e.payload.work.map(el=>{
                    const obj: IExpenseListBlock = {
                        id: el.id!,
                        name: el.name,
                        active: false
                    }
                    return obj
                }))
            })
            .catch((e) => {
                dispatch(hideLoader(actionTypesBalance.HIDE_LOADER))
                console.log(e)
            })
        } else {
            setListJobBlock(store.work.map((el: IWork)=>{
                const obj: IExpenseListBlock = {
                    id: el.id!,
                    name: el.name,
                    active: false
                }
                return obj
            }))
        }
    }, [])

    useEffect(()=>{
        let flag = false
        if(category === 0) { //работа
            let activeID = listJobBlock.find(el=>el.active)
            if(alertSum === '' && 
               activeID && 
               commentJob && 
               valueSum !=='' && 
               valueSum !== '0' &&
               idCard) {
                flag = true
            }
        }
        if(category===1 && activeCategory && idDDList && idCard&&valueSum!==''&&valueSum!=='0') { //активы
            flag = true
        }
        if(category===2) { //проект
            flag = true
        }
        setNextBtnVisible(flag)
        
    }, [valueSum, activeCategory, idDDList, commentJob, idCard, listJobBlock, listProjectBlock, category])

    useEffect(()=>{
        setValueDDList('')
        setIdDDList(null)
    }, [positionOfCategoryAssets, activeCategory])

    const clickItemCategoryAssets = (data: IExpenseSliderCategory[]) => {
        setPositionOfCategoryAssets(data)
    }

    const addPositionJob = (name: string) => {
        dispatch(showLoader(actionTypesBalance.SHOW_LOADER))
        const res = addWork(actionTypesBalance.GET_WORKS, name)
        res.then(e => {
            dispatch(e!) 
            setListJobBlock(prev=>[...prev, {id: e!.payload.work.id!, name: e!.payload.work.name, active: false}])
        })
        .catch((e) => {
            dispatch(hideLoader(actionTypesBalance.HIDE_LOADER))
            console.log(e)
        })
    }

    const addPositionProject = (str: string) => {
        let newId = 1
        listProjectBlock.forEach(el=>{
            if(newId<=el.id) {
                newId = el.id + 1 
            }
        })
        let listBlockTmp = [...listProjectBlock]
        listBlockTmp.push({
            id: newId,
            name: str,
            active: false
        })
        setListProjectBlock(listBlockTmp)
    }

    const clickPositionJob = (id: number) => {    
        let listBlockTmp = listJobBlock.map(el=>{
            if(id===el.id) {
                el.active = !el.active
            } else {
                el.active = false
            }
            return el
        })
        setListJobBlock(listBlockTmp)
    }

    const clickPositionProject = (id: number) => {    
        let listBlockTmp = listProjectBlock.map(el=>{
            if(id===el.id) {
                el.active = !el.active
            }
            return el
        })
        setListProjectBlock(listBlockTmp)
    }

    // const removePosition = (id: number) => {
    //     const newList = listJobBlock.filter(el=>{
    //         if(el.id!==id) {
    //             return el
    //         }
    //     })
    //     setListJobBlock(newList)
    // }

    const closeSelectCarModal = (id?: number) => {
        if(id) {
            dispatch(showLoader(actionTypesBalance.SHOW_LOADER))
            let newFavoriteCards: number[] = Array.from(new Set([...store.balance.favourite_cards, id]))

            const res = addFavoriteCard(actionTypesBalance.ADD_FAVORITE_CARD, newFavoriteCards)
            res.then(e => {
                let newCards: ICard[] = e!.payload.balance.card_list
                setCardList(newCards)
                dispatch(e!)
                
            })
            .catch((e) => {
                dispatch(hideLoader(actionTypesBalance.HIDE_LOADER))
                console.log(e)
            })
            .finally(()=>{
                setModalVisible(false)
            })
        } else {
            setModalVisible(false)
        }
    }

    const onAddIncome = () => {
        if(nextBtnVisible) {
            if(category===0) { //работа
                let activeID = listJobBlock.find(el=>el.active)
                let objWork: IIncome = {
                    project: null,
                    work: activeID!.id,
                    funds: Number(valueSum.replace(/ /g,'')),
                    writeoff_account: idCard!,
                    comment: commentJob
                } 
                dispatch(showLoader(actionTypesBalance.SHOW_LOADER))
                const res = addIncome(actionTypesBalance.ADD_INCOME_WORK, objWork)
                res.then(e=>{   
                    dispatch(e!)
                    navigate('/balance')
                })
                res.catch((e) => {
                    dispatch(hideLoader(actionTypesBalance.HIDE_LOADER))
                    console.log(e)
                })
            }
            if(category===1) { //активы
                type typeAssets = 'properties' | 'transport' | 'business'
                let typeAssets: typeAssets = 'properties'
                const objIncome: IIncomeBalance = {
                    funds: Number(valueSum.replace(/ /g,'')),
                    comment: null,
                    writeoff_account: idCard!
                }
                
                switch (activeCategory as number) {
                    
                    case 1: {
                        typeAssets = 'properties'
                        dispatch(showLoader(actionTypes.SHOW_LOADER))
                        const res = updateAssetsIncome(actionTypes.ADD_INCOME, typeAssets, idDDList!, [objIncome])
                        res.then(e=>{   
                            dispatch(e!)
                            dispatch(addIncomeAssets(actionTypesBalance.ADD_INCOME_ASSETS, (e!.payload.asset as IAssetsProperty).income[(e!.payload.asset as IAssetsProperty).income.length-1]))
                            navigate('/balance')
                        })
                        res.catch((e) => {
                            dispatch(hideLoader(actionTypesBalance.HIDE_LOADER))
                            console.log(e)
                        })
                        break;
                    }
                    case 2: {
                        typeAssets = 'transport'
                        dispatch(showLoader(actionTypes.SHOW_LOADER))
                        const res = updateAssetsIncome(actionTypes.ADD_INCOME, typeAssets, idDDList!, [objIncome])
                        res.then(e=>{   
                            dispatch(e!)
                            dispatch(addIncomeAssets(actionTypesBalance.ADD_INCOME_ASSETS, (e!.payload.asset as IAssetsTransport).income[(e!.payload.asset as IAssetsTransport).income.length-1]))
                            navigate('/balance')
                        })
                        res.catch((e) => {
                            dispatch(hideLoader(actionTypesBalance.HIDE_LOADER))
                            console.log(e)
                        })
                        break;
                    }
        
                    case 3: {
                        typeAssets = 'business'
                        dispatch(showLoader(actionTypes.SHOW_LOADER))
                        const res = updateAssetsIncome(actionTypes.ADD_INCOME, typeAssets, idDDList!, [objIncome])
                        res.then(e=>{   
                            dispatch(e!)
                            dispatch(addIncomeAssets(actionTypesBalance.ADD_INCOME_ASSETS, (e!.payload.asset as IAssetsBusiness).income[(e!.payload.asset as IAssetsBusiness).income.length-1]))
                            navigate('/balance')
                        })
                        res.catch((e) => {
                            dispatch(hideLoader(actionTypesBalance.HIDE_LOADER))
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
            if(category===2) { //проект
                
            }
            
        }
    }

    return (
        <>
        <Background imgBckg={walletBckg}/>
        {modalVisible && store.balance && 
            <Modal onClose={()=>setModalVisible(false)}>
                <SelectCardModal data={store.balance.card_list} onClose={closeSelectCarModal}/>
            </Modal>
        }
        <div className="add-income-page">
            <div className="add-income-page__container" >
                <div className="add-income-page__header">
                    <div className="add-income-page__title">Новая операция</div>
                </div>
                <div className="add-income-page__content">
                    <div className="add-income-page__finance-block-wrapper">
                        <div className="add-income-page__finance-block">
                            <div className="add-income-page__categories">
                                <ExpenseCategories categories={categories} onChangeCategory={setCategory} categoryActive={category}/>
                            </div>
                            <div className="add-income-page__sum">
                                <InputExpenseSum length={10} value={valueSum} setValue={setValueSum} setAlert={setAlertSum}/>
                            </div>
                            <div className="add-income-page__block-title">Куда зачислить?</div>
                            <ExpenseSliderFinance onClickItem={setIdCard} favoriteCards={cardList} showAddCardModal={()=>setModalVisible(true)}/>
                        </div>
                    </div>
                    <div className="add-income-page__spend-block-wrapper">
                        <div className="add-income-page__spend-block">
                            {category === 0 && 
                                <>
                                    <div className="add-income-page__block-title">С какой работы?</div>
                                    <IncomeJob setTextArea={setCommentJob} data={listJobBlock} onClickPosition={clickPositionJob} onAddPosition={addPositionJob}/>                                    
                                </>
                            }
                            {category === 2 && 
                                <>
                                    <div className="add-income-page__block-title">С какого проекта?</div>
                                    <IncomeJob setTextArea={()=>null} data={listProjectBlock} onClickPosition={clickPositionProject} onAddPosition={addPositionProject}/>
                                </>
                            } 
                            {category === 1 && 
                                <>
                                    <div className="add-income-page__block-title">Категория актива:</div>
                                    <IncomeAssets activeCategory={activeCategory} onClickItem={clickItemCategoryAssets} onSetActiveCategory={setActiveCategory}/>
                                    {positionOfCategoryAssets && activeCategory && 
                                        <div className="add-income-page__position">
                                            <div className="add-income-page__block-title">Выберите позицию:</div>
                                            <div className="add-income-page__ddlist">
                                                <ExpenseDropDownList idContent="addExpense-addIncome-DDL-content" idTitle="addExpense-addIncome-DDL-title" data={positionOfCategoryAssets} setValue={(val: string, id: number)=>{
                                                    setValueDDList(val)
                                                    setIdDDList(id)
                                                }} value={valueDDList} placeholder={'Выберите актив'}/>
                                            </div>
                                            
                                        </div> 
                                    }
                                </>
                            } 
                        </div>
                    </div>
                </div>
                <div className="add-income-page__btns">
                    <Link to="/balance" className="cancel-btn add-income-page__cancel-btn">Отменить</Link>
                    <div className={`add-income-page__add-btn${nextBtnVisible?'--active':''}`} onClick={onAddIncome}>Подтвердить</div>
                </div>
            </div>
        </div>
        </>
    )
})
