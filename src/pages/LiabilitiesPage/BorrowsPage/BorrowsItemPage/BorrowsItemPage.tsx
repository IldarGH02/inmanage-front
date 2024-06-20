import React, { useEffect, useState } from "react"
import "./borrowsItemPage.css"
import { Link, useNavigate, useParams } from "react-router-dom"

import { Modal } from "../../../../widgets/elements/Modal/Modal"
import { useTypedSelector } from "../../../../features/hooks/useTypedSelector"
import { useDispatch } from "react-redux"
import { hideLoader, removeProperty, showLoader } from "../../../../app/store/actions/assets/assetsActions"
import { Background } from "../../../../widgets/elements/Background/Background"
import { ICard, IExpenseBalance } from "../../../../app/types/balance/IBalance"
import { SpinnerLoader } from "../../../../widgets/elements/SpinnerLoader/SpinnerLoader"
import { RemoveAssetsLiabilitiesModal } from "../../../../widgets/elements/Modal/RemoveAssetsLiabilitiesModal/RemoveAssetsLiabilitiesModal"
import { getLiabilities, removeBorrow } from "../../../../app/store/actions/liabilities/liabilitiesActions"
import { actionTypesLiabilities } from "../../../../app/store/types/liabilitiesTypes"
import { ILiabilitiesBorrows } from "../../../../app/types/liabilities/borrows/IBorrows"
import { EarlyRepaymentForm } from "../../../../widgets/forms/liabilities/borrows/EarlyRepaymentForm/EarlyRepaymentForm"

import loanImg from "../../../../shared/assets/img/assets/loanItem.png"
import assetsBckg from '../../../../shared/assets/img/assets/assetsBckg.png'

export function BorrowsItemPage() {
    const [historyVisible, setHistoryVisible] = useState(false)
    const {id} = useParams()
    const navigate = useNavigate()
    const [borrow, setBorrow] = useState<ILiabilitiesBorrows | null>(null)
    const state = useTypedSelector(state => state.liabilitiesReducer)
    const dispatch = useDispatch()
    const [removeModalVisible, setRemoveModalVisible] = useState(false)
    const [earlyRepaymentVisible, setEarlyRepaymentVisible] = useState(false)
    const [expenses, setExpenses] = useState<IExpenseBalance[]>([])

    useEffect(()=>{
        if(state.liabilities === null) {
            dispatch(showLoader(actionTypesLiabilities.SHOW_LOADER_LIABILITIES))
            const res = getLiabilities(actionTypesLiabilities.GET_LIABILITIES)
            res.then(e => {
                // console.log(e)
                dispatch(e!);
            })
            .catch((e) => {
                dispatch(hideLoader(actionTypesLiabilities.HIDE_LOADER_LIABILITIES))
                console.log(e)
            })
        }
        console.log(expenses)
    },[])

    useEffect(()=>{
        if(state.liabilities!==null) {
            const elem = state.liabilities && state.liabilities.borrows ? state.liabilities?.borrows.borrows.find(el => el.id === Number(id)) : null
            setBorrow(elem!)   
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
            removeBorrow(actionTypesLiabilities.REMOVE_BORROW_LIABILITIES, borrow?.id!)
            .then(e => {
                dispatch(e!)
                setRemoveModalVisible(false)
                navigate("/liabilities/borrow")
            })
            .catch((e) => {
                dispatch(hideLoader(actionTypesLiabilities.HIDE_LOADER_LIABILITIES))
                console.log(e)
            })
        } else {
            dispatch(showLoader(actionTypesLiabilities.SHOW_LOADER_LIABILITIES))
            removeProperty(actionTypesLiabilities.REMOVE_BORROW_LIABILITIES, borrow?.id!)
            .then(e => {
                dispatch(e!)
                setRemoveModalVisible(false)
                navigate("/liabilities/borrow")
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
                {/* <DeleteModal link="/assets/property" onClose={()=>setRemoveModalVisible(false)} onRemove={removeItem}/> */}
                {/* <ConfirmModal title="Удаление недвижимости" text="Вы действительно хотите удалить недвижимость?" onClose={removePropertyItem}/> */}
            </Modal>
        }
        <Background imgBckg={assetsBckg}/>
        <SpinnerLoader loading={state.loading} />
        <div className="loan-item-page">
            <div className="loan-item-page__container" >
                <div className="loan-item-page__title">Займ</div>
                <div className="loan-item-page__content">
                    <div className="loan-item-page__about-block">
                        <picture className="loan-item-page__img-wrapper">
                            <img className="loan-item-page__img" src={loanImg} alt="homeImg"/>
                        </picture>
                        <b className="loan-item-page__name">{borrow && borrow.name}</b>
                        {/* <div className="loan-item-page__address">{borrow && ((!borrow.address || borrow.address==='')?'--':borrow.address)}</div> */}
                    </div>
                    {earlyRepaymentVisible && <EarlyRepaymentForm onClose={()=>setEarlyRepaymentVisible(false)}/>}
                    {!earlyRepaymentVisible &&
                        <div className="loan-item-page__info-block">
                            {historyVisible &&
                                <div className="loan-item-page__history-title">История операций</div>
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
                                <div className="loan-item-page__items">
                                    <div className="loan-item-page__info">
                                        <div className="loan-item-page__info-title">Сумма займа:</div>
                                        <b className="loan-item-page__info-value">{borrow ? borrow.sum.toLocaleString():0} ₽</b>
                                    </div>
                                    <div className="loan-item-page__info">
                                        <div className="loan-item-page__info-title">Срок займа:</div>
                                        <b className="loan-item-page__info-value">{borrow ? borrow.loan_term.toLocaleString():0} недели</b>
                                    </div>
                                    <div className="loan-item-page__info">
                                        <div className="loan-item-page__info-title">Платеж / месяц:</div>
                                        <b className="loan-item-page__info-value">{borrow ? borrow.month_payment.toLocaleString():0} ₽</b>
                                    </div>
                                    <div className="loan-item-page__info">
                                        <div className="loan-item-page__info-title">Остаток:</div>
                                        <b className="loan-item-page__info-value">{borrow ? borrow.remainder.toLocaleString():0} ₽</b>
                                    </div>
                                </div>
                                <button className="loan-item-page__early-btn" type="submit">Досрочное погашение</button>
                                <div className="loan-item-page__progress-bar">
                                    {true && 
                                    <>
                                        <div className="loan-item-page-progress-bar__title">Прогесс погашения</div>
                                        <div className="loan-item-page-progress-bar__line">
                                            <div className="loan-item-page-progress-bar__line-progress" style={{width:`${40<8?'7':'40'}%`}}>
                                                <b className="loan-item-page-progress-bar__percent">{40} %</b>
                                            </div>
                                        </div>
                                        <div className="loan-item-page-progress-bar__info">
                                            <div className="loan-item-page-progress-bar__info-color"></div>
                                            <div className="loan-item-page-progress-bar___info-title">Процент погашения</div>
                                        </div>
                                    </>
                                    }
                                </div>
                            </>
                            }
                            <div className="loan-item-page__actions">
                                <button className="loan-item-page__history-btn" onClick={()=>setHistoryVisible(!historyVisible)}>{historyVisible?"Скрыть":"Показать"} историю</button>
                            </div>
                        </div>
                    }
                </div>
                {!earlyRepaymentVisible && 
                    <div className="loan-item-page__btns">
                        <Link to="/liabilities/borrow" className="cancel-btn loan-item-page__cancel-btn">Отменить</Link>
                        <button className="loan-item-page__add-btn" type="submit">Подтвердить</button>
                    </div>
                }
            </div>
        </div>
    </>
    )
}