import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./addCurrencyPage.css"
import { IDropDownList } from "../../../../app/types/elements/IDropDownList";
import { Background } from "../../../../widgets/elements/Background/Background";
import { InputSumTransport } from "../../../../widgets/assets/Transport/AddTransport/InputSumTransport/InputSumTransport";
import { InputPercentTransport } from "../../../../widgets/assets/Transport/AddTransport/InputPercentTransport/InputPercentTransport";
import { DropDownListTransport } from "../../../../widgets/assets/Transport/AddTransport/DropDownListTransport/DropDownListTransport";
import { LineChart } from "../../../../widgets/Chart/LineChart/LineChart";
import { HistoryOperationList } from "../../../../widgets/forms/elements/HistoryOperationList/HistoryOperationList";

import assetsBckg from '../../../../../shared/assets/img/assets/assetsBckg.png'

const name: IDropDownList[] = [
    {id: 1, content:'Доллар американский'},   
]

const broker: IDropDownList[] = [
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

export function AddCurrencyPage() {
    const [nameSelector, setNameSelector] = useState('')
    const [brokerSelector, setBrokerSelector] = useState('')
    const [valueSumPay, setValueSumPay] = useState('')
    const [alertSumPay, setAlertSumPay] = useState('')
    const [valueSumCurrent, setValueSumCurrent] = useState('')
    const [alertSumCurrent, setAlertSumCurrent] = useState('')
    // const [goodInput, setGoodInput] = useState(false)
    const [valPercent, setValPercent] = useState('0.0')
    // const [alertPercent, setAlertPercent] = useState('')

    useEffect(()=>{
        if(alertSumPay===''&&alertSumCurrent===''&&valueSumCurrent!=='0'&&valueSumCurrent!==''&&valueSumPay!=='0'&&valueSumPay!=='') {
            const res = ( ( Number(valueSumCurrent.replace(/ /g,''))-Number(valueSumPay.replace(/ /g,'')) )/Number(valueSumPay.replace(/ /g,'')) )*100
            setValPercent(String(res.toFixed(2)))
        } else {
            setValPercent('')
        }
    }, [valueSumPay, valueSumCurrent])

    const onAddValuable = () => {

    }

    // const getDateString = (date: Date) => {
    //     const day = date.getDate()>9?date.getDate():'0'+date.getDate()
    //     const month = date.getMonth()>9?date.getMonth():'0'+date.getMonth()
    //     return day+'.'+month+'.'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes()
    // }
    
    return (
        <>
        <Background imgBckg={assetsBckg}/>
        <div className="add-currency-page">
            <div className="add-currency-page__container">
                <div className="add-currency-page__content">
                    <div className="add-currency-page__deposit-block">
                        <div className="add-currency-page__title-deposit">Вклад</div>
                        <div className="add-currency-page__deposit-wrapper">
                            <div className="add-currency-page__deposit-content">
                                <div className="add-currency-page__item">
                                    <DropDownListTransport data={name} value={nameSelector} setValue={setNameSelector} placeholder="Наименование*" idDDList={'idDDListName'}/>
                                </div>
                                <div className="add-currency-page__item">
                                    <DropDownListTransport data={broker} value={brokerSelector} setValue={setBrokerSelector} placeholder="Брокер*" idDDList={'idDDListBroker'}/>
                                </div>
                                <div className="add-currency-page__item">
                                    <InputSumTransport background={"rgb(241, 242, 246)"} length={12} value={valueSumPay} setValue={setValueSumPay} setAlert={setAlertSumPay} placeHolder="Цена покупки*"/>
                                </div>
                                <div className="add-currency-page__item">
                                    <InputSumTransport background={"rgb(241, 242, 246)"} length={12} value={valueSumCurrent} setValue={setValueSumCurrent} setAlert={setAlertSumCurrent} placeHolder="Цена на рынке*"/>
                                </div>
                                <div className="add-currency-page__item">
                                    <InputPercentTransport inputDisable={true} background={"rgb(241, 242, 246)"} value={valPercent} setValue={setValPercent} setAlert={() => {}} placeHolder="Доходность*"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="add-currency-page__history-block">
                        <div className="add-currency-page__title-graph">График</div>
                        <div className="add-currency-page__history-wrapper">
                            <div className="add-currency-page__history-content">
                                <div className="add-currency-page__graph">
                                    <LineChart/>
                                </div>
                                <div className="add-currency-page__title-history">История операций</div>
                                <HistoryOperationList data={deposit}/>
                                {/* {deposit.map(el=>{
                                    return (
                                        <div className="add-currency-history-item" key={el.id}>
                                            <div className="add-currency-history-item__date">{getDateString(el.date)}</div>
                                            <div className="add-currency-history-item__container">
                                                <div className="add-currency-history-item__title">– {el.title}</div>
                                                {el.sum && el.sum>0 &&
                                                    <div className="add-currency-history-item__sum-plus">+ {el.sum.toLocaleString()} <b className="deposit-history-item__valuta"> ₽</b></div>
                                                }
                                                {el.sum && el.sum<0 &&
                                                    <div className="add-currency-history-item__sum-minus">- {(-el.sum).toLocaleString()} <b className="deposit-history-item__valuta"> ₽</b></div>
                                                }
                                            </div>
                                        </div>
                                    )
                                })}    */}
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="add-currency-page__btns">
                    <Link to="/assets/currencys" className="cancel-btn add-currency-page__cancel-btn">Отменить</Link>
                    <div className={`add-currency-page__add-btn${'--active'}`} onClick={onAddValuable}>Подтвердить</div> 
                </div>
            </div>
        </div>
        </>
    )
}