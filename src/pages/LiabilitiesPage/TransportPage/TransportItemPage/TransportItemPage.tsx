// import React, { useEffect, useState } from "react"
// import "./transportItemPage.css"
// import { Link, useNavigate, useParams } from "react-router-dom"

// import { Modal } from "../../../../widgets/elements/Modal/Modal"
// import { useTypedSelector } from "../../../../features/hooks/useTypedSelector"
// import { useDispatch } from "react-redux"
// import { getLiabilities, hideLoader, removeTransport, showLoader } from "../../../../app/store/actions/liabilities/liabilitiesActions"
// import { ILiabilitiesTransport } from "../../../../app/types/liabilities/LiabilitiesType"
// import { Background } from "../../../../widgets/elements/Background/Background"
// import { MultiAxisLineChart } from "../../../../widgets/Chart/MultiAxisLineChart/MultiAxisLineChart"
// import { ICard, IExpenseBalance, IIncomeBalance } from "../../../../app/types/balance/IBalance"
// import { SpinnerLoader } from "../../../../widgets/elements/SpinnerLoader/SpinnerLoader"
// import { actionTypesLiabilities } from "../../../../app/store/types/liabilitiesTypes"
// import { RemoveAssetsLiabilitiesModal } from "../../../../widgets/elements/Modal/RemoveAssetsLiabilitiesModal/RemoveAssetsLiabilitiesModal"

// import liabilitiesBckg from '../../../../shared/assets/img/assets/assetsBckg.png'
// import transportImg from '../../../../shared/assets/img/assets/transportItem.png'

// export function TransportItemPage() {
//     const {id} = useParams()
//     const navigate = useNavigate()
//     const [transport, setTransport] = useState<ILiabilitiesTransport | null>(null)
//     const state = useTypedSelector(state => state.liabilitiesReducer)
//     const dispatch = useDispatch()
//     const [removeModalVisible, setRemoveModalVisible] = useState(false)
//     const [expenses, setExpenses] = useState<IExpenseBalance[]>([])

//     useEffect(()=>{
//         if(state.liabilities === null) {
//             dispatch(showLoader(actionTypesLiabilities.SHOW_LOADER_LIABILITIES))
//             const res = getLiabilities(actionTypesLiabilities.GET_LIABILITIES)
//             res.then(e => {
//                 dispatch(e!);
//             })
//             .catch((e) => {
//                 dispatch(hideLoader(actionTypesLiabilities.HIDE_LOADER_LIABILITIES))
//                 console.log(e)
//             })
//         }
//     },[])

//     useEffect(()=>{
//         if(state.liabilities!==null) {
//             const elem = state.liabilities && state.liabilities.transports ? state.liabilities?.transports.transport.find((el:any)=>el.id===Number(id)) : null
//             setTransport(elem!)   
//             let expensesTmp: IIncomeBalance[] = []
//             elem!.expenses.forEach((el:any)=>{
//                 let date = new Date(el.created_at!)
//                 const dateNow = new Date()
//                 if(date.getFullYear()===dateNow.getFullYear() && date.getMonth() === dateNow.getMonth()) {
//                     expensesTmp.push(el)
//                 }
//             })
//             setExpenses(expensesTmp)
//         }
//     },[state.liabilities?.transports?.transport])

//     // const removeTransportItem = (flag: boolean) => {
//     //     if(flag) {
//     //         dispatch(showLoader(actionTypesLiabilities.SHOW_LOADER_LIABILITIES))
//     //         removeTransport(actionTypesLiabilities.REMOVE_PROPERTY_LIABILITIES, transport?.id!)
//     //         .then(e => {
//     //             dispatch(e!)
//     //             navigate("/liabilities/transport")
//     //         })
//     //         .catch((e) => {
//     //             dispatch(hideLoader(actionTypesLiabilities.HIDE_LOADER_LIABILITIES))
//     //             console.log(e)
//     //         })
//     //     }
//     // }

//     const removeItem = (sum?: number, card?: ICard) => {
//         if(sum && card) {
//             dispatch(showLoader(actionTypesLiabilities.SHOW_LOADER_LIABILITIES))
//             removeTransport(actionTypesLiabilities.REMOVE_PROPERTY_LIABILITIES, transport?.id!)
//             .then(e => {
//                 dispatch(e!)
//                 setRemoveModalVisible(false)
//                 navigate("/liabilities/transport")
//             })
//             .catch((e) => {
//                 dispatch(hideLoader(actionTypesLiabilities.HIDE_LOADER_LIABILITIES))
//                 console.log(e)
//             })
//         } else {
//             dispatch(showLoader(actionTypesLiabilities.SHOW_LOADER_LIABILITIES))
//             removeTransport(actionTypesLiabilities.REMOVE_TRANSPORT_LIABILITIES, transport?.id!)
//             .then(e => {
//                 dispatch(e!)
//                 setRemoveModalVisible(false)
//                 navigate("/liabilities/transport")
//             })
//             .catch((e) => {
//                 dispatch(hideLoader(actionTypesLiabilities.HIDE_LOADER_LIABILITIES))
//                 console.log(e)
//             })
//         }
//     }

