import React, {FC, useEffect, useState} from "react";
import { observer } from "mobx-react-lite";

interface IIncomeForm {
    placeholder: string
    handleClickCreateWork?: React.MouseEventHandler<HTMLButtonElement>
    handleChange: React.ChangeEventHandler<HTMLInputElement>
    handleChangeComment: React.ChangeEventHandler<HTMLInputElement>
    value: string
    textValue: string
}

export const IncomeForm: FC<IIncomeForm> = observer(
    ({
        placeholder,
        value,
        textValue,
        handleClickCreateWork,
        handleChange,
         handleChangeComment
    }) => {
        const [currentValue, setCurrentValue] = useState('');
        const [visible, setVisible] = useState<boolean>(false)
        const [error, setError] = useState<string | null>(null)

        useEffect(()=>{
            setCurrentValue(value)
            if(currentValue===''||currentValue===' ') {
                setVisible(false)
            }
        },[value])

        useEffect(() => {
            const maxLength: number = 30;
            const lengthCurrent = currentValue.replace(/ /g,'').length
            if(lengthCurrent <= maxLength) {
                if(currentValue.trim()!=='') {
                    setVisible(true)
                }
                setError('')
            } else {
                setVisible(false)
                setError(`кол-во символов превышено на ${lengthCurrent - maxLength}`)
            }
            console.log(error)
        }, [currentValue]);

        const handleClick = () => {
            if(error === '') {
                handleClickCreateWork
                setVisible(false)
                setCurrentValue('')
            }
        }

    return (
        <form action='#' className="job__form" onSubmit={(e) => e.preventDefault()}>
            <div className="job__form-add_name">
                <input type="text" placeholder={placeholder} value={currentValue} onChange={handleChange}/>
                <button className={`job__create-button ${visible ? '--active' : ''}`} onClick={handleClick}>+</button>
            </div>
            <div className="job__form-comment">
                <input
                    value={textValue}
                    onChange={handleChangeComment}
                    className="job__comment"
                    placeholder="Добавить комментарий"
                />
            </div>
        </form>
    )
    })