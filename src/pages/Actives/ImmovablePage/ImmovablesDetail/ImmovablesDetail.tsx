import { useContext, useEffect, useState } from "react"
import "./ImmovablesDetail.scss"
import { Link, useNavigate, useParams } from "react-router-dom"
import "../../../../widgets/elements/buttons/BlueBtn/blueBtn.css"
import { Modal } from "../../../../widgets/elements/Modal/Modal.tsx"
import { ImmovableDto } from "../../../../app/types/dto/DtoTypes.ts"
import { MultiAxisLineChart } from "../../../../widgets/Chart/MultiAxisLineChart/MultiAxisLineChart.tsx"
import { IExpenseBalance, IIncomeBalance } from "../../../../app/types/balance/IBalance.ts"
// import { Card } from "../../../../app/types/dto/DtoTypes.ts"
import { SpinnerLoader } from "../../../../widgets/elements/SpinnerLoader/SpinnerLoader.tsx"
import { RemoveAssetsLiabilitiesModal } from "../../../../widgets/elements/Modal/RemoveAssetsLiabilitiesModal/RemoveAssetsLiabilitiesModal.tsx"

import homeImg from "../../../../shared/assets/img/assets/home.png"
import { observer } from "mobx-react-lite"
import { Context } from "../../../../main.tsx"
import { Button } from "../../../../shared/ui/Buttons/Button.tsx"

export const ImmovablesDetail = observer(() => {
    const store = useContext(Context).activesStore
    const [historyVisible, setHistoryVisible] = useState(false)
    const {id} = useParams()
    const navigate = useNavigate()
    const [property, setProperty] = useState<ImmovableDto | null>(null)
    const [removeModalVisible, setRemoveModalVisible] = useState(false)
    const [incomes, setIncomes] = useState<IIncomeBalance[]>([])
    const [expenses, setExpenses] = useState<IExpenseBalance[]>([])

    useEffect(()=>{
        const elem = store.actives && store.actives.properties ? store.actives?.properties.properties.find((el: any) => el.id === Number(id)) : null
        setProperty(elem!)   
        let incomesTmp: IIncomeBalance[] = []
        elem!.income.forEach(el=>{
            let date = new Date(el.created_at!)
            const dateNow = new Date()
            if(date.getFullYear()===dateNow.getFullYear() && date.getMonth() === dateNow.getMonth()) {
                incomesTmp.push(el)
            }
        })
        setIncomes(incomesTmp)
    },[store.actives?.properties?.properties])

    useEffect(()=>{
        const elem = store.actives && 
                     store.actives.properties ? 
                     store.actives?.properties.properties.find((el: any) => el.id === Number(id)) : 
                     null

        setProperty(elem!)   
        let expensesTmp: IIncomeBalance[] = []
        elem!.expenses.forEach(el=>{
            let date = new Date(el.created_at!)
            const dateNow = new Date()
            if(date.getFullYear()===dateNow.getFullYear() && date.getMonth() === dateNow.getMonth()) {
                // expensesTmp.push(el)
            }
        })
        setExpenses(expensesTmp)
    },[store.actives?.properties?.properties])

    const removeItem = () => {
        if(id) {
            const response = store.removeImmovables(id)
            store.setLoading(true)
            response.then(res => {
                if(res.status >= 200 && res.status < 300) {
                    store.setLoading(false)
                    navigate("/assets/property")
                    return store.fetchActives()
                }
            }).catch(error => {
                store.setError(error)
            })
        }
        
        // if(sum && card) {
        //     const response = store.removeImmovables(id)
        //     store.setLoading(true)
        //     response.then(res => {
        //         if(res.status >= 200 && res.status < 300) {
        //             setRemoveModalVisible(false)
        //             navigate("/assets/property")
        //             store.setLoading(false)
        //             return res.data
        //         }
        //     }).catch(error => {
        //         store.setError(error)
        //     })
        // } else {
        //     const response = store.removeImmovables(`${property?.id}`)
        //     store.setLoading(true)
        //     response.then(res => {
        //         if(res.status >= 200 && res.status < 300) {
        //             setRemoveModalVisible(false)
        //             navigate("/assets/property")
        //             store.setLoading(false)
        //             return res.data
        //         }
        //     }).catch(error => {
        //         store.setError(error)
        //     })
        // }
    }

    return (
        <>
        {removeModalVisible && 
            <Modal onClose={()=>setRemoveModalVisible(false)}>
                <RemoveAssetsLiabilitiesModal onClose={()=>setRemoveModalVisible(false)} onRemoveItem={removeItem}/>
            </Modal>
        }
        
        <SpinnerLoader loading={store.loading} />
        <section className="immovables__detail-page">
            <div className="container" >
                <div className="immovables__detail-content">
                    <div className="property-item-page__about-block">
                        <picture className="property-item-page__img-wrapper">
                            <img className="property-item-page__img" src={homeImg} alt="homeImg"/>
                        </picture>
                        <b className="property-item-page__name">{property && property.name}</b>
                        <div className="property-item-page__address">{`${property?.city}, ${property?.street}`}</div>
                    </div>
                    <div className="property-item-page__info-block">
                        {historyVisible &&
                            <div className="property-item-page__history-title">История операций</div>
                        }
                        <div className="property-item__actions-drop-down">
                            <b>...</b>
                            <div className="property-item__actions-list">
                                <Link to="edit" className="property-item__action-item">Редактировать</Link>
                                <Button
                                    textButton='Удалить'
                                    type="button"
                                    className="property-item__action-item"
                                    onClick={removeItem}
                                    name="delete"
                                />
                                {/* <button className="property-item__action-item" onClick={()=>setRemoveModalVisible(true)}>Удалить</div> */}
                            </div>
                        </div>
                        {!historyVisible && 
                        <>
                            <ul className="property-item-page__items">
                                <li className="property-item-page__info">
                                    <h3 className="property-item-page__info-title">Цена покупки:</h3>
                                    <b className="property-item-page__info-value">{property && property.bought_price.toLocaleString()} ₽</b>
                                </li>
                                <li className="property-item-page__info">
                                    <h3 className="property-item-page__info-title">Актуальная стоимость:</h3>
                                    <b className="property-item-page__info-value">{property && property.actual_price.toLocaleString()} ₽</b>
                                </li>
                                <li className="property-item-page__info">
                                    <h3 className="property-item-page__info-title">Прирост стоимости:</h3>
                                    <b className="property-item-page__info-value">{property && property.average_profit} %</b>
                                </li>
                                <li className="property-item-page__info">
                                    <h3 className="property-item-page__info-title">Доход / месяц:</h3>
                                    <b className="property-item-page__info-value">{property && property.month_income.toLocaleString()} ₽</b>
                                </li>
                                <li className="property-item-page__info">
                                    <h3 className="property-item-page__info-title">Расход / месяц:</h3>
                                    <b className="property-item-page__info-value">{property && property.month_expense.toLocaleString()} ₽</b>
                                </li>
                                <li className="property-item-page__info">
                                    <h3 className="property-item-page__info-title">Прибыль / месяц:</h3>
                                    <b className="property-item-page__info-value">{(property!==null && (property.month_income - property.month_expense)).toLocaleString()} ₽</b>
                                </li>
                            </ul>
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
                    <Link to="/assets/property" className="cancel-btn property-item-page__cancel-btn">Назад</Link>
                </div>
            </div>
        </section>
    </>
    )
})