//     return (
//         <>
//         {removeModalVisible && 
//             <Modal onClose={()=>setRemoveModalVisible(false)}>
//                 <RemoveAssetsLiabilitiesModal onClose={()=>setRemoveModalVisible(false)} onRemoveItem={removeItem}/>
//                 {/* <DeleteModal link="/liabilities/transport" onClose={()=>setRemoveModalVisible(false)} onRemove={removeItem}/> */}
//                 {/* <ConfirmModal title="Удаление транспорта" text="Вы действительно хотите удалить транспорт?" onClose={removeTransportItem}/> */}
//             </Modal>
//         }
//         <Background imgBckg={liabilitiesBckg}/>
//         <SpinnerLoader loading={state.loading} />
//         <div className="transport-item-page">
//             <div className="transport-item-page__container" >
//                 <div className="transport-item-page__title">Транспорт</div>
//                 <div className="transport-item-page__content">
//                     <div className="transport-item-page__about-block">
//                         <picture className="transport-item-page__img-wrapper">
//                             <img className="transport-item-page__img" src={transportImg} alt="transportImg"/>
//                         </picture>
//                         <b className="transport-item-page__name">{transport && transport.mark +' '+ transport.model}</b>
//                         {/* <div className="transport-item-page__address">{transport && ((!transport.address || transport.address==='')?'--':transport.address)}</div> */}
//                     </div>
//                     <div className="transport-item-page__info-block">
//                         <div className="transport-item__actions-drop-down">
//                             <b>...</b>
//                             <div className="transport-item__actions-list">
//                                 <Link to="edit" className="transport-item__action-item">Редактировать</Link>
//                                 <div className="transport-item__action-item" onClick={()=>setRemoveModalVisible(true)}>Удалить</div>
//                             </div>
//                         </div>
//                         <div className="transport-item-page__items">
//                             <div className="transport-item-page__info">
//                                 <div className="transport-item-page__info-title">Цена покупки:</div>
//                                 <b className="transport-item-page__info-value">{transport && transport.bought_price.toLocaleString(undefined, {minimumFractionDigits: 1})} ₽</b>
//                             </div>
//                             <div className="transport-item-page__info">
//                                 <div className="transport-item-page__info-title">Расход:</div>
//                                 <b className="transport-item-page__info-value">{transport && transport.total_expense.toLocaleString(undefined, {minimumFractionDigits: 1})} ₽</b>
//                             </div>
//                             <div className="transport-item-page__info">
//                                 <div className="transport-item-page__info-title">Год выпуска:</div>
//                                 <b className="transport-item-page__info-value">{transport && transport.year}</b>
//                             </div>
//                             <div className="transport-item-page__info">
//                                 <div className="transport-item-page__info-title">Количество владельцев:</div>
//                                 <b className="transport-item-page__info-value">{transport && transport.owner_count}</b>
//                             </div>
//                             {/* <div className="transport-item-page__info">
//                                 <div className="transport-item-page__info-title">Владелец по ПТС:</div>
//                                 <b className="transport-item-page__info-value">{transport && transport.owner}</b>
//                             </div>
//                             <div className="transport-item-page__info">
//                                 <div className="transport-item-page__info-title">VIN-номер:</div>
//                                 <b className="transport-item-page__info-value">{transport && transport.vin}</b>
//                             </div> */}
//                             <div className="transport-item-page__info">
//                                 <div className="transport-item-page__info-title">Тип собственности:</div>
//                                 <b className="transport-item-page__info-value">{transport && !transport.owner_type?'физическое':'юредическое'} лицо</b>
//                             </div>
//                             <div className="transport-item-page__info">
//                                 <div className="transport-item-page__info-title">Тип выплаты:</div>
//                                 <b className="transport-item-page__info-value">{transport && transport.loan ? 'кредит' : 'наличные средства'}</b>
//                             </div>

//                             <div className="transport-item-page__info">
//                                 <div className="transport-item-page__info-title">Назначение:</div>
//                                 <b className="transport-item-page__info-value">{transport && transport.use!==''?transport.use:'н/д'}</b>
//                             </div>
                           
//                             <div className="transport-item-page__info">
//                                 <div className="transport-item-page__info-title">Расход / месяц:</div>
//                                 <b className="transport-item-page__info-value">{transport && transport.month_expense.toLocaleString(undefined, {minimumFractionDigits: 1})} ₽</b>
//                             </div>
                            
//                             {/* <div className="transport-item-page__info">
//                                 <div className="transport-item-page__info-title">Средняя прибыль:</div>
//                                 <b className="transport-item-page__info-value">{transport && transport.average_profit.toLocaleString()} ₽</b>
//                             </div> */}
//                         </div>
//                         <div className="transport-item-page__graphic">
//                             {transport && 
//                                 <MultiAxisLineChart incomes={[]} expenses={expenses}/>
//                             }
//                         </div>
//                         <div className="transport-item-page__actions">
//                             <button className="transport-item-page__history-btn">Показать историю</button>
//                             {/* <Link to="inventory" className="transport-item-page__inventory-btn">Инвентаризация</Link> */}
//                         </div>
//                     </div>
//                 </div>
//                 <div className="transport-item-page__btns">
//                     <Link to="/liabilities/transport" className="cancel-btn transport-item-page__cancel-btn">Отменить</Link>
//                     <button className="transport-item-page__add-btn" type="submit">Подтвердить</button>
//                 </div>
//             </div>
//         </div>
//     </>
//     )
// }