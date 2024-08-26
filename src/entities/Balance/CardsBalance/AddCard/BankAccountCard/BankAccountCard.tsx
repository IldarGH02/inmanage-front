import { useState } from "react"
import "./bankAccountCard.css"
import { InputText } from "../../../../../shared/ui/input/InputText/InputTextTest"
import { InputSum } from "../../../../../shared/ui/input/InputSum/InputSumTest"
import { CreditAccount } from "./CreditAccount/CreditAccount"

const data = [
    {
        id: 1,
        name: 'Дебетовый счет'
    },
    {
        id: 2,
        name: 'Кредитный счет'
    }
]

export function BankAccountCard() {
    const [valueName, setValueName] = useState('')
    const [alertName, setAlertName] = useState('')
    const [valueSum, setValueSum] = useState('')
    const [alertSum, setAlertSum] = useState('')
    const [debitAccount, setDebitAccount] = useState(true)

    const setBrand = ()=> {
        (document.getElementById('accord2') as HTMLInputElement).checked = false
    }

    console.log(alertName)
    console.log(alertSum)

    return (
        <div className="cash-card">
            <div className="property-add__item">
                <div className="property-add__name">Название счета<b>*</b></div>
                <InputText length={30} value={valueName} attentionFlag={false} setValue={setValueName} setAlert={setAlertName}/>
            </div>
            <div className="property-add__accordion-container">
                <div className="property-add__item">
                    
                    <div className="property-add__name">Тип счета<b>*</b></div>
                    <div className="drop-down-list">
                        <input className="drop-down-list-input" type="checkbox" name="accord" id={'accord2'}></input>
                        <label className="drop-down-list__title" htmlFor={'accord2'}>
                            <p>{debitAccount ? 'Дебетовый счет' : 'Кредитный счет'}</p> 
                        </label> 
                        <div className="drop-down-list__content">
                            {/* <input type="text" onKeyUp={searchBrand} value={searchSelector} onChange={changeBrandSelector}/>  */}
                            <ul>
                            {data.map((el)=>{
                                return (
                                    <li key={el.id} onClick={()=>{
                                        // setBrandSelector(el.content)
                                        setDebitAccount(el.name==='Кредитный счет'?false:true)
                                        setBrand()
                                    }}><p>{el.name}</p></li>
                                )
                            })}
                            </ul>
                        </div>          
                    </div>
                </div>
            </div>
            {debitAccount && 
            <div className="property-add__item">
                <div className="property-add__name">Текущий баланс<b>*</b></div>
                <InputSum length={10} value={valueSum} setValue={setValueSum} setAlert={setAlertSum}/>
            </div>
            }
            {!debitAccount && 
            <CreditAccount/>
            }
        </div>
    )
}