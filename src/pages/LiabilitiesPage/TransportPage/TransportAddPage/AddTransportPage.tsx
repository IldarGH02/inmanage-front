import React, { useEffect, useRef, useState } from "react"
import "./addTransportPage.css"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { actionTypes } from "../../../../app/store/types/types"
import { Background } from "../../../../widgets/elements/Background/Background"
import { DropDownListTransport } from "../../../../widgets/assets/Transport/AddTransport/DropDownListTransport/DropDownListTransport"
import { IDropDownList } from "../../../../app/types/elements/IDropDownList"
import { InputTextVIN } from "../../../../widgets/assets/Transport/AddTransport/inputVIN/InputVIN"
import { InputTextTransport } from "../../../../widgets/assets/Transport/AddTransport/InputTextTransport/InputTextTransport"
import { InputSumTransport } from "../../../../widgets/assets/Transport/AddTransport/InputSumTransport/InputSumTransport"
import { AddTransportCredit } from "../../../../widgets/assets/Transport/AddTransport/AddTransportCredit/AddTransportCredit"
import { ILiabilitiesTransport } from "../../../../app/types/liabilities/ILiabilities"
import { addTransport, } from "../../../../app/store/actions/liabilities/liabilitiesActions"

import liabilitiesBckg from '../../../../shared/assets/img/liabilities/liabilitiesBckg.png'

const name: IDropDownList[] = [
    {id: 1, content:'Skoda'},   
]

const model: IDropDownList[] = [
    {id: 1, content:'Rapid'},
    {id: 2, content:'Octavia'},
    {id: 3, content:'Superb'},
]

const typePerson: IDropDownList[] = [
    {id: 1, content:'Физическое лицо'},
    {id: 2, content:'Юридическое лицо'},
]

const typePay: IDropDownList[] = [
    {id: 1, content:'Наличный расчет'},
    {id: 2, content:'Кредит'},
]

interface IAddTransportCredit {
    valFirstPayment: number,
    valTimeCredit: number,
    valPercent: number
}

