import {useContext, useEffect, useState} from "react"
import "./transportItemPage.css"
import { Link, useNavigate, useParams } from "react-router-dom"

import { IExpenseBalance, IIncomeBalance } from "../../../../app/types/balance/IBalance"
import { Card } from "../../../../app/types/dto/DtoTypes.ts"
import { SpinnerLoader } from "../../../../widgets/elements/SpinnerLoader/SpinnerLoader"

import transportImg from '../../../../shared/assets/img/assets/transportItem.png'
import { TransportDto } from "../../../../app/types/dto/DtoTypes.ts" 
import {observer} from "mobx-react-lite";
import {OverlayModal} from "../../../../shared/ui/Overlay/OverlayModal.tsx";
import { SaleAndRemoveForm } from "../../../../widgets/forms/actives/transport/SaleAndRemoveForm/SaleAndRemoveForm.tsx"
import {TransportInfo} from "../../../../entities/models/TransportInfo.tsx";
import {Ellipses} from "../../../../shared/ui/Ellipses/Ellipses.tsx";
import {Button} from "../../../../shared/ui/Buttons/Button.tsx";
import {Context} from "../../../../main.tsx";


export const  TransportDetail = observer(() => {
    const { activesStore, transportStore } = useContext(Context).rootStore;

    const [historyVisible, setHistoryVisible] = useState(false)
    const {id} = useParams()
    const navigate = useNavigate()
    const [transport, setTransport] = useState<TransportDto>()

    
    // const [removeModalVisible, setRemoveModalVisible] = useState(false)
    const [incomes, setIncomes] = useState<IIncomeBalance[]>([])
    const [expenses, setExpenses] = useState<IExpenseBalance[]>([])

    useEffect(()=>{
        if(activesStore.actives) {
            const elem =  activesStore.actives.transports.transport.find((el)=>el.id===Number(id))
            setTransport(elem!)   
            const incomesTmp: IIncomeBalance[] = []
            elem!.income.forEach((el)=>{
                const date = new Date(el.created_at!)
                const dateNow = new Date()
                if(date.getFullYear()===dateNow.getFullYear() && date.getMonth() === dateNow.getMonth()) {
                    incomesTmp.push(el)
                }
            })
            setIncomes(incomesTmp)
        }
    },[activesStore.actives, id])

    useEffect(()=>{
        if(activesStore.actives) {
            const elem = activesStore.actives.transports.transport.find((el) => el.id === Number(id))
            setTransport(elem)
            
            const expensesTmp: IIncomeBalance[] = []
            elem!.expenses.forEach((el)=>{
                const date = new Date(el.created_at!)
                const dateNow = new Date()
                if(date.getFullYear()===dateNow.getFullYear() && date.getMonth() === dateNow.getMonth()) {
                    // expensesTmp.push(el)
                }
            })
            setExpenses(expensesTmp)
        }
    },[activesStore.actives, id])


    const removeItem = (sum?: number, card?: Card) => {
        if(sum && card) {
            activesStore.setLoading(true)
            if(transport?.id) {
                const response  = activesStore.deleteTransport(transport.id)
                response.then(res => {
                        if(res.status >= 200 && res.status < 300) {
                            // setRemoveModalVisible(false)
                            activesStore.setLoading(false)
                            navigate("/assets/transport")
                            return activesStore.fetchActives()
                        }
                    })
                    .catch((e) => {
                        activesStore.setError(e)
                    })
            }
            
        } else {
            if(transport?.id) {
                activesStore.setLoading(true)
                activesStore.deleteTransport(transport?.id)
                    .then(res => {
                        if(res.status >= 200 && res.status < 300) {
                            // setRemoveModalVisible(false)
                            activesStore.setLoading(false)
                            navigate("/assets/transport")
                            return activesStore.fetchActives()
                        }
                    })
                    .catch((e) => {
                        activesStore.setError(e)
                    })
            }
        }
    }

    return (
        <>
            <OverlayModal showModalClass={transportStore.show_delet ? 'modal--active' : ''}>
                <SaleAndRemoveForm/>
            </OverlayModal>
                <SpinnerLoader loading={activesStore.loading} />
            <div className="transport__detail">
                <div className="container" >
                    <div className="transport__detail-content">
                        <h2 className="transport__detail-title">{transport?.mark + ' ' + transport?.model}</h2>
                        <div className="transport__detail-info_container">
                            <picture className="transport__detail-image">
                                <img className="transport-item-page__img" src={transportImg} alt="transportImg"/>
                            </picture>
                            <div className="transport__detail-information">
                                {transport ?
                                    <TransportInfo transport={transport} incomes={incomes} expenses={expenses}/> :
                                    <p>Загружаем данные...</p>}
                                    <Button
                                        className='transport-item-page__history-btn'
                                        textButton={`${historyVisible ? "Скрыть" : "Показать"} историю`}
                                        name='visible_history'
                                        onClick={() => setHistoryVisible(!historyVisible)}
                                    />
                            </div>
                        </div>
                        <div className="transport-item-page__btns">
                            <Link
                                to="/assets/transport"
                                className="cancel-btn transport-item-page__cancel-btn">
                                Назад
                            </Link>
                        </div>
                        <Ellipses
                            classNameContainer='transport__detail-dropdown'
                            classNameDots='transport__detail-ellipses'
                            classNameEditLink='transport__detail-edit'
                            classNameRemoveButton='transport__detail-remove'
                            classNameActions='transport__detail-actions'
                        />
                    </div>
                </div>
            </div>
        </>
    )
})