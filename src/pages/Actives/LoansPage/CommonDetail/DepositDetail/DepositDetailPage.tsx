import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Context } from "../../../../../main"
import { observer } from "mobx-react-lite"

export const DepositDetailPage = observer(() => {
    const { loansStore } = useContext(Context).rootStore
    const { id } = useParams()

    useEffect(() => {
        loansStore.prepareCurrentDeposit(id)
    }, [])

    return (
        <div className="deposit__detail">
            <div className="container">
                <div className="deposit__detail-content">
                    <div className="deposit__detail-image">
                        <img/>
                    </div>
                    <div className="deposit__detail-info">
                        <h1 className="deposit__detail-title">{loansStore.currentDeposit?.name}</h1>
                        <div className="deposit__detail-description">
                            <div className="deposit__description-info">
                                <h3 className="deposit__description-title">
                                    Сумма вклада:
                                </h3>
                                <span className="deposit__description-data">
                                    { 
                                        loansStore.currentDeposit?.sum && loansStore.currentDeposit?.sum + 'р'
                                    }
                                </span>
                            </div>
                            <div className="deposit__description-info">
                                <h3 className="deposit__description-title">
                                    Срок вклада:
                                </h3>
                                <span className="deposit__description-data">
                                    { 
                                        loansStore.currentDeposit?.term && loansStore.currentDeposit?.term + 'мес.'
                                    }
                                </span>
                            </div>
                            <div className="deposit__description-info">
                                 <h3 className="deposit__description-title">
                                    Процентная ставка:
                                </h3>
                                <span className="deposit__description-data">
                                    { 
                                        loansStore.currentDeposit?.percentage && loansStore.currentDeposit?.percentage + '%'
                                    }
                                </span>
                            </div>
                            <div className="deposit__description-info">
                                <h3 className="deposit__description-title">
                                    Прибыль / месяц:
                                </h3>
                                <span className="deposit__description-data">
                                    { 
                                        loansStore.currentDeposit?.month_income && loansStore.currentDeposit?.month_income + 'Р'
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})