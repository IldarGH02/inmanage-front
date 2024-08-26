import { useState } from "react";
import { Link } from "react-router-dom";
import "./addDepositPage.css"
import { IDropDownList } from "../../../../app/types/elements/IDropDownList";
import { InputSumTransport } from "../../../../widgets/assets/Transport/AddTransport/InputSumTransport/InputSumTransport";
import { DropDownListTransport } from "../../../../widgets/assets/Transport/AddTransport/DropDownListTransport/DropDownListTransport";
import { InputPercentTransport } from "../../../../widgets/assets/Transport/AddTransport/InputPercentTransport/InputPercentTransport";

// const assetsBckg = require('../../../../assets/img/assets/assetsBckg.png')

const typeDeposit: IDropDownList[] = [
    {id: 1, content:'Тинькофф'},   
]

const deposit = [
    {
        id: 1,
        title: 'title 1',
        date: new Date(2023, 10, 1, 11, 53),
        // sum: 5000
    },
    {
        id: 2,
        title: 'title 2',
        date: new Date(2023, 10, 1, 11, 53),
        sum: 5000
    },
    {
        id: 3,
        title: 'title 3',
        date: new Date(2023, 10, 1, 11, 53),
        sum: -5000
    },
]

export function AddDepositPage() {
    const [typeDepositSelector, setTypeDepositSelector] = useState('')
    const [valueSum, setValueSum] = useState('')
    const [alertSum, setAlertSum] = useState('')
    const [goodInput] = useState(false)
    const [valPercent, setValPercent] = useState('0.0')
    const [alertPercent, setAlertPercent] = useState('')

    const onAddDeposits = () => {
        console.log(alertSum)
        console.log(alertPercent)
    }

    const getDateString = (date: Date) => {
        const day = date.getDate()>9?date.getDate():'0'+date.getDate()
        const month = date.getMonth()>9?date.getMonth():'0'+date.getMonth()
        return day+'.'+month+'.'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes()
    }
    
    return (
        <>
        <div className="add-deposits-page">
            <div className="add-deposits-page__container">
                <div className="add-deposits-page__content">
                    <div className="add-deposits-page__deposit-block">
                        <div className="add-deposits-page__title-deposit">Вклад</div>
                        <div className="add-deposits-page__deposit-wrapper">
                            <div className="add-deposits-page__deposit-content">
                                <div className="add-deposits-page__item">
                                    <InputSumTransport background={"rgb(241, 242, 246)"} length={12} value={valueSum} setValue={setValueSum} setAlert={setAlertSum} placeHolder="Сумма вклада*"/>
                                </div>
                                <div className="add-deposits-page__item">
                                    <DropDownListTransport data={typeDeposit} value={typeDepositSelector} setValue={setTypeDepositSelector} placeholder="Тип вклада*" idDDList={'idDDListType'}/>
                                </div>
                                <div className="add-deposits-page__item">
                                    <InputPercentTransport background={"rgb(241, 242, 246)"} value={valPercent} setValue={setValPercent} setAlert={setAlertPercent} placeHolder="Процентная ставка*"/>
                                </div>
                                <div className="add-deposits-page__item">
                                    <InputPercentTransport background={"rgb(241, 242, 246)"} value={valPercent} setValue={setValPercent} setAlert={setAlertPercent} placeHolder="Доходность*"/>
                                </div>
                                <div className="add-deposits-page__btn-container">
                                    <button className="add-deposits-page__replenish-btn">Пополнить вклад</button>
                                </div>
                                <div className="add-deposits-page__item">
                                    <InputSumTransport background={"rgb(241, 242, 246)"} length={12} value={valueSum} setValue={setValueSum} setAlert={setAlertSum} placeHolder="Сумма пополнения"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="add-deposits-page__history-block">
                        <div className="add-deposits-page__title-history">История операций</div>
                        <div className="add-deposits-page__history-wrapper">
                            <div className="add-deposits-page__history-content">
                                {deposit.map(el=>{
                                    return (
                                        <div className="deposit-history-item" key={el.id}>
                                            <div className="deposit-history-item__date">{getDateString(el.date)}</div>
                                            <div className="deposit-history-item__container">
                                                <div className="deposit-history-item__title">– {el.title}</div>
                                                {el.sum && el.sum>0 &&
                                                    <div className="deposit-history-item__sum-plus">+ {el.sum.toLocaleString()} <b className="deposit-history-item__valuta"> ₽</b></div>
                                                }
                                                {el.sum && el.sum<0 &&
                                                    <div className="deposit-history-item__sum-minus">- {(-el.sum).toLocaleString()} <b className="deposit-history-item__valuta"> ₽</b></div>
                                                }
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="add-deposits-page__btns">
                    <Link to="/assets/deposits" className="cancel-btn add-deposits-page__cancel-btn">Отменить</Link>
                    <div className={`add-deposits-page__add-btn${goodInput?'--active':''}`} onClick={onAddDeposits}>Подтвердить</div>
                </div>
            </div>
        </div>
        </>
    )
}