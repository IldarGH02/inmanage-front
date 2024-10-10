import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { Modal } from "../../../../widgets/elements/Modal/Modal.tsx"
import { MultiAxisLineChart } from "../../../../widgets/Chart/MultiAxisLineChart/MultiAxisLineChart.tsx"
import { Business } from "../../../../app/types/actives/business/BusinessTypes.ts"
import { IExpenseBalance, IIncomeBalance } from "../../../../app/types/balance/IBalance.ts"
import { Card } from "../../../../app/types/dto/DtoTypes.ts"
import { SpinnerLoader } from "../../../../widgets/elements/SpinnerLoader/SpinnerLoader.tsx"
import { RemoveAssetsLiabilitiesModal } from "../../../../widgets/elements/Modal/RemoveAssetsLiabilitiesModal/RemoveAssetsLiabilitiesModal.tsx"

import "./businessItemPage.css"

import homeImg from "../../../../shared/assets/img/assets/home.png"
import { Context } from "../../../../main.tsx"
import { SaleAndRemoveForm } from "../../../../widgets/forms/actives/transport/SaleAndRemoveForm/SaleAndRemoveForm.tsx"
import { ConfirmModal } from "../../../../widgets/elements/Modal/ConfirmModal/ConfirmModal.tsx"
import { observer } from "mobx-react-lite"

export const BusinessDetail = observer(() => {
    const { activesStore, immovablesStore } = useContext(Context).rootStore
    const [historyVisible, setHistoryVisible] = useState(false)
    const {id} = useParams()
    const navigate = useNavigate()
    const [business, setBusiness] = useState<Business | null>(null)
    const [removeModalVisible, setRemoveModalVisible] = useState(false)
    const [incomes, setIncomes] = useState<IIncomeBalance[]>([])
    const [expenses, setExpenses] = useState<IExpenseBalance[]>([])

    useEffect(()=>{
        if(activesStore.actives !== null) {
            const elem = activesStore.actives && activesStore.actives.businesses ? activesStore.actives?.businesses.businesses.find(
                (el) => el.id === Number(id)) : null
                setBusiness(elem!)   
                let incomesTmp: IIncomeBalance[] = []
                if(elem) {
                    elem.income.forEach(el=>{
                        let date = new Date(el.created_at!)
                        const dateNow = new Date()
                        if(date.getFullYear()===dateNow.getFullYear() && date.getMonth() === dateNow.getMonth()) {
                            incomesTmp.push(el)
                        }
                    })
                }
            setIncomes(incomesTmp)
        }
    },[activesStore.actives])

    useEffect(()=>{
        if(activesStore.actives!==null) {
            const elem = activesStore.actives && activesStore.actives.businesses ? activesStore.actives?.businesses.businesses.find((el) => el.id === Number(id)) : null
            setBusiness(elem!)   
            let expensesTmp: IIncomeBalance[] = []
            elem!.expenses.forEach(el=>{
                let date = new Date(el.created_at!)
                const dateNow = new Date()
                if(date.getFullYear()===dateNow.getFullYear() && date.getMonth() === dateNow.getMonth()) {
                    // expensesTmp.push(el)
                }
            })
            setExpenses(expensesTmp)
        }
    },[activesStore.actives?.businesses?.businesses])

    const removePropertyItem = (flag: boolean) => {
        if(flag) {
            const response = immovablesStore.removeImmovables(String(business?.id))
            activesStore.setLoading(true)
            response.then(res => {
                if(res.status >= 200 && res.status < 300) {
                    navigate("/actives/business")
                    activesStore.setLoading(false)
                }
            }).catch(error => activesStore.setError(error))
        }
    }

    const removeBusiness = (sum?: number, card?: Card) => {
        if(sum && card) {
            const response = activesStore.removeBusiness(String(business?.id))
            activesStore.setLoading(true)
            response.then(res => {
                if(res.status >= 200 && res.status < 300) {
                    activesStore.setLoading(false)
                    setRemoveModalVisible(false)
                    navigate("/assets/business")
                }
            }).catch(error => activesStore.setError(error))
        }
    }

    return (
        <>
            <SpinnerLoader loading={activesStore.loading} />
            {removeModalVisible && 
                <Modal onClose={()=>setRemoveModalVisible(false)}>
                    <RemoveAssetsLiabilitiesModal onClose={()=>setRemoveModalVisible(false)} onRemoveItem={removeBusiness}/>
                    <SaleAndRemoveForm/>
                    <ConfirmModal title="Удаление недвижимости" text="Вы действительно хотите удалить недвижимость?" onClose={removePropertyItem}/>
                </Modal>
            }  
            <div className="business-item-page">
                <div className="container" >
                    <div className="business-item-page__title">Бизнес</div>
                    <div className="business-item-page__content">
                        <div className="business-item-page__about-block">
                            <picture className="business-item-page__img-wrapper">
                                <img className="business-item-page__img" src={homeImg} alt="homeImg"/>
                            </picture>
                            <b className="business-item-page__name">{business && business.name}</b>
                            <div className="business-item-page__address">{business && ((!business.address || business.address==='')?'--' : business.address)}</div>
                        </div>
                        <div className="business-item-page__info-block">
                            {historyVisible &&
                                <div className="business-item-page__history-title">История операций</div>
                            }
                            <div className="business-item__actions-drop-down">
                                <b>...</b>
                                <div className="business-item__actions-list">
                                    <Link className="business-item__action-item" to={"edit"}>Редактировать</Link>
                                    <div className="business-item__action-item" onClick={() => removeBusiness()}>Удалить</div>
                                </div>
                            </div>
                            {!historyVisible && 
                            <>
                                <div className="business-item-page__items">
                                    <div className="business-item-page__info">
                                        <h3 className="business-item-page__info-title">Процент долевого участия:</h3>
                                        <b className="business-item-page__info-value">{business && business.participation_percent} %</b>
                                    </div>
                                    <div className="business-item-page__info">
                                        <div className="business-item-page__info-title">Собственные средства:</div>
                                        <b className="business-item-page__info-value">{business && business.own_funds_amount} ₽</b>
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
                                <Link to="inventory" className="business-item-page__inventory-btn">Инвентаризация</Link>
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
})
