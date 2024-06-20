import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { Modal } from "../../../../widgets/elements/Modal/Modal"
import { useTypedSelector } from "../../../../features/hooks/useTypedSelector" 
import { useDispatch } from "react-redux"
import { getAssets, hideLoader, removeBusiness, showLoader } from "../../../../app/store/actions/assets/assetsActions"
import { actionTypes } from "../../../../app/store/types/types"
import { IAssetsBusiness } from "../../../../app/types/assets/IAssets"
import { Background } from "../../../../widgets/elements/Background/Background"
import { MultiAxisLineChart } from "../../../../widgets/Chart/MultiAxisLineChart/MultiAxisLineChart"
import { ICard, IExpenseBalance, IIncomeBalance } from "../../../../app/types/balance/IBalance"
import { SpinnerLoader } from "../../../../widgets/elements/SpinnerLoader/SpinnerLoader"
import { RemoveAssetsLiabilitiesModal } from "../../../../widgets/elements/Modal/RemoveAssetsLiabilitiesModal/RemoveAssetsLiabilitiesModal"

import "./businessItemPage.css"

import homeImg from "../../../../shared/assets/img/assets/home.png"
import assetsBckg from '../../../../shared/assets/img/assets/assetsBckg.png'

export function BusinessItemPage() {
    const [historyVisible, setHistoryVisible] = useState(false)
    const {id} = useParams()
    const navigate = useNavigate()
    const [business, setBusiness] = useState<IAssetsBusiness | null>(null)
    const state = useTypedSelector(state => state.assetsReducer)
    const dispatch = useDispatch()
    const [removeModalVisible, setRemoveModalVisible] = useState(false)
    const [incomes, setIncomes] = useState<IIncomeBalance[]>([])
    const [expenses, setExpenses] = useState<IExpenseBalance[]>([])

    useEffect(()=>{
        if(state.assets === null) {
            dispatch(showLoader(actionTypes.SHOW_LOADER))
            const res = getAssets(actionTypes.GET_ASSETS)
            res.then(e => {
                // console.log(e)
                dispatch(e!);
            })
            .catch((e) => {
                dispatch(hideLoader(actionTypes.HIDE_LOADER))
                console.log(e)
            })
        }
    },[])

    useEffect(()=>{
        if(state.assets!==null) {
            const elem = state.assets && state.assets.businesses ? state.assets?.businesses.businesses.find((el:any) => el.id === Number(id)) : null
            setBusiness(elem!)   
            let incomesTmp: IIncomeBalance[] = []
            // elem!.income.forEach(el=>{
            //     let date = new Date(el.created_at!)
            //     const dateNow = new Date()
            //     if(date.getFullYear()===dateNow.getFullYear() && date.getMonth() === dateNow.getMonth()) {
            //         incomesTmp.push(el)
            //     }
            // })
            setIncomes(incomesTmp)
        }
    },[state.assets?.businesses?.businesses])

    useEffect(()=>{
        if(state.assets!==null) {
            const elem = state.assets && state.assets.businesses ? state.assets?.businesses.businesses.find((el:any) => el.id === Number(id)) : null
            setBusiness(elem!)   
            let expensesTmp: IIncomeBalance[] = []
            // elem!.expenses.forEach(el=>{
            //     let date = new Date(el.created_at!)
            //     const dateNow = new Date()
            //     if(date.getFullYear()===dateNow.getFullYear() && date.getMonth() === dateNow.getMonth()) {
            //         expensesTmp.push(el)
            //     }
            // })
            setExpenses(expensesTmp)
        }
    },[state.assets?.businesses?.businesses])

    // const removePropertyItem = (flag: boolean) => {
    //     if(flag) {
    //         dispatch(showLoader(actionTypes.SHOW_LOADER))
    //         removeProperty(actionTypes.REMOVE_PROPERTY, business?.id!)
    //         .then(e => {
    //             dispatch(e!)
    //             navigate("/assets/business")
    //         })
    //         .catch((e) => {
    //             dispatch(hideLoader(actionTypes.HIDE_LOADER))
    //             console.log(e)
    //         })
    //     }
    // }

    const removeItem = (sum?: number, card?: ICard) => {
        if(sum && card) {
            dispatch(showLoader(actionTypes.SHOW_LOADER))
            removeBusiness(actionTypes.REMOVE_BUSINESS, business?.id!)
            .then(e => {
                dispatch(e!)
                setRemoveModalVisible(false)
                navigate("/assets/business")
            })
            .catch((e) => {
                dispatch(hideLoader(actionTypes.HIDE_LOADER))
                console.log(e)
            })
        } else {
            dispatch(showLoader(actionTypes.SHOW_LOADER))
            removeBusiness(actionTypes.REMOVE_BUSINESS, business?.id!)
            .then(e => {
                dispatch(e!)
                setRemoveModalVisible(false)
                navigate("/assets/business")
            })
            .catch((e) => {
                dispatch(hideLoader(actionTypes.HIDE_LOADER))
                console.log(e)
            })
        }
    }

    return (
        <>
        {removeModalVisible && 
            <Modal onClose={()=>setRemoveModalVisible(false)}>
                <RemoveAssetsLiabilitiesModal onClose={()=>setRemoveModalVisible(false)} onRemoveItem={removeItem}/>
                {/* <DeleteModal link="/assets/business" onClose={()=>setRemoveModalVisible(false)} onRemove={removeItem}/> */}
                {/* <ConfirmModal title="Удаление недвижимости" text="Вы действительно хотите удалить недвижимость?" onClose={removePropertyItem}/> */}
            </Modal>
        }
        <Background imgBckg={assetsBckg}/>
        <SpinnerLoader loading={state.loading} />
        <div className="business-item-page">
            <div className="business-item-page__container" >
                <div className="business-item-page__title">Бизнес</div>
                <div className="business-item-page__content">
                    <div className="business-item-page__about-block">
                        <picture className="business-item-page__img-wrapper">
                            <img className="business-item-page__img" src={homeImg} alt="homeImg"/>
                        </picture>
                        <b className="business-item-page__name">{business && business.name}</b>
                        <div className="business-item-page__address">{business && ((!business.address || business.address==='')?'--':business.address)}</div>
                    </div>
                    <div className="business-item-page__info-block">
                        {historyVisible &&
                            <div className="business-item-page__history-title">История операций</div>
                        }
                        <div className="business-item__actions-drop-down">
                            <b>...</b>
                            <div className="business-item__actions-list">
                                <Link className="business-item__action-item" to={"edit"}>Редактировать</Link>
                                <div className="business-item__action-item" onClick={()=>setRemoveModalVisible(true)}>Удалить</div>
                            </div>
                        </div>
                        {!historyVisible && 
                        <>
                            <div className="business-item-page__items">
                                <div className="business-item-page__info">
                                    <div className="business-item-page__info-title">Цена покупки:</div>
                                    <b className="business-item-page__info-value">{business && business.bought_price.toLocaleString()} ₽</b>
                                </div>
                                {/* <div className="business-item-page__info">
                                    <div className="business-item-page__info-title">Актуальная стоимость:</div>
                                    <b className="business-item-page__info-value">{business && business.actual_price.toLocaleString()} ₽</b>
                                </div> */}
                                <div className="business-item-page__info">
                                    <div className="business-item-page__info-title">Прирост стоимости:</div>
                                    <b className="business-item-page__info-value">{business && business.average_profit} %</b>
                                </div>
                                <div className="business-item-page__info">
                                    <div className="business-item-page__info-title">Доход / месяц:</div>
                                    <b className="business-item-page__info-value">{business && business.month_income.toLocaleString()} ₽</b>
                                </div>
                                <div className="business-item-page__info">
                                    <div className="business-item-page__info-title">Расход / месяц:</div>
                                    <b className="business-item-page__info-value">{business && business.month_expense.toLocaleString()} ₽</b>
                                </div>
                                <div className="business-item-page__info">
                                    <div className="business-item-page__info-title">Прибыль / месяц:</div>
                                    <b className="business-item-page__info-value">{(business!==null && (business.month_income - business.month_expense)).toLocaleString()} ₽</b>
                                </div>
                                {/* <div className="business-item-page__info">
                                    <div className="business-item-page__info-title">Средняя прибыль:</div>
                                    <b className="business-item-page__info-value">{business && business.average_profit.toLocaleString()} ₽</b>
                                </div> */}
                            </div>
                            <div className="business-item-page__graphic">
                                {business && 
                                    <MultiAxisLineChart incomes={incomes} expenses={expenses}/>
                                }
                            </div>
                        </>
                        }
                        <div className="business-item-page__actions">
                            <button className="business-item-page__history-btn" onClick={()=>setHistoryVisible(!historyVisible)}>{historyVisible?"Скрыть":"Показать"} историю</button>
                            {/* <Link to="inventory" className="business-item-page__inventory-btn">Инвентаризация</Link> */}
                            <div className="business-item-page__inventory-btn">Инвентаризация</div>
                        </div>
                    </div>
                </div>
                <div className="business-item-page__btns">
                    <Link to="/assets/business" className="cancel-btn business-item-page__cancel-btn">Отменить</Link>
                    <button className="business-item-page__add-btn" type="submit">Подтвердить</button>
                </div>
            </div>
        </div>
    </>
    )
}
