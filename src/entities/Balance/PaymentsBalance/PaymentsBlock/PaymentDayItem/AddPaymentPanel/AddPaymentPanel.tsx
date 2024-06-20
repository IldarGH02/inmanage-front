import React, { useEffect, useState } from "react";
import "./addPaymentPanel.css";
import { observer } from "mobx-react-lite";

interface IAddAboutTask {
    onClose: ()=>void,
}

export const AddPaymentPanel = observer(({onClose}: IAddAboutTask) => {
    const [name, setName] = useState('')
    const [sum, setSum] = useState('')
    const [attentionNameVisible, setAttentionNameVisible] = useState(false)
    const [attentionSumVisible, setAttentionSumVisible] = useState(false)
    const [addBtnActive, setAddBtnActive] = useState(false)
    const [regularPaymentActive, setRegularPaymentActive] = useState(false)

    const [nameAlert, setNameAlert] = useState('')
    const [sumAlert, setSumAlert] = useState('')

    useEffect(()=>{
        if(nameAlert==='' && name!=='' && sumAlert==='' && Number(sum.replace(/ /g,''))!==0 && sum!=='') {
            setAddBtnActive(true)
        } else {
            setAddBtnActive(false)
        }
    }, [name, sum])

    function discharge(str:string): string {
        return str.replace(/[^0-9.]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }
    
    const changeName = (event: React.FormEvent<HTMLInputElement>) => {
        const maxLength = 30
        const length = event.currentTarget.value.trim().length
        setName(event.currentTarget.value)
        if(length<=maxLength) {
            setNameAlert('')
        }
        else {
            setNameAlert(`допустимое количество символов превышено на ${length - maxLength}`)
        }
    }

    const changeSum = (event: React.FormEvent<HTMLInputElement>) => {
        const maxLength = 12
        const lengthCurrent = event.currentTarget.value.replace(/ /g,'').length

        setSum(event.currentTarget.value)
        if(lengthCurrent<=maxLength) {
            setSumAlert('')
        }
        else {
            setSumAlert(`допустимое кол-во символов превышено на ${lengthCurrent - maxLength}`)
        }
    }

    const blurNameInput = ()=> {
        if(nameAlert!==''||name==='') {
            setAttentionNameVisible(true)
        }
        else {
            setAttentionNameVisible(false)
        }
    }

    const blurSumInput = ()=> {
        if(nameAlert!==''||name==='') {
            setAttentionSumVisible(true)
        }
        else {
            setAttentionSumVisible(false)
        }
    }

    const addPaymentClick = () => {
        if(addBtnActive) {
            onClose()
        }
    }

    return (
        <div className="add-payment-panel">
            <button className="add-payment-panel__close-btn" onClick={onClose}>&#10006;</button>
            <div className="add-payment-panel__done-rb">
                <div className="add-payment-panel__point"></div>
            </div>
            <div className="add-payment-panel__content-wrapper">
                <div className="add-payment-panel__content">
                    <div className="add-about-payment__item">
                        <div className="add-about-payment__label">Наименование</div>
                        <div className="add-about-payment__wrapper-alert">
                            <div className="add-about-payment__wrapper-input">
                                <input type="text" className="add-about-payment__input" value={name} onChange={changeName} onBlur={blurNameInput}></input>
                                {attentionNameVisible && <b className="add-about-payment__attention">!</b>}
                            </div>
                            {nameAlert!=='' && <div className="add-about-payment__warning">{nameAlert}</div>}
                        </div>
                        
                    </div>
                    <div className="add-about-payment__item">
                        <div className="add-about-payment__label">Сумма</div>
                        <div className="add-about-payment-expense add-about-payment__wrapper-alert">
                            <div className="add-about-payment__wrapper-input">
                                <input type="text" className="add-about-payment__input" value={sum} onChange={changeSum} onKeyUp={()=>setSum(discharge(sum))} onBlur={blurSumInput}></input>
                                {attentionSumVisible && <b className="add-about-payment__attention"> !</b>}
                                <b className="add-about-payment__valuta"> руб.</b>
                            </div>
                            {sumAlert!=='' && <div className="add-about-payment__warning">{sumAlert}</div>}
                        </div>
                    </div>
                </div>
                <div className="add-payment-panel__footer">
                    <div className="add-payment-panel__item">
                        <div className="add-payment-panel__payment">
                            <div className="add-payment-panel__payment-title">платеж:</div>
                            <div className={`add-payment-panel__payment-item${!regularPaymentActive?'--active':''}`} onClick={()=>setRegularPaymentActive(false)}>разовый</div>
                            <div className="add-payment-panel__payment-point">|</div>
                            <div className={`add-payment-panel__payment-item${regularPaymentActive?'--active':''}`} onClick={()=>setRegularPaymentActive(true)}>регулярный</div>
                        </div>
                    </div>
                    <button className={`add-payment-panel__add-btn${addBtnActive?'--active':''}`} onClick={addPaymentClick}>Добавить</button>
                </div>
            </div>
        </div>
    )
})
