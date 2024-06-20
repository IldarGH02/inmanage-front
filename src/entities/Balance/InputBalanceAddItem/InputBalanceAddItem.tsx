import React, { useEffect, useState } from "react";
import "./inputBalanceAddItem.css";

interface InputBalanceAddItem {
    onAddItem: (value: string) => void,
    placeholder: string
}

export function InputBalanceAddItem({onAddItem, placeholder}: InputBalanceAddItem) {
    const [value, setValue] = useState('')
    const [addBtnVisible, setAddBtnVisible] = useState(false)
    const [textAlert, setTextAlert] = useState('')

    useEffect(()=>{
        if(value === '' || value=== ' ') {
            setAddBtnVisible(false)
        }
    },[value])

    const addItem = () => {
        if(textAlert==='') {
            setAddBtnVisible(false)
            onAddItem(value)
            setValue('')
        }
    }

    const changeValue = (event: React.FormEvent<HTMLInputElement>) => {
        const maxLength = 30
        const lengthCurrent = event.currentTarget.value.replace(/ /g,'').length
        setValue(event.currentTarget.value)
        if(lengthCurrent<=maxLength) {
            if(event.currentTarget.value.trim()!=='') {
                setAddBtnVisible(true)
            }
            setTextAlert('')
        }
        else {
            setAddBtnVisible(false)
            setTextAlert(`кол-во символов превышено на ${lengthCurrent - maxLength}`)
        }
    }

    return (
        <div className="input-balance-add-item">
            <input type="text" placeholder={placeholder} value={value} onChange={changeValue} />
            <button className={`input-balance-add-item__add-btn${addBtnVisible?'--active':''}`} onClick={addItem}>+</button>
        </div>
    )
}