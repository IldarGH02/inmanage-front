import React, { useEffect, useState } from "react";
import "./addTransportCredit.css";
import { InputSumTransport } from "../InputSumTransport/InputSumTransport";
import { InputTimeCreditTransport } from "../InputTimeCreditTransport/InputTimeCreditTransport";
import { InputPercentTransport } from "../InputPercentTransport/InputPercentTransport";

interface IAddTransportCredit {
    valFirstPayment: number,
    valTimeCredit: number,
    valPercent: number
}

interface IAddTransportCreditProps {
    setGoodInput: (flag: boolean, objDTO: IAddTransportCredit)=>void
}

export function AddTransportCredit({setGoodInput}: IAddTransportCreditProps) {
    const [valFirstPayment, setValFirstPayment] = useState('')
    const [alertFirstPayment, setAlertFirstPayment] = useState('') 
    const [valTimeCredit, setValTimeCredit] = useState('')
    const [alertTimeCredit, setAlertTimeCredit] = useState('') 
    const [valPercent, setValPercent] = useState('0.0')
    const [alertPercent, setAlertPercent] = useState('')

    useEffect(()=>{
        const objDTO = {
            valFirstPayment: Number(valFirstPayment.replace(/ /g,'')),
            valTimeCredit: Number(valTimeCredit.replace(/ /g,'')),
            valPercent: Number(valPercent)
        }
        if(alertFirstPayment==='' && alertTimeCredit===''&&alertPercent===''&&valFirstPayment!==''&&valTimeCredit!==''&&valTimeCredit!=='0') {  
            setGoodInput(true, objDTO)
        } else {
            setGoodInput(false, objDTO)
        }
    }, [valFirstPayment, valTimeCredit, valPercent])

    return (
        <div className="add-transport-credit">
            <div className="add-transport-credit__item">
                <InputSumTransport length={12} value={valFirstPayment} setValue={setValFirstPayment} setAlert={setAlertFirstPayment} placeHolder="Первый взнос*"/>
            </div>
            <div className="add-transport-credit__item">
                <InputTimeCreditTransport value={valTimeCredit} setValue={setValTimeCredit} setAlert={setAlertTimeCredit} placeHolder="Срок кредитования*"/>
            </div>
            <div className="add-transport-credit__item">
                <InputPercentTransport value={valPercent} setValue={setValPercent} setAlert={setAlertPercent} placeHolder="Процентная ставка*"/>
            </div>
        </div>
    )
}