export function TransportAddPage() {
    const dispatch = useDispatch()
    const [valueUse, setValueUse] = useState('')
    const [valueSum, setValueSum] = useState('')
    const [alertSum, setAlertSum] = useState('')
    const [alertUse, setAlertUse] = useState('')
    const [valueVIN, setValueVIN] = useState('')
    const [alertVIN, setAlertVIN] = useState('')
    const [brandSelector, setBrandSelector] = useState('')
    const [modelSelector, setModelSelector] = useState('')
    const [paySelector, setPaySelector] = useState('')
    const [ownerPTS, setOwnerPTS] = useState('')
    const [alertOwnerPTS, setAlertOwnerPTS] = useState('')
    const [individualPerson, setIndividualPerson] = useState('')//физическое лицо
    const objCreditBlockRef = useRef<IAddTransportCredit>()
    const [goodInputCredit, setGoodInputCredit] = useState(false)
    const [goodInput, setGoodInput] = useState(false)
    const navigate = useNavigate()

    // useEffect(()=>{
    //     if(state.assets === null) {
    //         dispatch(showLoader(actionTypes.SHOW_LOADER))
    //         const res = getLiabilities(actionTypes.GET_ASSETS)
    //         res.then(e => {
    //             dispatch(e!);
    //             }
    //         )
    //         .catch((e) => {
    //             console.log(e)
    //         })
    //     }
        
    // },[])

    useEffect(()=>{
        if(alertSum===''&&alertUse===''&&alertVIN===''&&alertOwnerPTS===''&&
            valueSum!==''&&valueVIN!==''&&brandSelector!==''&&modelSelector!==''&&individualPerson!=='' && 
            (paySelector==='Наличный расчет'||paySelector==='Кредит' && goodInputCredit)
        ) {
            setGoodInput(true)
        } else {
            setGoodInput(false)
        }
    }, [valueUse, valueSum, valueVIN, brandSelector, modelSelector, paySelector, ownerPTS, individualPerson])

    const onAddTransport = () => {
        if(goodInput) {
            const transport: ILiabilitiesTransport | any = {
                mark: brandSelector,
                model: modelSelector,
                bought_price: Number(valueSum.replace(/ /g, '')),
                month_expense: 0,
                owner_type: individualPerson === 'Физическое лицо' ? true : false,

                loan: paySelector === 'Кредит' ? true : false,

                average_market_price: 0,
                min_market_price: 0,
                max_market_price: 0,
                images: [],
                expenses: [],
                total_expense: 0,
                initial_payment: paySelector === 'Кредит' ? objCreditBlockRef.current!.valFirstPayment : 0,
                loan_term: paySelector === 'Кредит' ? objCreditBlockRef.current!.valTimeCredit : 0,
                percentage: paySelector === 'Кредит' ? objCreditBlockRef.current!.valPercent : 0,
                month_payment: 0,
                use: valueUse,
                vin: valueVIN,
                owner: ownerPTS,
                average_consumption: 0
            }
            const res = addTransport(actionTypes.ADD_TRANSPORT, transport)
            res.then(e => {
                dispatch(e!);
                navigate('/liabilities/transport')
                }
            )
            .catch((e) => {
                console.log(e)
            })
        }
    }

    const onSetGoodInputCredit = (flag: boolean, objDTO: IAddTransportCredit) => {
        setGoodInputCredit(flag)
        objCreditBlockRef.current = objDTO
    }

    return (
        <>
        <Background imgBckg={liabilitiesBckg}/>
        <div className="add-transport-page">
            <div className="add-transport-page__container">
                <div className="add-transport-page__title">Добавление транспорта</div>
                <div className="add-transport-page__content">
                    <div className="add-transport-page__transport-block-wrapper">
                        <div className="add-transport-page__transport-block">
                            <div className="add-transport-page__content-title">Транспорт</div>
                            <div className="add-transport-page__item">
                                <DropDownListTransport data={name} value={brandSelector} setValue={setBrandSelector} placeholder="Марка транспорта*" idDDList={'idDDListBrand'}/>
                            </div>
                            <div className="add-transport-page__item">
                                <DropDownListTransport data={model} value={modelSelector} setValue={setModelSelector} placeholder="Модель транспорта*" idDDList={'idDDListModel'}/>
                            </div>
                            <div className="add-transport-page__content-title">Информация о транспорте</div>
                            <div className="add-transport-page__item">
                                <InputTextVIN value={valueVIN} setValue={setValueVIN} setAlert={setAlertVIN} placeHolder={"VIN - номер*"}/>
                            </div>
                            <div className="add-transport-page__item">
                                <InputTextTransport value={valueUse} setValue={setValueUse} setAlert={setAlertUse} placeHolder={"Назначение"} attentionFlag={false}/>
                            </div>
                        </div>
                    </div>
                    <div className="add-transport-page__finance-block-wrapper">
                        <div className="add-transport-page__finance-block">
                        
                            <div className="add-transport-page__content-title">Информация о владельце</div>
                            <div className="add-transport-page__item">
                                <InputTextTransport value={ownerPTS} setValue={setOwnerPTS} setAlert={setAlertOwnerPTS} placeHolder={"Владелец по ПТС"} attentionFlag={false}/>
                            </div>
                            <div className="add-transport-page__item">
                                <DropDownListTransport data={typePerson} value={individualPerson} setValue={setIndividualPerson} placeholder="Тип собственности*" idDDList={'idDDListType'}/>
                            </div>
                            <div className="add-transport-page__content-title">Цена покупки</div>
                            <div className="add-transport-page__item">
                                <InputSumTransport length={12} value={valueSum} setValue={setValueSum} setAlert={setAlertSum} placeHolder="Цена транспорта"/>
                            </div>
                            <div className="add-transport-page__item">
                                <DropDownListTransport data={typePay} value={paySelector} setValue={setPaySelector} placeholder="Тип выплаты*" idDDList={'idDDListPay'}/>
                            </div>
                            {paySelector==='Кредит' &&
                                <AddTransportCredit setGoodInput={onSetGoodInputCredit}/>
                            }
                        </div>
                    </div>
                </div>
                <div className="add-transport-page__btns">
                    <Link to="/liabilities/transport" className="cancel-btn add-transport-page__cancel-btn">Отменить</Link>
                    <div className={`add-transport-page__add-btn${goodInput?'--active':''}`} onClick={onAddTransport}>Подтвердить</div>
                </div>
            </div>
        </div>
        </>
    )
}
