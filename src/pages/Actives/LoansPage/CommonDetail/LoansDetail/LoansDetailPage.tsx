import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Context } from "../../../../../main"
import { observer } from "mobx-react-lite"

export const LoansDetailPage = observer(() => {
    const { loansStore } = useContext(Context)
    const { id } = useParams()

    useEffect(() => {
        loansStore.prepareCurrentLoan(id)
    }, [])

    return (
        <div className="loans__detail">
            <div className="container">
                <div className="loans__detail-content">
                    <div className="loans__detail-image">
                        <img/>
                    </div>
                    <div className="loans__detail-info">
                        <h1 className="loans__detail-title">{loansStore.currentLoan?.name}</h1>
                        <div className="loans__detail-description">
                            <div className="loans__description-info">
                                <h3 className="loans__description-title">
                                    Сумма:
                                </h3>
                                <span className="loans__description-data">
                                    { 
                                        loansStore.currentLoan?.sum && loansStore.currentLoan?.sum + 'р'
                                    }
                                </span>
                            </div>
                            <div className="loans__description-info">
                                <h3 className="loans__description-title">
                                    Дата:
                                </h3>
                                <span className="loans__description-data">
                                    { 
                                        loansStore.currentLoan?.date
                                    }
                                </span>
                            </div>
                            <div className="loans__description-info">
                                 <h3 className="loans__description-title">
                                    Срок:
                                </h3>
                                <span className="loans__description-data">
                                    { 
                                        loansStore.currentLoan?.loan_term && loansStore.currentLoan?.loan_term + 'мес.'
                                    }
                                </span>
                            </div>
                            <div className="loans__description-info">
                                <h3 className="loans__description-title">
                                    Остаток:
                                </h3>
                                <span className="loans__description-data">
                                    { 
                                        loansStore.currentLoan?.remainder && loansStore.currentLoan?.remainder + 'Р'
                                    }
                                </span>
                            </div>
                            <div className="loans__description-info">
                                <h3 className="loans__description-title">
                                    Процентная ставка:
                                </h3>
                                <span className="loans__description-data">
                                    { 
                                        loansStore.currentLoan?.percentage && loansStore.currentLoan?.percentage + 'Р'
                                    }
                                </span>
                            </div>
                            <div className="loans__description-info">
                                <h3 className="loans__description-title">
                                    Прогресс погашения:
                                </h3>
                                <span className="loans__description-data">
                                    { 
                                        loansStore.currentLoan?.repayment_progress && loansStore.currentLoan?.repayment_progress
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