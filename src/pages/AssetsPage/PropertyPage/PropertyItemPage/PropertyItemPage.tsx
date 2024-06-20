import { useEffect, useState } from "react"
import "./propertyItemPage.css"
import { Link, useNavigate, useParams } from "react-router-dom"
import "../../../../widgets/elements/buttons/BlueBtn/blueBtn.css"
import { Modal } from "../../../../widgets/elements/Modal/Modal"
import { useTypedSelector } from "../../../../features/hooks/useTypedSelector" 
import { useDispatch } from "react-redux"
import { getAssets, hideLoader, removeProperty, showLoader } from "../../../../app/store/actions/assets/assetsActions"
import { actionTypes } from "../../../../app/store/types/types"
import { IAssetsProperty } from "../../../../app/types/assets/IAssets"
import { Background } from "../../../../widgets/elements/Background/Background"
import { MultiAxisLineChart } from "../../../../widgets/Chart/MultiAxisLineChart/MultiAxisLineChart"
import { ICard, IExpenseBalance, IIncomeBalance } from "../../../../app/types/balance/IBalance"
import { SpinnerLoader } from "../../../../widgets/elements/SpinnerLoader/SpinnerLoader"
import { RemoveAssetsLiabilitiesModal } from "../../../../widgets/elements/Modal/RemoveAssetsLiabilitiesModal/RemoveAssetsLiabilitiesModal"

import homeImg from "../../../../shared/assets/img/assets/home.png"
import assetsBckg from '../../../../shared/assets/img/assets/assetsBckg.png'

export function PropertyItemPage() {
    const [historyVisible, setHistoryVisible] = useState(false)
    const {id} = useParams()
    const navigate = useNavigate()
    const [property, setProperty] = useState<IAssetsProperty | null>(null)
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
            const elem = state.assets && state.assets.properties ? state.assets?.properties.properties.find((el: any) => el.id === Number(id)) : null
            setProperty(elem!)   
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
    },[state.assets?.properties?.properties])

    useEffect(()=>{
        if(state.assets!==null) {
            const elem = state.assets && state.assets.properties ? state.assets?.properties.properties.find((el: any) => el.id === Number(id)) : null
            setProperty(elem!)   
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
    },[state.assets?.properties?.properties])

    const removeItem = (sum?: number, card?: ICard) => {
        if(sum && card) {
            dispatch(showLoader(actionTypes.SHOW_LOADER))
            removeProperty(actionTypes.REMOVE_PROPERTY, property?.id!)
            .then(e => {
                dispatch(e!)
                setRemoveModalVisible(false)
                navigate("/assets/property")
            })
            .catch((e) => {
                dispatch(hideLoader(actionTypes.HIDE_LOADER))
                console.log(e)
            })
        } else {
            dispatch(showLoader(actionTypes.SHOW_LOADER))
            removeProperty(actionTypes.REMOVE_PROPERTY, property?.id!)
            .then(e => {
                dispatch(e!)
                setRemoveModalVisible(false)
                navigate("/assets/property")
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
                {/* <DeleteModal link="/assets/property" onClose={()=>setRemoveModalVisible(false)} onRemove={removeItem}/> */}
                {/* <ConfirmModal title="Удаление недвижимости" text="Вы действительно хотите удалить недвижимость?" onClose={removePropertyItem}/> */}
            </Modal>
        }
        <Background imgBckg={assetsBckg}/>
        <SpinnerLoader loading={state.loading} />
        <div className="property-item-page">
            <div className="property-item-page__container" >
                <div className="property-item-page__title">Недвижимость</div>
                <div className="property-item-page__content">
                    <div className="property-item-page__about-block">
                        <picture className="property-item-page__img-wrapper">
                            <img className="property-item-page__img" src={homeImg} alt="homeImg"/>
                        </picture>
                        <b className="property-item-page__name">{property && property.name}</b>
                        <div className="property-item-page__address">{property && ((!property.address || property.address==='')?'--':property.address)}</div>
                    </div>
                    <div className="property-item-page__info-block">
                        {historyVisible &&
                            <div className="property-item-page__history-title">История операций</div>
                        }
                        <div className="property-item__actions-drop-down">
                            <b>...</b>
                            <div className="property-item__actions-list">
                                <Link to="edit" className="property-item__action-item">Редактировать</Link>
                                <div className="property-item__action-item" onClick={()=>setRemoveModalVisible(true)}>Удалить</div>
                            </div>
                        </div>
                        {!historyVisible && 
                        <>
                            <div className="property-item-page__items">
                                <div className="property-item-page__info">
                                    <div className="property-item-page__info-title">Цена покупки:</div>
                                    <b className="property-item-page__info-value">{property && property.bought_price.toLocaleString()} ₽</b>
                                </div>
                                <div className="property-item-page__info">
                                    <div className="property-item-page__info-title">Актуальная стоимость:</div>
                                    <b className="property-item-page__info-value">{property && property.actual_price.toLocaleString()} ₽</b>
                                </div>
                                <div className="property-item-page__info">
                                    <div className="property-item-page__info-title">Прирост стоимости:</div>
                                    <b className="property-item-page__info-value">{property && property.average_profit} %</b>
                                </div>
                                <div className="property-item-page__info">
                                    <div className="property-item-page__info-title">Доход / месяц:</div>
                                    <b className="property-item-page__info-value">{property && property.month_income.toLocaleString()} ₽</b>
                                </div>
                                <div className="property-item-page__info">
                                    <div className="property-item-page__info-title">Расход / месяц:</div>
                                    <b className="property-item-page__info-value">{property && property.month_expense.toLocaleString()} ₽</b>
                                </div>
                                <div className="property-item-page__info">
                                    <div className="property-item-page__info-title">Прибыль / месяц:</div>
                                    <b className="property-item-page__info-value">{(property!==null && (property.month_income - property.month_expense)).toLocaleString()} ₽</b>
                                </div>
                                {/* <div className="property-item-page__info">
                                    <div className="property-item-page__info-title">Средняя прибыль:</div>
                                    <b className="property-item-page__info-value">{property && property.average_profit.toLocaleString()} ₽</b>
                                </div> */}
                            </div>
                            <div className="property-item-page__graphic">
                                {property && 
                                    <MultiAxisLineChart incomes={incomes} expenses={expenses}/>
                                }
                            </div>
                        </>
                        }
                        <div className="property-item-page__actions">
                            <button className="property-item-page__history-btn" onClick={()=>setHistoryVisible(!historyVisible)}>{historyVisible?"Скрыть":"Показать"} историю</button>
                            <Link to="inventory" className="property-item-page__inventory-btn">Инвентаризация</Link>
                        </div>
                    </div>
                </div>
                <div className="property-item-page__btns">
                    <Link to="/assets/property" className="cancel-btn property-item-page__cancel-btn">Отменить</Link>
                    <button className="property-item-page__add-btn" type="submit">Подтвердить</button>
                </div>
            </div>
        </div>
    </>
    )
}