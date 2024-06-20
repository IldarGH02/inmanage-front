import React, { useEffect, useState } from "react"
import "./propertyItemPage.css"
import { Link, useNavigate, useParams } from "react-router-dom"

import { Modal } from "../../../../widgets/elements/Modal/Modal"
import { useTypedSelector } from "../../../../features/hooks/useTypedSelector"
import { useDispatch } from "react-redux"
import { Background } from "../../../../widgets/elements/Background/Background"
import { MultiAxisLineChart } from "../../../../widgets/Chart/MultiAxisLineChart/MultiAxisLineChart"
import { ILiabilitiesProperty } from "../../../../app/types/liabilities/ILiabilities"
import { getLiabilities, hideLoader, removeProperty, showLoader } from "../../../../app/store/actions/liabilities/liabilitiesActions"
import { actionTypesLiabilities } from "../../../../app/store/types/liabilitiesTypes"
import { ICard, IExpenseBalance } from "../../../../app/types/balance/IBalance"
import { SpinnerLoader } from "../../../../widgets/elements/SpinnerLoader/SpinnerLoader"
import { RemoveAssetsLiabilitiesModal } from "../../../../widgets/elements/Modal/RemoveAssetsLiabilitiesModal/RemoveAssetsLiabilitiesModal"

import homeImg from "../../../../shared/assets/img/assets/home.png"
import liabilitiesBckg from '../../../../shared/assets/img/liabilities/liabilitiesBckg.png'

export function PropertyItemPage() {
    const [historyVisible, setHistoryVisible] = useState(false)
    const {id} = useParams()
    const navigate = useNavigate()
    const [property, setProperty] = useState<ILiabilitiesProperty | null>(null)
    const state = useTypedSelector(state => state.liabilitiesReducer)
    const dispatch = useDispatch()
    const [removeModalVisible, setRemoveModalVisible] = useState(false)
    const [expenses, setExpenses] = useState<IExpenseBalance[]>([])

    useEffect(()=>{
        if(state.liabilities === null) {
            dispatch(showLoader(actionTypesLiabilities.SHOW_LOADER_LIABILITIES))
            const res = getLiabilities(actionTypesLiabilities.GET_LIABILITIES)
            res.then(e => {
                dispatch(e!);
                }
            )
            .catch((e) => {
                dispatch(hideLoader(actionTypesLiabilities.HIDE_LOADER_LIABILITIES))
                console.log(e)
            })
        }
    },[])

    useEffect(()=>{
        if(state.liabilities!==null) {
            const elem = state.liabilities && state.liabilities.properties ? state.liabilities?.properties.properties.find(el => el.id === Number(id)) : null
            setProperty(elem!)   
            let expensesTmp: IExpenseBalance[] = []
            elem!.expenses.forEach(el=>{
                let date = new Date(el.created_at!)
                const dateNow = new Date()
                if(date.getFullYear()===dateNow.getFullYear() && date.getMonth() === dateNow.getMonth()) {
                    expensesTmp.push(el)
                }
            })
            setExpenses(expensesTmp)
        }
    },[state.liabilities?.properties?.properties])

    const removeItem = (sum?: number, card?: ICard) => {
        if(sum && card) {
            dispatch(showLoader(actionTypesLiabilities.SHOW_LOADER_LIABILITIES))
            removeProperty(actionTypesLiabilities.REMOVE_PROPERTY_LIABILITIES, property?.id!)
            .then(e => {
                dispatch(e!)
                setRemoveModalVisible(false)
                navigate("/liabilities/property")
            })
            .catch((e) => {
                dispatch(hideLoader(actionTypesLiabilities.HIDE_LOADER_LIABILITIES))
                console.log(e)
            })
        } else {
            dispatch(showLoader(actionTypesLiabilities.SHOW_LOADER_LIABILITIES))
            removeProperty(actionTypesLiabilities.REMOVE_PROPERTY_LIABILITIES, property?.id!)
            .then(e => {
                dispatch(e!)
                setRemoveModalVisible(false)
                navigate("/liabilities/property")
            })
            .catch((e) => {
                dispatch(hideLoader(actionTypesLiabilities.HIDE_LOADER_LIABILITIES))
                console.log(e)
            })
        }
    }

    return (
        <>
        {removeModalVisible && 
            <Modal onClose={()=>setRemoveModalVisible(false)}>
                <RemoveAssetsLiabilitiesModal onClose={()=>setRemoveModalVisible(false)} onRemoveItem={removeItem}/>
            </Modal>
        }
        <Background imgBckg={liabilitiesBckg}/>
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
                                    <b className="property-item-page__info-value">{property && property.bought_price.toFixed(1).toLocaleString()} ₽</b>
                                </div>
                                <div className="property-item-page__info">
                                    <div className="property-item-page__info-title">Актуальная стоимость:</div>
                                    <b className="property-item-page__info-value">{property && property.actual_price.toFixed(1).toLocaleString()} ₽</b>
                                </div>
                                <div className="property-item-page__info">
                                    <div className="property-item-page__info-title">Прирост стоимости:</div>
                                    <b className="property-item-page__info-value">{property && ((property.actual_price*100)/property.actual_price-100).toFixed(1)} %</b>
                                </div>
                                
                                <div className="property-item-page__info">
                                    <div className="property-item-page__info-title">Расход / месяц:</div>
                                    <b className="property-item-page__info-value">{property && property.month_expense.toFixed(1).toLocaleString()} ₽</b>
                                </div>
                                <div className="property-item-page__info">
                                    <div className="property-item-page__info-title">Остаток:</div>
                                    <b className="property-item-page__info-value">0 ₽</b>
                                </div> 
                            </div>
                            <div className="property-item-page__graphic">
                                <MultiAxisLineChart incomes={[]} expenses={expenses}/>
                            </div>
                        </>
                        }
                        <div className="property-item-page__actions">
                            <button className="property-item-page__history-btn" onClick={()=>setHistoryVisible(!historyVisible)}>{`${historyVisible?'Скрыть историю':'Показать историю'}`}</button>
                            <Link to="inventory" className="property-item-page__inventory-btn">Инвентаризация</Link>
                        </div>
                    </div>
                </div>
                <div className="property-item-page__btns">
                    <Link to="/liabilities/property" className="cancel-btn property-item-page__cancel-btn">Отменить</Link>
                    <button className="property-item-page__add-btn" type="submit">Подтвердить</button>
                </div>
            </div>
        </div>
    </>
    )
}