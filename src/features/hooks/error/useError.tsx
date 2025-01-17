import { useEffect, useState } from "react";
import {observer} from "mobx-react-lite";

interface IAlert {
    text: string,
    type: string
}

export const UseError = observer(({text, type}: IAlert) => {
    const alertClassArr = ['error', 'warning']
    const [alertClass, setAlertClass] = useState('')

    useEffect(()=>{
        if(type === 'Error') {
            setAlertClass(alertClassArr[0])
        }
        else {
            setAlertClass(alertClassArr[1])
        }
    },[])

    return (
        <div className={`alert-${alertClass}`}>
            <b>{text}</b>
        </div>
    )
})